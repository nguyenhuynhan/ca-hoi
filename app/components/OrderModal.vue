<script setup lang="ts">
const { 
  currentProduct, 
  currentProcessing,
  quantity, 
  isFreeship,
  shippingFee,
  subtotal,
  totalPrice,
  isOrderModalOpen,
  formatCurrency 
} = useSalmonStore()

// Customer inputs
const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')
const deliverySpeed = ref('fast2h') // 'fast2h' | 'scheduled'
const paymentMethod = ref('cod')   // 'cod' | 'vietqr'
const processingNote = ref('')

// Submission Status
const isSubmitting = ref(false)
const orderResult = ref<any>(null)
const errorMessage = ref('')

const closeModal = () => {
  isOrderModalOpen.value = false
  if (orderResult.value) {
    orderResult.value = null
  }
}

const submitOrder = async () => {
  if (!customerName.value.trim()) {
    errorMessage.value = 'Vui lòng nhập Họ & Tên của bạn'
    return
  }
  if (!customerPhone.value.trim() || !/^[0-9+ ]{9,12}$/.test(customerPhone.value.trim())) {
    errorMessage.value = 'Vui lòng nhập số điện thoại hợp lệ (9-11 số)'
    return
  }
  if (!customerAddress.value.trim()) {
    errorMessage.value = 'Vui lòng nhập địa chỉ nhận hàng để kho ướp đá giao tận nơi'
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const payload = {
      product: {
        id: currentProduct.value.id,
        name: currentProduct.value.name,
        sku: currentProduct.value.sku,
        unit: currentProduct.value.unit,
        priceDisplay: currentProduct.value.priceDisplay
      },
      quantity: quantity.value,
      processing: {
        id: currentProcessing.value.id,
        name: currentProcessing.value.name
      },
      customer: {
        name: customerName.value,
        phone: customerPhone.value,
        address: customerAddress.value
      },
      deliverySpeed: deliverySpeed.value,
      paymentMethod: paymentMethod.value,
      processingNote: processingNote.value,
      subtotal: subtotal.value,
      shippingFee: shippingFee.value,
      totalAmount: totalPrice.value
    }

    const res = await $fetch('/api/order', {
      method: 'POST',
      body: payload
    })

    orderResult.value = res
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || 'Có lỗi xảy ra khi gửi đơn hàng, vui lòng thử lại.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOrderModalOpen" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <!-- Close Button -->
        <button class="btn-close" @click="closeModal" aria-label="Đóng cửa sổ đặt hàng">
          ✕
        </button>

        <!-- STATE 1: FORM ĐẶT HÀNG -->
        <div v-if="!orderResult" class="order-form-container">
          <!-- Header -->
          <div class="order-header">
            <span class="header-badge">⚡ CHỐT ĐƠN HỎA TỐC 2H</span>
            <h2 id="order-title" class="order-title">Xác Nhận Đơn Hàng Cá Hồi</h2>
            <p class="order-desc">Kho kiểm tra cá, cắt thái theo yêu cầu và đóng thùng xốp ướp đá giao ngay.</p>
          </div>

          <!-- Order Summary Card -->
          <div class="item-summary-card">
            <img :src="currentProduct.image" :alt="currentProduct.name" class="summary-thumb" />
            <div class="summary-details">
              <div class="summary-name-row">
                <span class="product-flag">{{ currentProduct.flag }}</span>
                <span class="summary-prod-name">{{ currentProduct.name }}</span>
              </div>
              <div class="summary-meta-row">
                <span class="meta-tag">SKU: {{ currentProduct.sku }}</span>
                <span class="meta-tag">SL: {{ quantity }} {{ currentProduct.unit }}</span>
                <span class="meta-tag proc-tag">🔪 {{ currentProcessing.name }}</span>
              </div>
            </div>
            <div class="summary-price-col">
              <span class="sum-price-val" :style="{ color: currentProduct.accentColor }">
                {{ formatCurrency(totalPrice) }}
              </span>
              <span class="sum-ship-val" v-if="isFreeship">Freeship 2H</span>
              <span class="sum-ship-val" v-else>+30k ship</span>
            </div>
          </div>

          <!-- Customer Form -->
          <form class="order-fields-grid" @submit.prevent="submitOrder">
            <div class="field-group">
              <label class="field-label">Họ & Tên khách hàng *</label>
              <input 
                v-model="customerName"
                type="text" 
                class="field-input" 
                placeholder="Ví dụ: Nguyễn Văn An"
                required
              />
            </div>

            <div class="field-group">
              <label class="field-label">Số điện thoại nhận hàng *</label>
              <input 
                v-model="customerPhone"
                type="tel" 
                class="field-input" 
                placeholder="Ví dụ: 0912 345 678"
                required
              />
            </div>

            <div class="field-group full-width">
              <label class="field-label">Địa chỉ giao hàng tận nơi *</label>
              <input 
                v-model="customerAddress"
                type="text" 
                class="field-input" 
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, TP..."
                required
              />
            </div>

            <div class="field-group">
              <label class="field-label">Thời gian nhận hàng</label>
              <select v-model="deliverySpeed" class="field-input field-select">
                <option value="fast2h">🚀 Hỏa tốc 2 giờ (Ướp đá tận nơi)</option>
                <option value="scheduled">🕒 Hẹn giờ trong ngày / Bữa tối</option>
              </select>
            </div>

            <div class="field-group">
              <label class="field-label">Hình thức thanh toán</label>
              <select v-model="paymentMethod" class="field-input field-select">
                <option value="cod">💵 Nhận hàng kiểm tra thanh toán (COD)</option>
                <option value="vietqr">📲 Chuyển khoản VietQR (Mã QR tức thì)</option>
              </select>
            </div>

            <div class="field-group full-width">
              <label class="field-label">Ghi chú cắt thái & bảo quản</label>
              <input 
                v-model="processingNote"
                type="text" 
                class="field-input" 
                placeholder="Ví dụ: Cắt mỏng ăn Sashimi, giữ lại xương nấu lẩu, lấy thêm gừng wasabi..."
              />
            </div>

            <!-- Error message if any -->
            <div v-if="errorMessage" class="error-banner">
              ⚠️ {{ errorMessage }}
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn-submit-order"
              :disabled="isSubmitting"
              :style="{
                background: `linear-gradient(135deg, ${currentProduct.accentColor} 0%, #dc2626 100%)`
              }"
            >
              <span v-if="isSubmitting">Đang xử lý đơn hàng...</span>
              <span v-else>XÁC NHẬN ĐẶT HÀNG — {{ formatCurrency(totalPrice) }}</span>
            </button>
          </form>
        </div>

        <!-- STATE 2: KẾT QUẢ ĐẶT HÀNG THÀNH CÔNG -->
        <div v-else class="order-success-container">
          <div class="success-icon-wrap">✓</div>
          <h2 class="success-title">Đặt Hàng Thành Công!</h2>
          <p class="success-msg">Cảm ơn bạn! Đơn hàng đã được chuyển thẳng tới bộ phận kho lạnh.</p>

          <div class="success-code-box">
            <span class="code-label">MÃ ĐƠN HÀNG:</span>
            <strong class="code-val">{{ orderResult.orderId }}</strong>
          </div>

          <!-- VietQR Code nếu chọn chuyển khoản -->
          <div v-if="orderResult.qrUrl && paymentMethod === 'vietqr'" class="qr-box">
            <span class="qr-hint">Quét mã VietQR bằng app ngân hàng để thanh toán nhanh:</span>
            <img :src="orderResult.qrUrl" alt="VietQR Thanh Toán" class="qr-img" />
          </div>

          <div class="success-actions">
            <a 
              :href="`https://zalo.me?text=Tôi vừa đặt đơn ${orderResult.orderId} cá hồi trên website`" 
              target="_blank" 
              class="btn-zalo-confirm"
            >
              Nhắn Zalo Kho Xác Nhận Nhanh
            </a>
            <button class="btn-close-success" @click="closeModal">
              Hoàn Tất
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 680px;
  max-height: 94vh;
  background: rgba(4, 16, 33, 0.96);
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(56, 189, 248, 0.2);
  border-radius: 16px;
  overflow-y: auto;
  padding: 24px;
}

.btn-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: #ef4444;
}

.order-header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-badge {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--accent-salmon);
  letter-spacing: 0.08em;
}

.order-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
}

.order-desc {
  font-size: 0.76rem;
  color: var(--text-secondary);
}

.item-summary-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(8, 25, 50, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  margin-bottom: 16px;
}

.summary-thumb {
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}

.summary-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.summary-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.summary-prod-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: #ffffff;
}

.summary-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-tag {
  font-size: 0.65rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
}

.proc-tag {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
}

.summary-price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sum-price-val {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
}

.sum-ship-val {
  font-size: 0.65rem;
  color: #34d399;
}

.order-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.full-width {
  grid-column: 1 / -1;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 0.74rem;
  font-weight: 700;
  color: #cbd5e1;
}

.field-input {
  width: 100%;
  padding: 9px 12px;
  background: rgba(6, 20, 39, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.82rem;
  font-family: var(--font-sans);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.field-input:focus {
  border-color: var(--accent-ice);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.field-select {
  cursor: pointer;
}

.error-banner {
  grid-column: 1 / -1;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.78rem;
}

.btn-submit-order {
  grid-column: 1 / -1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  cursor: pointer;
  margin-top: 6px;
  box-shadow: 0 6px 20px rgba(255, 107, 74, 0.4);
  transition: all 0.2s;
}

.btn-submit-order:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-submit-order:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* SUCCESS STATE */
.order-success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 8px;
  gap: 12px;
}

.success-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.2);
  border: 2px solid #34d399;
  color: #34d399;
  font-size: 1.8rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
}

.success-msg {
  font-size: 0.8rem;
  color: var(--text-secondary);
  max-width: 420px;
}

.success-code-box {
  background: rgba(6, 23, 48, 0.8);
  border: 1px dashed rgba(56, 189, 248, 0.4);
  padding: 10px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.code-label {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.code-val {
  font-family: monospace;
  font-size: 1.15rem;
  color: #38bdf8;
  letter-spacing: 0.05em;
}

.qr-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.qr-hint {
  font-size: 0.75rem;
  color: #facc15;
}

.qr-img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 2px solid #ffffff;
  background: #ffffff;
}

.success-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.btn-zalo-confirm {
  padding: 9px 18px;
  background: #0068ff;
  border-radius: 8px;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.btn-close-success {
  padding: 9px 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 600px) {
  .order-fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
