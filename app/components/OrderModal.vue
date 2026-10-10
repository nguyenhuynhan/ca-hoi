<script setup lang="ts">
const { 
  currentProduct, 
  currentProcessing,
  isWholeFish,
  quantity, 
  isFreeship,
  shippingFee,
  subtotal,
  totalPrice,
  isOrderModalOpen,
  formatCurrency,
  promoCodes,
  appliedPromoCode,
  promoInputText,
  promoFeedback,
  currentPromo,
  isPromoValid,
  promoDiscount,
  applyPromoCode,
  removePromoCode
} = useSalmonStore()

// Customer inputs
const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')
const deliverySpeed = ref('fast2h') // 'fast2h' | 'scheduled'
const paymentMethod = ref('cod')   // 'cod' | 'vietqr'
const processingNote = ref('')

// Promo Input State
const localPromoInput = ref(appliedPromoCode.value || '')

watch(appliedPromoCode, (val) => {
  if (val) {
    localPromoInput.value = val
  } else {
    localPromoInput.value = ''
  }
})

const handleApplyPromo = () => {
  applyPromoCode(localPromoInput.value)
}

const handleQuickSelect = (code: string) => {
  localPromoInput.value = code
  applyPromoCode(code)
}

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
      promoCode: appliedPromoCode.value || undefined,
      promoDiscount: promoDiscount.value || 0,
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
                <span class="summary-prod-name">{{ currentProduct.name }}</span>
              </div>
              <div class="summary-meta-row">
                <span class="meta-tag">SL: {{ quantity }} {{ currentProduct.unit }}</span>
                <span class="meta-tag proc-tag">🔪 {{ currentProcessing.name }}</span>
                <span v-if="isWholeFish" class="meta-tag whole-tag">⚖️ Cân thực tế</span>
              </div>
            </div>
            <div class="summary-price-col">
              <span class="sum-price-val" :style="{ color: currentProduct.accentColor }">
                <template v-if="isWholeFish">
                  ~{{ formatCurrency(totalPrice) }}
                </template>
                <template v-else>
                  {{ formatCurrency(totalPrice) }}
                </template>
              </span>
              <span class="sum-ship-val" v-if="isWholeFish">
                Ước tính (báo giá chuẩn sau khi cân)
              </span>
              <span class="sum-ship-val" v-else-if="isFreeship">Freeship 2H</span>
              <span class="sum-ship-val" v-else>+30k ship</span>
            </div>
          </div>

          <!-- Price Breakdown Box -->
          <div class="price-breakdown-card">
            <div class="breakdown-row">
              <span class="bd-label">Tạm tính cá hồi:</span>
              <span class="bd-val">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="breakdown-row">
              <span class="bd-label">Phí giao lạnh 2H:</span>
              <span class="bd-val" :class="{ 'bd-free': isFreeship }">
                {{ isFreeship ? 'Miễn phí (Freeship)' : formatCurrency(shippingFee) }}
              </span>
            </div>
            <div v-if="promoDiscount > 0" class="breakdown-row discount-row">
              <span class="bd-label discount-label">
                <span class="promo-code-badge">🎟️ {{ appliedPromoCode }}</span> Giảm trừ khuyến mãi:
              </span>
              <span class="bd-val discount-val">-{{ formatCurrency(promoDiscount) }}</span>
            </div>
            <div class="breakdown-divider"></div>
            <div class="breakdown-row total-row">
              <span class="bd-total-label">
                {{ isWholeFish ? '⚖️ Ước tính thanh toán:' : '⚡ TỔNG THANH TOÁN:' }}
              </span>
              <span class="bd-total-val" :style="{ color: currentProduct.accentColor }">
                {{ isWholeFish ? '~' : '' }}{{ formatCurrency(totalPrice) }}
              </span>
            </div>
          </div>

          <!-- PROMO CODE VOUCHER SECTION -->
          <div class="promo-box-container">
            <div class="promo-box-header">
              <span class="promo-box-title">🎟️ Mã Khuyến Mãi / Voucher (Demo)</span>
              <span v-if="appliedPromoCode" class="applied-indicator">✓ Đã áp dụng</span>
            </div>

            <!-- Khi đã có mã áp dụng -->
            <div v-if="appliedPromoCode && currentPromo" class="active-promo-banner">
              <div class="active-promo-left">
                <span class="active-icon">{{ currentPromo.icon }}</span>
                <div class="active-info">
                  <div class="active-title-line">
                    <strong class="active-code-pill">{{ currentPromo.code }}</strong>
                    <span class="active-tag">{{ currentPromo.badge }}</span>
                  </div>
                  <span class="active-desc">{{ currentPromo.title }} • {{ currentPromo.description }}</span>
                  <span v-if="!isPromoValid" class="promo-min-warning">
                    ⚠️ Chưa đủ điều kiện: Đơn cần tối thiểu {{ formatCurrency(currentPromo.minOrderValue) }}
                  </span>
                </div>
              </div>
              <button type="button" class="btn-remove-code" @click="removePromoCode" title="Gỡ bỏ mã này">
                Gỡ bỏ ✕
              </button>
            </div>

            <!-- Khung nhập mã khi chưa áp dụng -->
            <div v-else class="promo-input-bar">
              <input 
                v-model="localPromoInput"
                type="text" 
                class="promo-input-field" 
                placeholder="Nhập mã ưu đãi (VD: CAHOI50, FREESHIP...)"
                @keyup.enter.prevent="handleApplyPromo"
              />
              <button 
                type="button" 
                class="btn-apply-code"
                :disabled="!localPromoInput.trim()"
                @click="handleApplyPromo"
              >
                Áp Dụng
              </button>
            </div>

            <!-- Feedback thông báo kết quả nhập mã -->
            <div v-if="promoFeedback.message" class="promo-alert" :class="promoFeedback.type">
              <span>{{ promoFeedback.type === 'success' ? '✓' : '⚠️' }}</span>
              <span>{{ promoFeedback.message }}</span>
            </div>

            <!-- Gợi ý các mã demo có sẵn bấm 1 chạm -->
            <div class="quick-promo-tags-row">
              <span class="quick-title">Chọn nhanh mã có sẵn:</span>
              <div class="quick-tags-list">
                <button 
                  v-for="p in promoCodes" 
                  :key="p.code"
                  type="button"
                  class="quick-pill-btn"
                  :class="{ active: appliedPromoCode === p.code }"
                  @click="handleQuickSelect(p.code)"
                >
                  <span class="qp-icon">{{ p.icon }}</span>
                  <span class="qp-code">{{ p.code }}</span>
                  <span class="qp-name">({{ p.title }})</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thông báo báo giá riêng cho cá nguyên con -->
          <div v-if="isWholeFish" class="whole-fish-order-notice">
            <span class="notice-icon">⚖️</span>
            <div class="notice-text">
              <strong>Lưu ý cá nguyên con:</strong> Cần phải cân thực tế (~5 - 6kg/con) rồi kho mới báo giá chính xác cho bạn được. Đơn hàng gửi đi để đặt giữ cá, kho sẽ gọi điện/Zalo báo cân nặng và giá chuẩn trước khi giao!
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
              <span v-else-if="isWholeFish">⚡ GỬI ĐƠN & NHẬN BÁO GIÁ CÂN THỰC TẾ</span>
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

          <!-- Tiết kiệm nhờ mã khuyến mãi nếu có -->
          <div v-if="orderResult.orderDetails?.promoDiscount > 0" class="success-promo-saved">
            🎉 Đơn hàng đã áp dụng mã <strong>{{ orderResult.orderDetails.promoCode }}</strong> và tiết kiệm <strong>{{ formatCurrency(orderResult.orderDetails.promoDiscount) }}</strong>!
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
  margin-bottom: 12px;
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

.whole-tag {
  color: #fdba74;
  background: rgba(255, 107, 74, 0.2);
  border: 1px solid rgba(255, 107, 74, 0.35);
  font-weight: 700;
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

/* PRICE BREAKDOWN CARD */
.price-breakdown-card {
  background: rgba(6, 20, 39, 0.65);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.bd-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bd-val {
  font-weight: 600;
  color: #e2e8f0;
}

.bd-free {
  color: #10b981;
  font-weight: 700;
}

.discount-row {
  color: #10b981;
}

.discount-label {
  color: #10b981;
}

.promo-code-badge {
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 800;
}

.discount-val {
  color: #10b981;
  font-weight: 800;
  font-size: 0.85rem;
}

.breakdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 2px 0;
}

.total-row {
  padding-top: 2px;
}

.bd-total-label {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
}

.bd-total-val {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
}

/* PROMO BOX CONTAINER */
.promo-box-container {
  background: rgba(8, 25, 50, 0.75);
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.promo-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.promo-box-title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.02em;
}

.applied-indicator {
  font-size: 0.7rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.active-promo-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 8px;
  padding: 8px 12px;
  gap: 10px;
}

.active-promo-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.active-icon {
  font-size: 1.25rem;
}

.active-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.active-title-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.active-code-pill {
  font-family: var(--font-display);
  color: #10b981;
  font-size: 0.85rem;
  font-weight: 800;
}

.active-tag {
  font-size: 0.62rem;
  font-weight: 800;
  background: rgba(255, 107, 74, 0.2);
  color: #fed7aa;
  padding: 1px 6px;
  border-radius: 4px;
}

.active-desc {
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.promo-min-warning {
  font-size: 0.68rem;
  color: #fbbf24;
  font-weight: 600;
}

.btn-remove-code {
  padding: 5px 10px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fca5a5;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-remove-code:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ffffff;
}

.promo-input-bar {
  display: flex;
  gap: 8px;
}

.promo-input-field {
  flex: 1;
  padding: 8px 12px;
  background: rgba(6, 20, 39, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.8rem;
  font-family: var(--font-sans);
  outline: none;
}

.promo-input-field:focus {
  border-color: #38bdf8;
}

.btn-apply-code {
  padding: 8px 14px;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-apply-code:hover:not(:disabled) {
  background: #38bdf8;
  color: #041021;
}

.btn-apply-code:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.promo-alert {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.promo-alert.success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
}

.promo-alert.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.quick-promo-tags-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quick-title {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.quick-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.quick-pill-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  color: #cbd5e1;
  font-size: 0.68rem;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-pill-btn:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
  color: #ffffff;
}

.quick-pill-btn.active {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  color: #34d399;
  font-weight: 700;
}

.qp-icon {
  font-size: 0.75rem;
}

.qp-code {
  font-weight: 700;
  font-family: var(--font-display);
}

.qp-name {
  color: var(--text-muted);
  font-size: 0.64rem;
}

.quick-pill-btn.active .qp-name {
  color: #a7f3d0;
}

.whole-fish-order-notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(255, 107, 74, 0.12);
  border: 1px solid rgba(255, 107, 74, 0.35);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
}

.whole-fish-order-notice .notice-icon {
  font-size: 1.1rem;
  line-height: 1;
  flex-shrink: 0;
}

.whole-fish-order-notice .notice-text {
  font-size: 0.72rem;
  line-height: 1.4;
  color: #fed7aa;
}

.whole-fish-order-notice .notice-text strong {
  color: #ffffff;
  font-weight: 800;
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
  transition: opacity 0.2s, transform 0.2s;
}

.btn-submit-order:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
}

.btn-submit-order:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* SUCCESS STATE */
.order-success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 8px;
  gap: 12px;
}

.success-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.15);
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

.success-promo-saved {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 8px 16px;
  border-radius: 8px;
  color: #34d399;
  font-size: 0.8rem;
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .order-fields-grid {
    grid-template-columns: 1fr;
  }

  .item-summary-card {
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px;
  }

  .summary-details {
    flex: 1;
    min-width: 170px;
  }

  .summary-price-col {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 6px;
    margin-top: 4px;
  }
}
</style>
