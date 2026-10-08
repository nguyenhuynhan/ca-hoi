<script setup lang="ts">
const {
  currentProduct,
  quantity,
  selectedProcessing,
  processingOptions,
  totalPrice,
  formatCurrency,
  isOrderModalOpen
} = useSalmonStore()

const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')
const deliveryTime = ref('2h')
const orderNote = ref('')
const paymentMethod = ref<'cod' | 'vietqr'>('cod')
const isSuccess = ref(false)
const orderId = ref('')

const currentProcessingObj = computed(() => {
  return processingOptions.find(o => o.id === selectedProcessing.value) || processingOptions[0]
})

const generateOrderId = () => {
  return 'CH' + Math.floor(100000 + Math.random() * 900000)
}

const handleOrderSubmit = () => {
  if (!customerPhone.value.trim()) {
    alert('Vui lòng nhập số điện thoại nhận hàng!')
    return
  }
  orderId.value = generateOrderId()
  isSuccess.value = true
}

const sendViaZalo = () => {
  const note = `[ĐẶT CÁ HỒI ${generateOrderId()}]
Sản phẩm: ${currentProduct.value.name} (SKU: ${currentProduct.value.sku})
Số lượng: ${quantity.value} ${currentProduct.value.unitLabel}
Quy cách: ${currentProduct.value.sizeSpec}
Sơ chế: ${currentProcessingObj.value?.name}
Tổng tiền: ${formatCurrency(totalPrice.value)}
Tên khách: ${customerName.value || 'Khách hàng'}
SĐT: ${customerPhone.value || 'Chưa điền'}
Địa chỉ: ${customerAddress.value || 'Giao tại địa chỉ'}
Ghi chú: ${orderNote.value || 'Không'}`

  const encoded = encodeURIComponent(note)
  window.open(`https://zalo.me/0909123456?text=${encoded}`, '_blank')
}

const resetAndClose = () => {
  isOrderModalOpen.value = false
  setTimeout(() => {
    isSuccess.value = false
  }, 300)
}
</script>

<template>
  <div v-if="isOrderModalOpen" class="modal-backdrop" @click="resetAndClose">
    <div class="order-card" @click.stop>
      <!-- Close button -->
      <button class="btn-close-modal" @click="resetAndClose">✕</button>

      <!-- SUCCESS SCREEN -->
      <div v-if="isSuccess" class="success-screen">
        <div class="success-icon-box">🎉</div>
        <h3 class="success-title">ĐẶT HÀNG THÀNH CÔNG!</h3>
        <p class="success-order-id">Mã đơn hàng: <strong>#{{ orderId }}</strong></p>
        <p class="success-desc">
          Bộ phận kho lạnh đã tiếp nhận đơn của quý khách và sẽ liên hệ xác nhận để giao cá ướp đá hỏa tốc trong 2 giờ.
        </p>

        <div class="success-summary">
          <div class="s-row">
            <span>Sản phẩm:</span>
            <strong>{{ currentProduct.name }}</strong>
          </div>
          <div class="s-row">
            <span>Số lượng:</span>
            <strong>{{ quantity }} {{ currentProduct.unitLabel }}</strong>
          </div>
          <div class="s-row">
            <span>Yêu cầu sơ chế:</span>
            <strong>{{ currentProcessingObj?.name }}</strong>
          </div>
          <div class="s-row">
            <span>Tổng thanh toán:</span>
            <strong class="text-yellow">{{ formatCurrency(totalPrice) }}</strong>
          </div>
        </div>

        <div class="success-actions">
          <button class="btn-zalo-confirm" @click="sendViaZalo">
            💬 Gửi chi tiết đơn qua Zalo ngay
          </button>
          <button class="btn-done" @click="resetAndClose">
            Hoàn Tất & Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>

      <!-- ORDER FORM SCREEN -->
      <div v-else class="order-content">
        <div class="order-header">
          <div class="header-tag">XÁC NHẬN ĐƠN HÀNG CÁ HỒI</div>
          <h2 class="order-main-title">Chốt Đơn Tươi Lạnh Ướp Đá</h2>
        </div>

        <div class="order-grid">
          <!-- Left: Product Summary -->
          <div class="order-summary-box">
            <div class="item-card-mini">
              <img :src="currentProduct.image" :alt="currentProduct.name" class="mini-img" />
              <div class="mini-details">
                <span class="mini-sku">SKU: {{ currentProduct.sku }}</span>
                <div class="mini-name">{{ currentProduct.name }}</div>
                <div class="mini-price">{{ currentProduct.priceDisplay }}</div>
              </div>
            </div>

            <div class="spec-breakdown">
              <div class="b-row">
                <span class="b-label">Xuất xứ:</span>
                <span class="b-val">{{ currentProduct.flag }} {{ currentProduct.origin }}</span>
              </div>
              <div class="b-row">
                <span class="b-label">Quy cách:</span>
                <span class="b-val">{{ currentProduct.sizeSpec }}</span>
              </div>
              <div class="b-row">
                <span class="b-label">Đóng gói:</span>
                <span class="b-val">{{ currentProduct.packaging }}</span>
              </div>
              <div class="b-row">
                <span class="b-label">Sơ chế:</span>
                <span class="b-val highlight-proc">🍣 {{ currentProcessingObj?.name }}</span>
              </div>
              <div class="b-row">
                <span class="b-label">Số lượng:</span>
                <span class="b-val font-bold">{{ quantity }} {{ currentProduct.unitLabel }}</span>
              </div>
            </div>

            <div class="total-display-card">
              <span class="t-label">TỔNG THANH TOÁN DỰ KIẾN</span>
              <div class="t-amount">{{ formatCurrency(totalPrice) }}</div>
              <span class="t-sub">(Đã bao gồm VAT & Đóng thùng xốp ướp đá 24H)</span>
            </div>

            <!-- VietQR Preview if selected -->
            <div v-if="paymentMethod === 'vietqr'" class="qr-preview-card">
              <div class="qr-title">QUÉT MÃ VIETQR THANH TOÁN</div>
              <img 
                :src="`https://api.vietqr.io/image/970407-19036788888019-print.jpg?accountName=CHUYEN%20CA%20HOI&amount=${totalPrice}&addInfo=CAHOI%20${currentProduct.sku}`" 
                alt="VietQR Code" 
                class="qr-code-img"
              />
              <span class="qr-hint">Nội dung: CAHOI {{ currentProduct.sku }}</span>
            </div>
          </div>

          <!-- Right: Customer Input Form -->
          <form class="order-form" @submit.prevent="handleOrderSubmit">
            <div class="form-group">
              <label class="form-label">Họ và tên của bạn</label>
              <input 
                v-model="customerName" 
                type="text" 
                class="form-input" 
                placeholder="Ví dụ: Anh Nam / Chị Mai" 
              />
            </div>

            <div class="form-group">
              <label class="form-label">Số điện thoại nhận hàng <span class="req">*</span></label>
              <input 
                v-model="customerPhone" 
                type="tel" 
                class="form-input" 
                placeholder="Số điện thoại hoặc Zalo (VD: 0909 123 456)" 
                required 
              />
            </div>

            <div class="form-group">
              <label class="form-label">Địa chỉ giao hàng</label>
              <input 
                v-model="customerAddress" 
                type="text" 
                class="form-input" 
                placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện" 
              />
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Thời gian nhận cá</label>
                <select v-model="deliveryTime" class="form-select">
                  <option value="2h">⚡ Hỏa tốc trong 2 giờ</option>
                  <option value="today">Hôm nay (giao trước 18h)</option>
                  <option value="tomorrow_morning">Sáng mai (8h - 11h)</option>
                  <option value="tomorrow_afternoon">Chiều mai (14h - 17h)</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Phương thức thanh toán</label>
                <select v-model="paymentMethod" class="form-select">
                  <option value="cod">💵 COD (Nhận cá kiểm tra rồi trả)</option>
                  <option value="vietqr">🏦 Chuyển khoản VietQR</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Ghi chú cắt thái / bảo quản</label>
              <textarea 
                v-model="orderNote" 
                class="form-textarea" 
                rows="2" 
                placeholder="Ví dụ: Cắt lát mỏng ăn sashimi, đóng thêm nhiều đá gel, lấy đầu xương nấu canh chua..."
              ></textarea>
            </div>

            <!-- Action buttons -->
            <div class="form-actions">
              <button type="submit" class="btn-submit-order">
                🛒 XÁC NHẬN ĐẶT HÀNG
              </button>

              <button type="button" class="btn-zalo-quick" @click="sendViaZalo">
                💬 Gửi Đơn Trực Tiếp Qua Zalo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(2, 7, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.order-card {
  position: relative;
  width: 100%;
  max-width: 920px;
  max-height: 92vh;
  background: #06152a;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-close-modal {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition-fast);
}

.btn-close-modal:hover {
  background: #ef4444;
}

.order-content {
  padding: 24px;
}

.order-header {
  margin-bottom: 20px;
}

.header-tag {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--accent-salmon);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.order-main-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  color: #ffffff;
}

.order-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 24px;
}

/* Product Summary Box */
.order-summary-box {
  background: #041021;
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.item-card-mini {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgba(56, 189, 248, 0.25);
  background: #020712;
}

.mini-details {
  display: flex;
  flex-direction: column;
}

.mini-sku {
  font-size: 0.65rem;
  font-family: monospace;
  color: var(--text-muted);
}

.mini-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.25;
}

.mini-price {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: #fde047;
}

.spec-breakdown {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid rgba(56, 189, 248, 0.12);
  padding-top: 10px;
}

.b-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
}

.b-label {
  color: var(--text-muted);
}

.b-val {
  color: #e2e8f0;
  font-weight: 600;
  text-align: right;
  max-width: 65%;
}

.highlight-proc {
  color: #ff9e88;
}

.total-display-card {
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.35);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.t-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #eab308;
}

.t-amount {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  color: #fde047;
}

.t-sub {
  font-size: 0.62rem;
  color: var(--text-muted);
}

.qr-preview-card {
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  color: #0f172a;
}

.qr-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.qr-code-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin: 0 auto;
}

.qr-hint {
  font-size: 0.65rem;
  font-weight: 700;
  color: #dc2626;
  display: block;
  margin-top: 4px;
}

/* Customer Form */
.order-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.flex-1 { flex: 1; }

.form-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #cbd5e1;
}

.req { color: #ef4444; }

.form-input, .form-select, .form-textarea {
  background: rgba(4, 16, 33, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 8px;
  padding: 9px 12px;
  color: #ffffff;
  font-family: inherit;
  font-size: 0.8rem;
  outline: none;
  transition: var(--transition-fast);
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--accent-salmon);
  box-shadow: 0 0 10px rgba(255, 107, 74, 0.3);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.btn-submit-order {
  padding: 14px;
  background: linear-gradient(135deg, #ff6b4a 0%, #e04828 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: var(--transition-fast);
  box-shadow: 0 4px 20px rgba(255, 107, 74, 0.4);
}

.btn-submit-order:hover {
  background: linear-gradient(135deg, #ff7d5f 0%, #ff5230 100%);
  transform: translateY(-2px);
}

.btn-zalo-quick {
  padding: 12px;
  background: rgba(14, 116, 144, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 10px;
  color: #bae6fd;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-zalo-quick:hover {
  background: rgba(14, 116, 144, 0.4);
  color: #ffffff;
}

/* Success Screen */
.success-screen {
  padding: 40px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.success-icon-box {
  font-size: 3rem;
  animation: floatGentle 3s ease-in-out infinite;
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: #38bdf8;
}

.success-order-id {
  font-size: 0.9rem;
  color: #fde047;
}

.success-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  max-width: 520px;
  line-height: 1.4;
}

.success-summary {
  width: 100%;
  max-width: 460px;
  background: #041021;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
  text-align: left;
}

.s-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.s-row strong {
  color: #ffffff;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 380px;
}

.btn-zalo-confirm {
  padding: 12px;
  background: #0284c7;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}

.btn-done {
  padding: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 768px) {
  .order-grid {
    grid-template-columns: 1fr;
  }
}
</style>
