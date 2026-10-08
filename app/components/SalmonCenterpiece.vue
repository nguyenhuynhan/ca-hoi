<script setup lang="ts">
const { 
  catalog,
  recipes,
  currentProduct, 
  currentProductIndex,
  quantity,
  isFreeship,
  setQuantity,
  incQuantity,
  decQuantity,
  nextProduct,
  prevProduct,
  subtotal,
  formatCurrency,
  openRecipe 
} = useSalmonStore()

const stageRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

// Mobile Drawer states
const isMobileLeftDrawerOpen = ref(false)
const isMobileRightDrawerOpen = ref(false)

const openMobileLeft = () => {
  isMobileLeftDrawerOpen.value = true
  isMobileRightDrawerOpen.value = false
}

const closeMobileLeft = () => {
  isMobileLeftDrawerOpen.value = false
}

const openMobileRight = () => {
  isMobileRightDrawerOpen.value = true
  isMobileLeftDrawerOpen.value = false
}

const closeMobileRight = () => {
  isMobileRightDrawerOpen.value = false
}

const closeAllDrawers = () => {
  isMobileLeftDrawerOpen.value = false
  isMobileRightDrawerOpen.value = false
}

// Open top recipe for current salmon
const openCurrentFishRecipe = () => {
  const match = recipes.find(r => r.recommendedProductId === currentProduct.value.id) || recipes[0]
  openRecipe(match.id)
}

// 3D Perspective Tilt on Mouse Movement (Desktop only)
const handleMouseMove = (e: MouseEvent) => {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  mouseX.value = x / (rect.width / 2)
  mouseY.value = y / (rect.height / 2)
  isHovering.value = true
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
  isHovering.value = false
}

// Touch swipe navigation for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    touchStartX.value = e.touches[0].clientX
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (e.changedTouches.length > 0) {
    touchEndX.value = e.changedTouches[0].clientX
    const diff = touchEndX.value - touchStartX.value
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextProduct()
      } else {
        prevProduct()
      }
    }
  }
}

// Calculated 3D Transform
const salmonTransformStyle = computed(() => {
  if (!isHovering.value) {
    return {
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }
  const rotateY = mouseX.value * 7
  const rotateX = -mouseY.value * 7
  return {
    transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }
})

// Quantity presets based on unit
const quantityPresets = computed(() => {
  if (currentProduct.value.unit === 'CON') {
    return [1, 2, 3, 5]
  }
  return [1, 2, 3, 5, 10]
})
</script>

<template>
  <div 
    ref="stageRef"
    class="salmon-center-stage"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Background Ambient Halo -->
    <div 
      class="salmon-halo"
      :style="{
        background: `radial-gradient(circle, ${currentProduct.accentColor}33 0%, rgba(4, 16, 33, 0) 70%)`
      }"
    ></div>

    <!-- KHU VỰC TRÊN (SHOWCASE ZONE): ẢNH CÁ HỒI Ở GIỮA + 2 MENU BÁM MÉP -->
    <div class="showcase-upper-zone">
      <!-- Menu trái (Desktop): 8 sản phẩm cá hồi bám mép trái -->
      <div class="rail-overlay left-rail-overlay hide-mobile-rail">
        <LeftControlRail />
      </div>

      <!-- Nút nổi Mobile: Mở danh mục 8 loại cá (bên trái) -->
      <button 
        class="mobile-edge-btn mobile-left-trigger hide-desktop"
        @click="openMobileLeft"
        aria-label="Xem 8 dòng cá hồi"
      >
        <span class="edge-icon">🐟</span>
        <span class="edge-text">8 Loại Cá</span>
      </button>

      <!-- Cá Hồi trung tâm: 3D Tilt & Touch Swipe -->
      <div 
        class="salmon-card"
        :style="salmonTransformStyle"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <!-- Nav arrow Prev -->
        <button class="nav-arrow nav-arrow-left" @click="prevProduct" title="Xem sản phẩm trước">
          ‹
        </button>

        <div class="salmon-image-container animate-float">
          <!-- Stack toàn bộ ảnh cá hồi trong DOM -->
          <img 
            v-for="item in catalog"
            :key="item.id"
            :src="item.image" 
            :alt="item.name"
            class="salmon-img"
            :class="{ 'is-active': item.id === currentProduct.id }"
            loading="eager"
            decoding="async"
          />

          <!-- Floor Shadow Reflection -->
          <div 
            class="salmon-floor-shadow"
            :style="{
              boxShadow: `0 24px 60px -10px ${currentProduct.accentColor}55`
            }"
          ></div>
        </div>

        <!-- Nav arrow Next -->
        <button class="nav-arrow nav-arrow-right" @click="nextProduct" title="Xem sản phẩm kế tiếp">
          ›
        </button>

        <!-- Product Floating Badges -->
        <div class="floating-badges">
          <span class="badge-item badge-grade">
            ⭐ {{ currentProduct.grade }}
          </span>
          <span class="badge-item badge-state">
            🧊 {{ currentProduct.state }}
          </span>
        </div>
      </div>

      <!-- Nút nổi Mobile: Mở danh sách món ngon (bên phải) -->
      <button 
        class="mobile-edge-btn mobile-right-trigger hide-desktop"
        @click="openMobileRight"
        aria-label="Xem 8 món ngon nấu với cá hồi"
      >
        <span class="edge-icon">🍳</span>
        <span class="edge-text">8 Món Ngon</span>
        <span class="edge-pulse-dot"></span>
      </button>

      <!-- Menu phải (Desktop): Gợi ý món ngon bám mép phải -->
      <div class="rail-overlay right-rail-overlay hide-mobile-rail">
        <RightControlRail />
      </div>
    </div>

    <!-- KHU VỰC DƯỚI (DETAILS ZONE): MÔ TẢ & CHỌN SỐ LƯỢNG -->
    <div class="details-lower-zone">
      <!-- Thông tin sản phẩm & Cảm quan -->
      <div class="salmon-info-panel glass-panel">
        <div class="info-header-row">
          <div class="info-title-group">
            <div class="title-with-flag">
              <span class="country-flag">{{ currentProduct.flag }}</span>
              <h1 class="product-title">{{ currentProduct.name }}</h1>
            </div>
            <div class="spec-meta-row hide-mobile">
              <span class="spec-pill">Quy cách: {{ currentProduct.sizeSpec }}</span>
              <span class="spec-pill">Đóng gói: {{ currentProduct.packaging }}</span>
              <span class="spec-pill">SKU: {{ currentProduct.sku }}</span>
            </div>
          </div>

          <div class="price-badge-group">
            <span class="price-num" :style="{ color: currentProduct.accentColor }">
              {{ currentProduct.priceDisplay }}
            </span>
            <span class="unit-helper hide-mobile" v-if="currentProduct.portionWeight">
              ({{ currentProduct.portionWeight }} / khay)
            </span>
          </div>
        </div>

        <!-- Tagline & Nút xem món ngon gợi ý -->
        <div class="sensory-row">
          <div class="tagline-text">
            <span class="sparkle-icon">✨</span>
            <span>{{ currentProduct.tagline }}</span>
          </div>

          <!-- Nút kích hoạt xem công thức món ngon trực tiếp -->
          <button 
            class="recipe-trigger-pill"
            @click="openCurrentFishRecipe"
            title="Bấm để xem công thức và hình ảnh món ăn ngon nhất với loại cá này"
          >
            <span class="pill-fire">🍳</span>
            <span class="pill-label">Nấu món gì ngon?</span>
            <span class="pill-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- Menu chọn số lượng -->
      <div class="quantity-panel glass-panel">
        <div class="qty-header">
          <div class="qty-title-group">
            <span class="qty-title">SỐ LƯỢNG:</span>
            <span class="qty-unit-label">({{ currentProduct.unitLabel }})</span>
            <span v-if="isFreeship" class="freeship-pill">🚀 Freeship 2H</span>
          </div>

          <div class="qty-stepper-wrap">
            <button class="step-btn" @click="decQuantity" :disabled="quantity <= 1">-</button>
            <span class="qty-val">{{ quantity }}</span>
            <button class="step-btn" @click="incQuantity">+</button>
          </div>
        </div>

        <!-- Preset buttons -->
        <div class="qty-presets-row">
          <button 
            v-for="q in quantityPresets" 
            :key="q"
            class="preset-btn"
            :class="{ active: quantity === q }"
            @click="setQuantity(q)"
          >
            {{ q }} {{ currentProduct.unit }}
            <span v-if="q >= 3" class="preset-tag">Freeship</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE DRAWERS & BACKDROP -->
    <!-- Drawer Backdrop -->
    <Transition name="drawer-fade">
      <div 
        v-if="isMobileLeftDrawerOpen || isMobileRightDrawerOpen" 
        class="mobile-drawer-backdrop hide-desktop"
        @click="closeAllDrawers"
      ></div>
    </Transition>

    <!-- Mobile Drawer Left: 8 Loại Cá Hồi -->
    <Transition name="drawer-slide-left">
      <aside 
        v-if="isMobileLeftDrawerOpen" 
        class="mobile-drawer-panel mobile-drawer-left hide-desktop glass-panel"
      >
        <div class="drawer-header">
          <span class="drawer-title">🐟 8 DÒNG CÁ HỒI</span>
          <button class="drawer-close-btn" @click="closeMobileLeft">✕</button>
        </div>
        <div class="drawer-body">
          <LeftControlRail @select="closeMobileLeft" />
        </div>
      </aside>
    </Transition>

    <!-- Mobile Drawer Right: 8 Món Ngon Gợi Ý -->
    <Transition name="drawer-slide-right">
      <aside 
        v-if="isMobileRightDrawerOpen" 
        class="mobile-drawer-panel mobile-drawer-right hide-desktop glass-panel"
      >
        <div class="drawer-header">
          <span class="drawer-title">🍳 GỢI Ý MÓN NGON</span>
          <button class="drawer-close-btn" @click="closeMobileRight">✕</button>
        </div>
        <div class="drawer-body">
          <RightControlRail />
        </div>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.salmon-center-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 4px;
}

.salmon-halo {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 700px;
  height: 480px;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 1;
  transition: background 0.5s ease;
}

/* SHOWCASE UPPER ZONE */
.showcase-upper-zone {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.rail-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 20;
  width: 205px;
  pointer-events: auto;
}

.left-rail-overlay {
  left: 0;
}

.right-rail-overlay {
  right: 0;
}

/* SALMON CARD */
.salmon-card {
  position: relative;
  width: 100%;
  max-width: 760px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  transition: transform 0.1s ease-out;
}

.salmon-image-container {
  position: relative;
  width: 90%;
  height: 88%;
  max-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.salmon-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000000 68%, rgba(0, 0, 0, 0.7) 82%, transparent 98%);
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.85));
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.salmon-img.is-active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  z-index: 2;
}

.salmon-floor-shadow {
  position: absolute;
  bottom: 5%;
  width: 75%;
  height: 24px;
  border-radius: 50%;
  filter: blur(16px);
  pointer-events: none;
  z-index: 1;
  transition: box-shadow 0.4s ease;
}

/* Nav arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(4, 16, 33, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #ffffff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 25;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.nav-arrow:hover {
  background: rgba(14, 42, 77, 0.9);
  border-color: var(--accent-ice);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow-left {
  left: 215px;
}

.nav-arrow-right {
  right: 215px;
}

.floating-badges {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 22;
  white-space: nowrap;
}

.badge-item {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.badge-grade {
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.35);
  color: #fde047;
}

.badge-state {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #7dd3fc;
}

/* DETAILS LOWER ZONE */
.details-lower-zone {
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 20;
  padding: 0 4px 4px;
}

.salmon-info-panel {
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.info-title-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.title-with-flag {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-flag {
  font-size: 1.1rem;
}

.product-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.spec-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spec-pill {
  font-size: 0.65rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 1px 7px;
  border-radius: 4px;
}

.price-badge-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-num {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.unit-helper {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.sensory-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.tagline-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  color: #cbd5e1;
}

.recipe-trigger-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.2) 0%, rgba(220, 38, 38, 0.15) 100%);
  border: 1px solid rgba(255, 107, 74, 0.4);
  border-radius: 9999px;
  color: #fed7aa;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.recipe-trigger-pill:hover {
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.4) 0%, rgba(220, 38, 38, 0.3) 100%);
  color: #ffffff;
  border-color: var(--accent-salmon);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(255, 107, 74, 0.3);
}

.pill-arrow {
  color: var(--accent-salmon);
  font-weight: 800;
  transition: transform 0.2s;
}

.recipe-trigger-pill:hover .pill-arrow {
  transform: translateX(3px);
}

/* QUANTITY PANEL */
.quantity-panel {
  padding: 6px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.qty-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-title-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty-title {
  font-size: 0.74rem;
  font-weight: 800;
  color: var(--text-secondary);
}

.qty-unit-label {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.freeship-pill {
  font-size: 0.62rem;
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.16);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 1px 6px;
  border-radius: 9999px;
}

.qty-stepper-wrap {
  display: flex;
  align-items: center;
  background: rgba(4, 16, 33, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  overflow: hidden;
}

.step-btn {
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.step-btn:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.2);
}

.step-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-val {
  min-width: 24px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
}

.qty-presets-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.preset-btn {
  position: relative;
  padding: 3px 10px;
  background: rgba(4, 16, 33, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.18s;
}

.preset-btn:hover {
  background: rgba(14, 42, 77, 0.6);
  color: #ffffff;
  border-color: rgba(56, 189, 248, 0.4);
}

.preset-btn.active {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
  color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 107, 74, 0.4);
}

.preset-tag {
  font-size: 0.55rem;
  font-weight: 800;
  background: #38bdf8;
  color: #041021;
  padding: 0 4px;
  border-radius: 3px;
}

/* MOBILE FLOATING EDGE BUTTONS */
.mobile-edge-btn {
  position: absolute;
  top: 14px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(4, 16, 33, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.mobile-left-trigger {
  left: 8px;
  border: 1px solid rgba(56, 189, 248, 0.35);
}

.mobile-right-trigger {
  right: 8px;
  border: 1px solid rgba(255, 107, 74, 0.45);
  background: linear-gradient(135deg, rgba(25, 15, 20, 0.9) 0%, rgba(4, 16, 33, 0.88) 100%);
}

.edge-icon {
  font-size: 0.85rem;
}

.edge-text {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.edge-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-salmon);
  box-shadow: 0 0 8px var(--accent-salmon);
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}

/* MOBILE DRAWERS */
.mobile-drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 7, 18, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 500;
}

.mobile-drawer-panel {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 285px;
  max-width: 84vw;
  background: rgba(5, 18, 38, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 510;
  display: flex;
  flex-direction: column;
  padding: 12px 6px;
  box-sizing: border-box;
}

.mobile-drawer-left {
  left: 0;
  border-right: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.7);
}

.mobile-drawer-right {
  right: 0;
  border-left: 1px solid rgba(255, 107, 74, 0.25);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
}

.drawer-title {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.05em;
}

.drawer-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.drawer-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* DRAWER TRANSITIONS */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-left-enter-active,
.drawer-slide-left-leave-active,
.drawer-slide-right-enter-active,
.drawer-slide-right-leave-active {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-slide-left-enter-from,
.drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

.drawer-slide-right-enter-from,
.drawer-slide-right-leave-to {
  transform: translateX(100%);
}

/* RESPONSIVENESS */
@media (min-width: 861px) {
  .hide-desktop {
    display: none !important;
  }
}

@media (max-width: 1100px) {
  .rail-overlay {
    width: 175px;
  }
  .nav-arrow-left {
    left: 180px;
  }
  .nav-arrow-right {
    right: 180px;
  }
}

@media (max-width: 860px) {
  .hide-mobile-rail {
    display: none !important;
  }

  .nav-arrow-left {
    left: 12px;
  }

  .nav-arrow-right {
    right: 12px;
  }

  .product-title {
    font-size: 0.88rem;
  }

  .price-num {
    font-size: 1.05rem;
  }

  .quantity-panel {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 6px 10px;
  }

  .qty-header {
    width: 100%;
    justify-content: space-between;
  }

  .qty-presets-row {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .salmon-card {
    max-width: 100%;
  }

  .salmon-image-container {
    width: 95%;
    max-height: 340px;
  }

  .sensory-row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .tagline-text {
    font-size: 0.68rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 58%;
  }

  .recipe-trigger-pill {
    padding: 3px 8px;
    font-size: 0.66rem;
  }
}

@media (max-width: 480px) {
  .product-title {
    font-size: 0.82rem;
  }

  .country-flag {
    font-size: 0.95rem;
  }

  .price-num {
    font-size: 0.98rem;
  }

  .floating-badges {
    bottom: 4px;
    gap: 4px;
  }

  .badge-item {
    font-size: 0.6rem;
    padding: 2px 7px;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
}
</style>
