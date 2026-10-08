<script setup lang="ts">
const { 
  catalog,
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
  formatCurrency 
} = useSalmonStore()

const stageRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

// 3D Perspective Tilt on Mouse Movement
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

    <!-- KHU VỰC TRÊN (SHOWCASE ZONE): ẢNH CÁ HỒI Ở GIỮA + 2 MENU BÁM MÉP LẤN VÀO HÌNH -->
    <div class="showcase-upper-zone">
      <!-- Menu trái: 8 sản phẩm cá hồi bám mép trái -->
      <div class="rail-overlay left-rail-overlay">
        <LeftControlRail />
      </div>

      <!-- Cá Hồi trung tâm: 3D Tilt, chuyển đổi tức thì với bộ ảnh tải sẵn -->
      <div 
        class="salmon-card"
        :style="salmonTransformStyle"
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
          <span class="badge-item badge-state hide-mobile">
            🧊 {{ currentProduct.state }}
          </span>
        </div>
      </div>

      <!-- Menu phải: Quy cách sơ chế bám mép phải -->
      <div class="rail-overlay right-rail-overlay">
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

        <!-- Tagline & Culinary Uses -->
        <div class="sensory-row">
          <div class="tagline-text">
            <span class="sparkle-icon">✨</span>
            <span>{{ currentProduct.tagline }}</span>
          </div>
          <div class="culinary-pills hide-mobile">
            <span v-for="(use, idx) in currentProduct.culinaryUses" :key="idx" class="use-pill">
              {{ use }}
            </span>
          </div>
        </div>
      </div>

      <!-- Menu chọn số lượng -->
      <div class="quantity-panel glass-panel">
        <div class="qty-header">
          <div class="qty-title-group">
            <span class="qty-title">CHỌN SỐ LƯỢNG:</span>
            <span class="qty-unit-label">({{ currentProduct.unitLabel }})</span>
            <span v-if="isFreeship" class="freeship-pill">🚀 Miễn phí ship 2H</span>
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
  width: 195px;
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
  height: 86%;
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
  border: 1px solid rgba(56, 189, 248, 0.2);
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
  left: 200px;
}

.nav-arrow-right {
  right: 200px;
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

.culinary-pills {
  display: flex;
  align-items: center;
  gap: 4px;
}

.use-pill {
  font-size: 0.62rem;
  font-weight: 600;
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
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

@media (max-width: 1024px) {
  .rail-overlay {
    width: 160px;
  }
  .nav-arrow-left {
    left: 165px;
  }
  .nav-arrow-right {
    right: 165px;
  }
}

@media (max-width: 768px) {
  .rail-overlay {
    width: 120px;
  }
  .nav-arrow {
    display: none;
  }
  .product-title {
    font-size: 0.85rem;
  }
  .price-num {
    font-size: 1rem;
  }
  .quantity-panel {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>
