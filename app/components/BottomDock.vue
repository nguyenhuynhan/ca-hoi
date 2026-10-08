<script setup lang="ts">
const {
  currentProduct,
  quantity,
  totalPrice,
  formatCurrency,
  isPriceTableOpen,
  isOrderModalOpen
} = useSalmonStore()

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQty = () => {
  if (quantity.value < 99) {
    quantity.value++
  }
}

const openPriceTable = () => {
  isPriceTableOpen.value = true
}

const openOrderModal = () => {
  isOrderModalOpen.value = true
}
</script>

<template>
  <div class="bottom-dock">
    <div class="dock-container">
      <!-- Left: Active Product Preview -->
      <div class="dock-product-summary">
        <div class="product-thumb">
          <img :src="currentProduct.image" :alt="currentProduct.name" />
        </div>
        <div class="product-meta">
          <div class="meta-row">
            <span class="meta-sku">SKU: {{ currentProduct.sku }}</span>
            <span class="meta-origin">{{ currentProduct.flag }} {{ currentProduct.origin }}</span>
          </div>
          <div class="meta-name">{{ currentProduct.name }}</div>
          <div class="meta-price">
            <span class="price-num">{{ currentProduct.priceDisplay }}</span>
            <span class="meta-spec">({{ currentProduct.sizeSpec }})</span>
          </div>
        </div>
      </div>

      <!-- Center: Quantity Selector & Subtotal Calculation -->
      <div class="dock-calc-zone">
        <div class="qty-control-box">
          <span class="qty-label">SỐ LƯỢNG:</span>
          <div class="qty-stepper">
            <button class="step-btn" @click="decreaseQty" :disabled="quantity <= 1">-</button>
            <span class="qty-val">{{ quantity }} <small>{{ currentProduct.unitLabel }}</small></span>
            <button class="step-btn" @click="increaseQty">+</button>
          </div>
        </div>

        <div class="subtotal-box">
          <span class="subtotal-label">TỔNG TẠM TÍNH</span>
          <div class="subtotal-val">{{ formatCurrency(totalPrice) }}</div>
        </div>
      </div>

      <!-- Right: Primary CTA Buttons -->
      <div class="dock-actions">
        <button class="btn-dock-table" @click="openPriceTable">
          <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span>BẢNG GIÁ ĐẦY ĐỦ</span>
        </button>

        <button class="btn-dock-order" @click="openOrderModal">
          <span class="order-pulse"></span>
          <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.24-1.02A1 1 0 005.06 1H3z" />
            <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span class="btn-text">CHỐT ĐƠN CÁ HỒI</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-dock {
  position: relative;
  z-index: 40;
  width: 100%;
  height: 76px;
  background: rgba(3, 11, 23, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(56, 189, 248, 0.2);
  box-shadow: 0 -10px 30px rgba(1, 4, 10, 0.7);
}

.dock-container {
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* Product Preview */
.dock-product-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 320px;
}

.product-thumb {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(7, 24, 48, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.3);
  flex-shrink: 0;
}

.product-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
}

.meta-sku {
  color: var(--text-muted);
  font-family: monospace;
}

.meta-origin {
  color: #bae6fd;
  font-weight: 600;
}

.meta-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

.meta-price {
  display: flex;
  align-items: center;
  gap: 6px;
}

.price-num {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: #fde047;
}

.meta-spec {
  font-size: 0.68rem;
  color: var(--text-secondary);
}

/* Calc Zone */
.dock-calc-zone {
  display: flex;
  align-items: center;
  gap: 24px;
}

.qty-control-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(7, 24, 48, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  padding: 6px 14px;
}

.qty-label {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.qty-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-btn {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: rgba(14, 40, 77, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.step-btn:hover:not(:disabled) {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
}

.step-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-val {
  font-size: 0.88rem;
  font-weight: 800;
  color: #ffffff;
  min-width: 80px;
  text-align: center;
}

.qty-val small {
  font-size: 0.68rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.subtotal-box {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.subtotal-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.subtotal-val {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 900;
  color: #fde047;
  letter-spacing: -0.02em;
}

/* Actions */
.dock-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-dock-table {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(14, 40, 77, 0.65);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 10px;
  color: #bae6fd;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-dock-table:hover {
  background: rgba(20, 60, 110, 0.9);
  border-color: var(--accent-ice);
  color: #ffffff;
}

.btn-dock-order {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 28px;
  background: linear-gradient(135deg, #ff6b4a 0%, #e04828 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 107, 74, 0.45);
  transition: var(--transition-fast);
}

.btn-dock-order:hover {
  background: linear-gradient(135deg, #ff7d5f 0%, #ff5230 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 107, 74, 0.6);
}

.order-pulse {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 107, 74, 0.6);
  animation: pulseGlow 2.5s infinite;
  pointer-events: none;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 1100px) {
  .dock-product-summary {
    display: none;
  }
}

@media (max-width: 768px) {
  .bottom-dock {
    height: auto;
    padding: 10px 0;
  }
  .dock-container {
    flex-direction: column;
    gap: 8px;
    padding: 0 14px;
  }
  .dock-calc-zone {
    width: 100%;
    justify-content: space-between;
  }
  .dock-actions {
    width: 100%;
  }
  .btn-dock-table, .btn-dock-order {
    flex: 1;
    justify-content: center;
    padding: 10px 14px;
    font-size: 0.78rem;
  }
}
</style>
