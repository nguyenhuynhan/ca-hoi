<script setup lang="ts">
const { 
  promoCodes, 
  isPromoModalOpen, 
  appliedPromoCode, 
  currentPromo,
  subtotal, 
  formatCurrency, 
  applyPromoCode, 
  removePromoCode, 
  closePromoModal,
  selectAndApplyPromo,
  isOrderModalOpen
} = useSalmonStore()

const copiedCode = ref('')

const copyPromoCode = (code: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code)
  }
  copiedCode.value = code
  setTimeout(() => {
    copiedCode.value = ''
  }, 2000)
}

const handleUseCode = (code: string) => {
  const ok = selectAndApplyPromo(code)
  if (!ok) {
    // If not meeting min value yet, still allow user to proceed to order modal to view requirement
    isPromoModalOpen.value = false
    isOrderModalOpen.value = true
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isPromoModalOpen" class="modal-backdrop" @click.self="closePromoModal">
      <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="promo-modal-title">
        <!-- Close Button -->
        <button class="btn-close" @click="closePromoModal" aria-label="Đóng bảng mã ưu đãi">
          ✕
        </button>

        <!-- Header -->
        <div class="modal-header">
          <span class="header-badge">🎟️ KHO ƯU ĐÃI KHÁCH HÀNG (DEMO)</span>
          <h2 id="promo-modal-title" class="promo-main-title">Mã Giảm Giá & Quà Tặng Hôm Nay</h2>
          <p class="header-sub">
            Chọn ngay mã khuyến mãi bên dưới để được giảm trực tiếp trên tổng thanh toán khi chốt đơn cá hồi tươi.
          </p>
        </div>

        <!-- Promo Cards Grid -->
        <div class="promo-cards-grid">
          <div 
            v-for="promo in promoCodes" 
            :key="promo.code"
            class="promo-card"
            :class="{ 
              'promo-active': appliedPromoCode === promo.code,
              'promo-highlight': promo.highlight && appliedPromoCode !== promo.code
            }"
          >
            <!-- Card Top: Icon & Badge -->
            <div class="card-top-row">
              <div class="promo-icon-wrap">
                <span class="promo-icon">{{ promo.icon }}</span>
              </div>
              <span class="promo-tag-badge">{{ promo.badge }}</span>
            </div>

            <!-- Card Body -->
            <div class="card-body">
              <h3 class="promo-title">{{ promo.title }}</h3>
              <p class="promo-desc">{{ promo.description }}</p>

              <!-- Code Box & Copy -->
              <div class="code-box-row">
                <div class="code-pill">
                  <span class="code-text">{{ promo.code }}</span>
                </div>
                <button 
                  class="btn-copy-code"
                  @click="copyPromoCode(promo.code)"
                  :title="`Sao chép mã ${promo.code}`"
                >
                  <span v-if="copiedCode === promo.code" class="copy-feedback">✓ Đã chép</span>
                  <span v-else>📋 Chép</span>
                </button>
              </div>

              <!-- Conditions -->
              <div class="conditions-box">
                <div class="cond-item">
                  <span class="cond-dot">•</span>
                  <span>Đơn tối thiểu: <strong>{{ promo.minOrderValue > 0 ? formatCurrency(promo.minOrderValue) : '0 đ (Mọi đơn)' }}</strong></span>
                </div>
                <div v-if="promo.maxDiscount" class="cond-item">
                  <span class="cond-dot">•</span>
                  <span>Giảm tối đa: <strong>{{ formatCurrency(promo.maxDiscount) }}</strong></span>
                </div>
                <div class="cond-item">
                  <span class="cond-dot">•</span>
                  <span>Hiệu lực: <strong class="valid-text">Áp dụng tức thì</strong></span>
                </div>
              </div>
            </div>

            <!-- Card Bottom Action -->
            <div class="card-footer">
              <template v-if="appliedPromoCode === promo.code">
                <div class="applied-state-wrap">
                  <span class="applied-pill">✓ Đang Sử Dụng</span>
                  <button class="btn-cancel-apply" @click="removePromoCode">Gỡ bỏ</button>
                </div>
              </template>
              <template v-else>
                <button 
                  class="btn-apply-action"
                  @click="handleUseCode(promo.code)"
                >
                  <span v-if="promo.minOrderValue > 0 && subtotal < promo.minOrderValue" class="cond-hint">
                    ⚡ Áp dụng (Đơn cần ≥ {{ formatCurrency(promo.minOrderValue) }})
                  </span>
                  <span v-else>
                    ⚡ Áp Dụng & Chốt Đơn
                  </span>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Note & Footer -->
        <div class="modal-footer">
          <div class="footer-note">
            <span class="note-icon">💡</span>
            <span class="note-text">
              Bạn cũng có thể nhập trực tiếp các mã khuyến mãi này tại khung thanh toán của đơn hàng bất cứ lúc nào.
            </span>
          </div>
          <button class="btn-close-modal" @click="closePromoModal">
            Đóng
          </button>
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
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 820px;
  max-height: 94vh;
  background: rgba(4, 16, 33, 0.96);
  border: 1px solid rgba(56, 189, 248, 0.35);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(56, 189, 248, 0.2);
  border-radius: 18px;
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

.modal-header {
  margin-bottom: 20px;
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

.promo-main-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
}

.header-sub {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

.promo-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.promo-card {
  position: relative;
  background: rgba(8, 25, 50, 0.75);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);
}

.promo-card:hover {
  border-color: rgba(56, 189, 248, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5);
}

.promo-card.promo-active {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.25);
}

.promo-card.promo-highlight {
  border-color: rgba(255, 107, 74, 0.45);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.promo-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.promo-tag-badge {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 9999px;
  background: rgba(255, 107, 74, 0.18);
  border: 1px solid rgba(255, 107, 74, 0.4);
  color: #ffedd5;
  letter-spacing: 0.04em;
}

.promo-title {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 4px;
}

.promo-desc {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin: 0 0 12px;
  line-height: 1.35;
}

.code-box-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.code-pill {
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  border: 1px dashed rgba(56, 189, 248, 0.4);
  border-radius: 8px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
}

.code-text {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.08em;
}

.btn-copy-code {
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-copy-code:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #ffffff;
}

.copy-feedback {
  color: #10b981;
  font-weight: 700;
}

.conditions-box {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.72rem;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
}

.cond-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cond-dot {
  color: var(--accent-salmon);
}

.valid-text {
  color: #10b981;
}

.card-footer {
  margin-top: auto;
}

.applied-state-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.applied-pill {
  flex: 1;
  background: #10b981;
  color: #ffffff;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-cancel-apply {
  padding: 7px 12px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  border-radius: 8px;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel-apply:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #ffffff;
}

.btn-apply-action {
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(255, 107, 74, 0.2) 100%);
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-apply-action:hover {
  background: linear-gradient(135deg, #38bdf8 0%, #ff6b4a 100%);
  border-color: #ff6b4a;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(255, 107, 74, 0.4);
}

.cond-hint {
  font-size: 0.72rem;
  opacity: 0.9;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 14px;
}

.footer-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.btn-close-modal {
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-close-modal:hover {
  background: rgba(255, 255, 255, 0.15);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 680px) {
  .promo-cards-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .modal-card {
    padding: 16px;
  }
  .promo-main-title {
    font-size: 1.25rem;
  }
  .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-close-modal {
    width: 100%;
    text-align: center;
  }
}
</style>
