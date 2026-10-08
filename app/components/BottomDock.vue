<script setup lang="ts">
const { 
  currentProduct, 
  quantity,
  isFreeship,
  shippingFee,
  subtotal,
  totalPrice,
  isPriceTableOpen,
  isOrderModalOpen,
  recipes,
  openRecipe,
  formatCurrency 
} = useSalmonStore()

const triggerOrder = () => {
  isOrderModalOpen.value = true
}

const togglePriceTable = () => {
  isPriceTableOpen.value = true
}

const matchingRecipe = computed(() => {
  return recipes.find(r => r.recommendedProductId === currentProduct.value.id) || recipes[0]
})

const handleViewRecipe = () => {
  openRecipe(matchingRecipe.value.id)
}
</script>

<template>
  <footer class="bottom-dock-wrapper">
    <div class="dock-container glass-panel">
      <!-- Summary Info Column -->
      <div class="dock-summary">
        <div class="dock-price-row">
          <span class="dock-total-label">TỔNG TẠM TÍNH:</span>
          <div class="price-figures">
            <span class="dock-total-val" :style="{ color: currentProduct.accentColor }">
              {{ formatCurrency(totalPrice) }}
            </span>
            <span class="dock-shipping-note" v-if="shippingFee > 0">
              (+ {{ formatCurrency(shippingFee) }} ship)
            </span>
          </div>
        </div>

        <div class="dock-tags-row">
          <span class="dock-tag item-name-tag">{{ quantity }}x {{ currentProduct.shortName }}</span>
          <span class="dock-tag-dot">•</span>
          <button class="dock-tag recipe-tag-clickable" @click="handleViewRecipe" title="Bấm xem công thức món này">
            🍳 {{ matchingRecipe.shortName }} ↗
          </button>
          <span class="dock-tag-dot hide-mobile">•</span>
          <span class="dock-tag freeship hide-mobile" v-if="isFreeship">🚀 Freeship 2H</span>
          <span class="dock-tag hide-mobile" v-else>Phí ship 30k</span>
          <span class="dock-tag-dot hide-mobile">•</span>
          <span class="dock-tag ice-tag hide-mobile">Ướp đá 0-2°C</span>
        </div>
      </div>

      <!-- Action Buttons Column -->
      <div class="dock-actions">
        <!-- Xem công thức món ngon button -->
        <button 
          class="btn-view-recipe glass-pill" 
          @click="handleViewRecipe"
          title="Xem hình ảnh & cách nấu món ngon với loại cá này"
        >
          <span class="btn-icon">🍳</span>
          <span class="btn-text">Công Thức Nấu</span>
        </button>

        <!-- Xem bảng giá chi tiết button -->
        <button 
          class="btn-view-table glass-pill hide-mobile" 
          @click="togglePriceTable"
          title="Xem bảng báo giá cả 8 loại cá hồi"
        >
          <span class="btn-icon">📋</span>
          <span class="btn-text">Bảng Giá Gốc</span>
        </button>

        <!-- Hotline Call -->
        <a 
          href="tel:1900888999" 
          class="btn-call glass-pill hide-tablet"
          title="Gọi Hotline Kho 1900 888 999"
        >
          <span class="btn-icon">📞</span>
          <span class="btn-text">1900 888 999</span>
        </a>

        <!-- NÚT CHỐT ĐƠN CÁ HỒI -->
        <button 
          class="btn-order-cta" 
          :style="{
            background: `linear-gradient(135deg, ${currentProduct.accentColor} 0%, #dc2626 100%)`,
            boxShadow: `0 6px 24px -2px ${currentProduct.accentColor}88`
          }"
          @click="triggerOrder"
        >
          <span class="btn-cta-text">⚡ ĐẶT HÀNG NGAY</span>
          <span class="btn-cta-sub hide-mobile">Giao lạnh nguyên vẹn trong 2 giờ</span>
        </button>
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
  padding: 7px 18px;
  background: rgba(4, 16, 33, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
  gap: 16px;
}

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

.recipe-tag-clickable {
  background: rgba(255, 107, 74, 0.15);
  border: 1px solid rgba(255, 107, 74, 0.35);
  color: #fed7aa;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.recipe-tag-clickable:hover {
  background: var(--accent-salmon);
  color: #ffffff;
  border-color: var(--accent-salmon);
}

.dock-tag.freeship {
  color: #38bdf8;
  font-weight: 700;
}

.dock-tag.ice-tag {
  color: #7dd3fc;
}

.dock-tag-dot {
  font-size: 0.5rem;
  color: #475569;
}

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

.btn-view-recipe {
  color: #fed7aa;
  border-color: rgba(255, 107, 74, 0.4);
  background: rgba(255, 107, 74, 0.12);
}

.btn-view-recipe:hover {
  background: rgba(255, 107, 74, 0.25);
  border-color: var(--accent-salmon);
  color: #ffffff;
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

@media (max-width: 900px) {
  .hide-tablet {
    display: none !important;
  }
}

@media (max-width: 680px) {
  .bottom-dock-wrapper {
    padding: 0 4px 4px;
  }
  .dock-container {
    padding: 6px 10px;
    gap: 8px;
  }
  .dock-total-val {
    font-size: 1.15rem;
  }
  .btn-order-cta {
    padding: 7px 12px;
  }
  .btn-cta-text {
    font-size: 0.78rem;
  }
  .btn-view-recipe {
    padding: 6px 8px;
    font-size: 0.7rem;
  }
  .hide-mobile {
    display: none !important;
  }
}
</style>
