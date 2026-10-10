<script setup lang="ts">
const { currentProduct, isPriceTableOpen } = useSalmonStore()
const showHotlineAlert = ref(false)

const copyHotline = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText('1900888999')
  }
  showHotlineAlert.value = true
  setTimeout(() => {
    showHotlineAlert.value = false
  }, 2200)
}

const togglePriceTable = () => {
  isPriceTableOpen.value = !isPriceTableOpen.value
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Brand Logo -->
      <div class="brand">
        <div class="brand-logo">
          <!-- Stylized Salmon Fish Icon -->
          <svg class="salmon-logo-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 14C21 8 13 6 4 10C2 11 1 13 2 14C1 15 2 17 4 18C13 22 21 20 25 14Z" fill="url(#salmon-grad)" />
            <path d="M4 14C1 10 0 7 1 6C3 8 5 11 6 14C5 17 3 20 1 22C0 21 1 18 4 14Z" fill="#ff6b4a" opacity="0.8" />
            <circle cx="21" cy="12" r="1.5" fill="#ffffff" />
            <circle cx="21.3" cy="11.8" r="0.7" fill="#041021" />
            <defs>
              <linearGradient id="salmon-grad" x1="2" y1="14" x2="25" y2="14" gradientUnits="userSpaceOnUse">
                <stop stop-color="#38bdf8" />
                <stop offset="0.4" stop-color="#fb7185" />
                <stop offset="1" stop-color="#ff6b4a" />
              </linearGradient>
            </defs>
          </svg>
          <span class="brand-name">
            CHUYỆN CÁ HỒI<span class="brand-dot" :style="{ color: currentProduct.accentColor }">.</span>
          </span>
        </div>
        <span class="brand-subtitle hide-mobile">TỔNG KHO NAUY & CHILE</span>
      </div>

      <!-- Center Status Pill -->
      <div class="status-pill glass-pill hide-tablet">
        <span class="status-text">
          Đang xem: <strong :style="{ color: currentProduct.accentColor }">{{ currentProduct.shortName }}</strong>
        </span>
      </div>

      <!-- Action Group -->
      <div class="header-actions">
        <!-- Bảng Giá Button -->
        <button 
          class="action-btn glass-pill price-table-btn" 
          @click="togglePriceTable"
          title="Xem bảng chào giá chi tiết 8 sản phẩm"
        >
          <span class="btn-icon">📋</span>
          <span>Bảng Chào Giá</span>
          <span class="hot-badge hide-mobile">Đủ 8 mã</span>
        </button>

        <!-- Hotline Badge -->
        <button class="action-btn glass-pill hotline-btn" @click="copyHotline" title="Bấm để sao chép hotline">
          <span class="btn-icon">📞</span>
          <span class="hide-mobile">1900 888 999</span>
        </button>

        <!-- Zalo Quick Link -->
        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noopener" 
          class="action-btn glass-pill zalo-btn hide-mobile" 
          title="Tư vấn Zalo Kho 24/7"
        >
          <span class="zalo-badge">Z</span>
          <span>Zalo Kho</span>
        </a>
      </div>
    </div>

    <!-- Copied toast -->
    <Transition name="toast-fade">
      <div v-if="showHotlineAlert" class="toast-copied glass-panel">
        ✓ Đã sao chép hotline: 1900 888 999 (Hỗ trợ 24/7)
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  width: 100%;
  padding: 8px 16px 4px;
  z-index: 40;
  flex-shrink: 0;
  box-sizing: border-box;
}

.header-inner {
  max-width: 1560px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.salmon-logo-icon {
  width: 26px;
  height: 26px;
  filter: drop-shadow(0 2px 8px rgba(255, 107, 74, 0.4));
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: nowrap;
}

.brand-dot {
  font-weight: 900;
  transition: color var(--transition-fast);
}

.brand-subtitle {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  padding-left: 8px;
  white-space: nowrap;
}

.glass-pill {
  background: var(--bg-surface);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.status-flag {
  font-size: 1rem;
}

.sku-tag {
  margin-left: 6px;
  font-size: 0.68rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.action-btn:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: var(--border-active);
  transform: translateY(-1px);
}

.price-table-btn {
  background: rgba(255, 107, 74, 0.12);
  border-color: rgba(255, 107, 74, 0.35);
  color: #ffedd5;
}

.price-table-btn:hover {
  background: rgba(255, 107, 74, 0.25);
  border-color: rgba(255, 107, 74, 0.6);
  box-shadow: 0 0 16px rgba(255, 107, 74, 0.3);
}

.hot-badge {
  font-size: 0.62rem;
  font-weight: 800;
  background: var(--accent-salmon);
  color: #ffffff;
  padding: 1px 6px;
  border-radius: 9999px;
  margin-left: 2px;
}

.zalo-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #0068ff;
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
}

.toast-copied {
  position: absolute;
  top: calc(100% + 4px);
  right: 18px;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.35);
  z-index: 100;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .hide-tablet {
    display: none !important;
  }
}

@media (max-width: 640px) {
  .site-header {
    padding: 6px 10px 2px;
  }
  .brand-name {
    font-size: 1.05rem;
  }
  .hide-mobile {
    display: none !important;
  }
  .action-btn {
    padding: 5px 9px;
    font-size: 0.74rem;
  }
}
</style>
