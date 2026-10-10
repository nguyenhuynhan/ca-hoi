<script setup lang="ts">
const { 
  catalog,
  recipes,
  currentProductRecipes,
  currentProduct, 
  currentProductIndex,
  setProductIndex,
  isWholeFish,
  quantity,
  isFreeship,
  setQuantity,
  incQuantity,
  decQuantity,
  nextProduct,
  prevProduct,
  subtotal,
  formatCurrency,
  openRecipe,
  isPriceTableOpen 
} = useSalmonStore()

const openPriceTable = () => {
  isPriceTableOpen.value = true
}


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
  const recipeId = currentProduct.value.bestRecipeId || currentProductRecipes.value[0]?.id || recipes[0].id
  openRecipe(recipeId)
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
  if (isWholeFish.value) {
    return [1, 2, 3]
  }
  return [1, 2, 3, 5]
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
      <!-- Menu trái (Hiện cả Desktop & Mobile giống chuyen-tao): 8 sản phẩm cá hồi bám mép trái -->
      <div class="rail-overlay left-rail-overlay">
        <LeftControlRail />
      </div>

      <!-- Cá Hồi trung tâm: 3D Tilt & Touch Swipe -->
      <div 
        class="salmon-card"
        :style="salmonTransformStyle"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
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
      </div>

      <!-- Menu phải: Gợi ý món ngon bám mép phải (Hiện cả Desktop & Mobile đối xứng) -->
      <div class="rail-overlay right-rail-overlay">
        <RightControlRail />
      </div>
    </div>

    <!-- KHU VỰC DƯỚI (DETAILS ZONE): MÔ TẢ TỪNG LOẠI CÁ & TIỆN ÍCH ĐẶT HÀNG -->
    <div class="details-lower-zone">
      <!-- Thông tin sản phẩm & Cảm quan mô tả chi tiết -->
      <div class="salmon-info-panel glass-panel">
        <div class="info-header-row">
          <div class="info-title-group">
            <h1 class="product-title">{{ currentProduct.name }}</h1>
            <div class="spec-meta-row">
              <span class="spec-pill">Quy cách: {{ currentProduct.sizeSpec }}</span>
              <span class="spec-pill hide-small">Đóng gói: {{ currentProduct.packaging }}</span>
              <span class="spec-pill">Bảo quản: {{ currentProduct.state }}</span>
            </div>
          </div>

          <div class="price-badge-group">
            <span class="price-num" :style="{ color: currentProduct.accentColor }">
              {{ currentProduct.priceDisplay }}
            </span>
            <span v-if="isWholeFish" class="whole-price-note">
              ⚖️ Báo giá theo cân thực tế
            </span>
            <span class="unit-helper hide-mobile" v-else-if="currentProduct.portionWeight">
              ({{ currentProduct.portionWeight }} / khay)
            </span>
          </div>
        </div>

        <!-- Tagline nổi bật & Đoạn mô tả chi tiết từng loại cá -->
        <div class="product-story-section">
          <div class="sensory-tagline">
            <span class="sparkle-icon">✨</span>
            <span class="tagline-text">{{ currentProduct.tagline }}</span>
          </div>
          <p class="product-full-desc">
            {{ currentProduct.description }}
          </p>
        </div>

        <!-- Các thông tin cam kết & hỗ trợ chuyển tải từ thanh toán lên giúp thông thoáng -->
        <div class="dock-perks-row">
          <div class="dock-perk-badge">
            <span class="perk-icon">🚀</span>
            <span class="perk-text">Giao 2H nội thành</span>
          </div>
          <div class="dock-perk-badge">
            <span class="perk-icon">🧊</span>
            <span class="perk-text">Ướp đá thùng xốp</span>
          </div>
          <div class="dock-perk-badge">
            <span class="perk-icon">🔪</span>
            <span class="perk-text">Lọc da rút xương</span>
          </div>
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
  pointer-events: auto;
}

.left-rail-overlay {
  left: 0;
  width: auto;
  pointer-events: none;
}

.left-rail-overlay :deep(.side-menu-rail button) {
  pointer-events: auto;
}

.right-rail-overlay {
  right: 0;
  width: auto;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
}

.right-rail-overlay :deep(.side-menu-rail button) {
  pointer-events: auto;
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



/* DETAILS LOWER ZONE */
.details-lower-zone {
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 20;
  padding: 0 4px 6px;
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.salmon-info-panel {
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  flex-wrap: wrap;
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

/* PRODUCT STORY & SENSORY DESCRIPTION */
.product-story-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sensory-tagline {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tagline-text {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 700;
  color: #fed7aa;
}

.product-full-desc {
  font-size: 0.72rem;
  line-height: 1.5;
  color: rgba(226, 232, 240, 0.88);
  margin: 0;
}

/* CULINARY RECOMMEND ROW */
.culinary-recommend-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 2px;
}

.culinary-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
}

.culinary-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.culinary-tag-pill {
  font-size: 0.66rem;
  font-weight: 600;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 2px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.recipe-trigger-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.25) 0%, rgba(220, 38, 38, 0.2) 100%);
  border: 1px solid rgba(255, 107, 74, 0.45);
  border-radius: 9999px;
  color: #fed7aa;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.recipe-trigger-pill:hover {
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.45) 0%, rgba(220, 38, 38, 0.35) 100%);
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

/* DOCK PERKS ROW (Chuyển tải từ thanh toán lên) */
.dock-perks-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap; /* Cho xuống dòng thay vì kéo ngang */
  gap: 6px 10px;
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
}

.dock-perk-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
}

.dock-perk-badge .perk-icon {
  font-size: 0.74rem;
}

.dock-perk-badge .perk-text {
  font-size: 0.68rem;
  font-weight: 700;
  color: #bae6fd;
}

.whole-price-note {
  font-size: 0.62rem;
  font-weight: 700;
  color: #fdba74;
  background: rgba(255, 107, 74, 0.16);
  border: 1px solid rgba(255, 107, 74, 0.35);
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.whole-weigh-badge {
  font-size: 0.62rem;
  font-weight: 700;
  color: #fdba74;
  background: rgba(255, 107, 74, 0.16);
  border: 1px solid rgba(255, 107, 74, 0.35);
  padding: 1px 6px;
  border-radius: 9999px;
}

.preset-tag-whole {
  font-size: 0.54rem;
  font-weight: 800;
  background: #f97316;
  color: #041021;
  padding: 0 4px;
  border-radius: 3px;
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
  .hide-mobile-rail,
  .hide-mobile {
    display: none !important;
  }

  .left-rail-overlay {
    width: auto !important;
    display: flex !important;
    pointer-events: none;
    left: 0 !important;
  }

  .left-rail-overlay :deep(.side-menu-rail button) {
    pointer-events: auto;
  }

  .right-rail-overlay {
    width: auto !important;
    display: flex !important;
    pointer-events: none;
    right: 0 !important;
  }

  .right-rail-overlay :deep(.side-menu-rail button) {
    pointer-events: auto;
  }

  .salmon-center-stage {
    padding: 0 4px 18px;
    justify-content: flex-start;
    gap: 8px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .showcase-upper-zone {
    flex: 0 0 auto;
    height: clamp(230px, 32vh, 270px);
    width: 100%;
    padding-top: 2px;
    align-items: flex-start;
    margin-bottom: 2px;
  }

  .details-lower-zone {
    flex: 1 0 auto;
    width: 100%;
    gap: 8px;
    padding: 0 2px 24px;
  }

  .salmon-card {
    padding: 0;
    width: 100%;
    max-width: 100vw;
    margin: 0;
    height: 100%;
    max-height: clamp(210px, 35vh, 270px);
    align-self: flex-start;
    margin-top: 4px;
  }

  .salmon-image-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .salmon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.08);
  }

  .salmon-img.is-active {
    transform: scale(1.12);
  }

  .salmon-floor-shadow {
    width: 85%;
    bottom: 2%;
  }

  .product-title {
    font-size: 0.88rem;
  }

  .price-num {
    font-size: 1.05rem;
  }

  .tagline-text {
    font-size: 0.72rem;
  }

  .product-full-desc {
    font-size: 0.66rem;
    line-height: 1.45;
  }

  .culinary-tag-pill {
    font-size: 0.6rem;
    padding: 1px 6px;
  }

  .recipe-trigger-pill {
    padding: 2px 8px;
    font-size: 0.62rem;
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
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
  }

  .dock-perks-row {
    flex-wrap: wrap;
    gap: 6px;
    padding-top: 6px;
    overflow-x: visible;
  }

  .dock-perk-badge {
    padding: 3px 8px;
  }

  .dock-perk-badge .perk-text {
    font-size: 0.62rem;
  }
}

@media (max-width: 480px) {
  .product-title {
    font-size: 0.82rem;
  }

  .price-num {
    font-size: 0.98rem;
  }

}
</style>
