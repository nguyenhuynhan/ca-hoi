<script setup lang="ts">
const { 
  currentProduct, 
  isWholeFish,
  quantity,
  isFreeship,
  shippingFee,
  subtotal,
  totalPrice,
  isPriceTableOpen,
  isOrderModalOpen,
  recipes,
  openRecipe,
  formatCurrency,
  setQuantity,
  incQuantity,
  decQuantity
} = useSalmonStore()

const triggerOrder = () => {
  isOrderModalOpen.value = true
}

const togglePriceTable = () => {
  isPriceTableOpen.value = true
}

const quantityPresets = computed(() => {
  if (isWholeFish.value) {
    return [1, 2, 3]
  }
  return [1, 2, 3, 5]
})
</script>

<template>
  <footer class="bottom-dock-wrapper">
    <div class="dock-container glass-panel">
      <!-- DÀNH CHO MOBILE: HÀNG TRÊN (Tên sản phẩm đầy đủ + Tag + Bộ chọn số lượng) -->
      <div class="mobile-dock-header hide-desktop">
        <div class="mobile-item-info">
          <span class="mobile-qty-pill">{{ quantity }}x</span>
          <span class="mobile-prod-name">{{ currentProduct.shortName }}</span>
          <span v-if="isWholeFish" class="mobile-tag tag-weigh">⚖️ Cân thực tế</span>
          <span v-else-if="isFreeship" class="mobile-tag tag-free">🚀 Freeship 2H</span>
          <span v-else class="mobile-tag tag-ship">Phí ship 30k</span>
        </div>

        <div class="dock-stepper-wrap mobile-stepper">
          <button class="step-btn" @click="decQuantity" :disabled="quantity <= 1" aria-label="Giảm">-</button>
          <span class="qty-val">{{ quantity }}</span>
          <button class="step-btn" @click="incQuantity" aria-label="Tăng">+</button>
        </div>
      </div>

      <!-- HÀNG CHÍNH (Desktop: 1 hàng đầy đủ | Mobile: Hàng dưới gồm Giá + Nút Chốt đơn) -->
      <div class="dock-main-row">
        <!-- Cột chọn số lượng & Presets (Chỉ hiện trên Desktop) -->
        <div class="dock-qty-col hide-mobile">
          <div class="dock-stepper-wrap">
            <button class="step-btn" @click="decQuantity" :disabled="quantity <= 1" aria-label="Giảm">-</button>
            <span class="qty-val">{{ quantity }}</span>
            <button class="step-btn" @click="incQuantity" aria-label="Tăng">+</button>
          </div>
          <span class="dock-unit-label">{{ currentProduct.unit }}</span>

          <!-- Preset buttons nhanh (Desktop) -->
          <div class="dock-presets-list">
            <button 
              v-for="q in quantityPresets" 
              :key="q"
              class="preset-mini-btn"
              :class="{ active: quantity === q }"
              @click="setQuantity(q)"
            >
              {{ q }} {{ currentProduct.unit }}
              <span v-if="!isWholeFish && q >= 3" class="mini-tag">Freeship</span>
              <span v-else-if="isWholeFish" class="mini-tag-weigh">Cân kg</span>
            </button>
          </div>
        </div>

        <!-- Cột tóm tắt tổng tạm tính -->
        <div class="dock-summary">
          <div class="dock-price-row">
            <span class="dock-total-label">
              {{ isWholeFish ? '⚖️ CÂN BÁO GIÁ:' : 'TỔNG TẠM TÍNH:' }}
            </span>
            <div class="price-figures">
              <span class="dock-total-val" :style="{ color: currentProduct.accentColor }">
                {{ isWholeFish ? '~' + formatCurrency(totalPrice) : formatCurrency(totalPrice) }}
              </span>
              <span class="dock-shipping-note hide-mobile" v-if="isWholeFish">
                (cân ~5-6kg)
              </span>
              <span class="dock-shipping-note" v-else-if="shippingFee > 0">
                (+ {{ formatCurrency(shippingFee) }} ship)
              </span>
              <span class="dock-shipping-note free-ship-text" v-else-if="isFreeship && !isWholeFish">
                (Đã Freeship)
              </span>
            </div>
          </div>

          <!-- Dòng tag chi tiết trên Desktop -->
          <div class="dock-tags-row hide-mobile">
            <span class="dock-tag item-name-tag">{{ quantity }}x {{ currentProduct.shortName }}</span>
            <span class="dock-tag-dot">•</span>
            <span v-if="isWholeFish" class="dock-tag whole-fish-tag">Cân thực tế</span>
            <template v-else>
              <span class="dock-tag freeship" v-if="isFreeship">🚀 Freeship 2H</span>
              <span class="dock-tag" v-else>Phí ship 30k</span>
            </template>
          </div>
        </div>

        <!-- Cột nút thao tác & Nút Chốt đơn -->
        <div class="dock-actions">
          <!-- NÚT CHỐT ĐƠN CÁ HỒI -->
          <button 
            class="btn-order-cta" 
            :style="{
              background: `linear-gradient(135deg, ${currentProduct.accentColor} 0%, #dc2626 100%)`,
              boxShadow: `0 6px 24px -2px ${currentProduct.accentColor}88`
            }"
            @click="triggerOrder"
          >
            <span class="btn-cta-text">
              {{ isWholeFish ? '⚡ CHỐT ĐƠN (CÂN BÁO GIÁ)' : '⚡ CHỐT ĐƠN' }}
            </span>
            <span class="btn-cta-sub hide-mobile">
              {{ isWholeFish ? 'Kho cân thực tế và báo giá chuẩn trước khi giao' : 'Giao lạnh nguyên vẹn trong 2 giờ' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bottom-dock-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 8px 6px;
  z-index: 50;
  flex-shrink: 0;
  box-sizing: border-box;
}

.dock-container {
  width: 100%;
  max-width: 1140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
  background: rgba(4, 16, 33, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
  gap: 14px;
}

.dock-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 14px;
}

.hide-desktop {
  display: none !important;
}

/* CỘT CHỌN SỐ LƯỢNG */
.dock-qty-col {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.dock-stepper-wrap {
  display: flex;
  align-items: center;
  background: rgba(4, 16, 33, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.step-btn {
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.step-btn:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.25);
}

.step-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-val {
  min-width: 24px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
}

.dock-unit-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
}

.dock-presets-list {
  display: flex;
  align-items: center;
  gap: 5px;
}

.preset-mini-btn {
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.18s;
  white-space: nowrap;
}

.preset-mini-btn:hover {
  background: rgba(14, 42, 77, 0.6);
  color: #ffffff;
  border-color: rgba(56, 189, 248, 0.4);
}

.preset-mini-btn.active {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
  color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 107, 74, 0.35);
}

.mini-tag {
  font-size: 0.52rem;
  font-weight: 800;
  background: #38bdf8;
  color: #041021;
  padding: 0 3px;
  border-radius: 2px;
}

.mini-tag-weigh {
  font-size: 0.52rem;
  font-weight: 800;
  background: #f97316;
  color: #041021;
  padding: 0 3px;
  border-radius: 2px;
}

/* CỘT TỔNG TIỀN */
.dock-summary {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.dock-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.dock-total-label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.price-figures {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.dock-total-val {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
}

.dock-shipping-note {
  font-size: 0.68rem;
  color: var(--text-secondary);
}

.dock-tags-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.dock-tag {
  font-size: 0.68rem;
  color: var(--text-secondary);
  line-height: 1;
}

.item-name-tag {
  font-weight: 700;
  color: #ffffff;
}

.dock-tag.freeship {
  color: #38bdf8;
  font-weight: 700;
}

.dock-tag-dot {
  font-size: 0.5rem;
  color: #475569;
}

/* CỘT THAO TÁC */
.dock-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.glass-pill {
  padding: 8px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  font-size: 0.76rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.glass-pill:hover {
  background: rgba(14, 42, 77, 0.9);
  border-color: var(--accent-ice);
  transform: translateY(-1px);
}

.btn-view-table {
  color: #fde047;
  border-color: rgba(251, 191, 36, 0.3);
}

.btn-view-table:hover {
  background: rgba(251, 191, 36, 0.15);
  border-color: #fbbf24;
}

.btn-order-cta {
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-order-cta:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.1);
}

.btn-cta-text {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  line-height: 1.1;
  white-space: nowrap;
}

.btn-cta-sub {
  font-size: 0.62rem;
  opacity: 0.9;
  font-weight: 600;
  white-space: nowrap;
}

.whole-fish-tag {
  color: #fdba74;
  font-weight: 700;
  background: rgba(255, 107, 74, 0.2);
  border: 1px solid rgba(255, 107, 74, 0.4);
  padding: 1px 6px;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .hide-tablet {
    display: none !important;
  }
}

@media (max-width: 680px) {
  .hide-desktop {
    display: flex !important;
  }
  .hide-mobile {
    display: none !important;
  }

  .bottom-dock-wrapper {
    padding: 0 8px 8px;
  }

  .dock-container {
    flex-direction: column;
    padding: 10px 14px 12px;
    gap: 9px;
    border-radius: 16px;
    background: rgba(4, 16, 33, 0.94);
    border: 1px solid rgba(56, 189, 248, 0.25);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  }

  /* Hàng 1 (Mobile Top): Tên sản phẩm + Tag + Stepper */
  .dock-mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    padding-bottom: 7px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  }

  .mobile-item-info {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    min-width: 0;
  }

  .mobile-qty-pill {
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 1px 6px;
    border-radius: 4px;
    line-height: 1;
  }

  .mobile-prod-name {
    font-family: var(--font-display);
    font-size: 0.76rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    white-space: normal;
  }

  .mobile-tag {
    font-size: 0.58rem;
    font-weight: 700;
    padding: 1.5px 6px;
    border-radius: 4px;
    line-height: 1;
    white-space: nowrap;
  }

  .mobile-tag.tag-free {
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.35);
  }

  .mobile-tag.tag-ship {
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .mobile-tag.tag-weigh {
    color: #fdba74;
    background: rgba(249, 115, 22, 0.15);
    border: 1px solid rgba(249, 115, 22, 0.35);
  }

  .mobile-stepper {
    flex-shrink: 0;
  }

  .mobile-stepper .step-btn {
    width: 26px;
    height: 26px;
    font-size: 0.95rem;
  }

  .mobile-stepper .qty-val {
    min-width: 22px;
    font-size: 0.88rem;
  }

  /* Hàng 2 (Mobile Main Row): Giá tổng + Nút Chốt đơn */
  .dock-main-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
  }

  .dock-summary {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .dock-price-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
  }

  .dock-total-label {
    font-size: 0.58rem;
    letter-spacing: 0.04em;
    color: #94a3b8;
  }

  .price-figures {
    display: flex;
    align-items: baseline;
    gap: 6px;
    flex-wrap: wrap;
  }

  .dock-total-val {
    font-size: 1.22rem;
    font-weight: 900;
    line-height: 1;
  }

  .dock-shipping-note {
    font-size: 0.62rem;
    color: #94a3b8;
  }

  .free-ship-text {
    color: #38bdf8 !important;
    font-weight: 700;
  }

  .dock-actions {
    flex-shrink: 0;
  }

  .btn-order-cta {
    padding: 10px 18px;
    border-radius: 10px;
  }

  .btn-cta-text {
    font-size: 0.88rem;
    letter-spacing: 0.02em;
  }
}
</style>
