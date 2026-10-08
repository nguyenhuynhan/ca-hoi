<script setup lang="ts">
const {
  catalog,
  currentProductIndex,
  currentProduct,
  formatCurrency,
  nextProduct,
  prevProduct,
  setProductIndex
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
const fishTransformStyle = computed(() => {
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
</script>

<template>
  <div
    ref="stageRef"
    class="salmon-center-stage"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Dynamic Ambient Halo behind salmon -->
    <div
      class="salmon-halo animate-glow"
      :style="{
        background: `radial-gradient(circle, ${currentProduct.accentColor}44 0%, rgba(2, 12, 28, 0) 70%)`
      }"
    ></div>

    <!-- UPPER SHOWCASE ZONE: Fish Image + Specs -->
    <div class="showcase-content">
      <!-- Top Badges & Breadcrumb -->
      <div class="salmon-top-specs">
        <div class="spec-capsule">
          <span class="flag-icon">{{ currentProduct.flag }}</span>
          <span class="spec-label">{{ currentProduct.origin }}</span>
          <span class="spec-divider">•</span>
          <span class="spec-species">{{ currentProduct.species }}</span>
        </div>

        <div class="spec-capsule spec-capsule-ice">
          <span class="ice-icon">❄️</span>
          <span class="spec-state">{{ currentProduct.state }}</span>
        </div>

        <div class="spec-capsule spec-capsule-badge">
          <span>{{ currentProduct.badge }}</span>
        </div>
      </div>

      <!-- Salmon Image 3D Display Container -->
      <div class="fish-card" :style="fishTransformStyle">
        <!-- Navigation Arrows for quick flipping -->
        <button class="nav-arrow nav-prev" @click.stop="prevProduct" title="Xem sản phẩm trước">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button class="nav-arrow nav-next" @click.stop="nextProduct" title="Xem sản phẩm kế tiếp">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
        </button>

        <div class="fish-image-stage animate-float">
          <!-- Stack all 8 images in DOM for instant zero-latency swap -->
          <img
            v-for="(item, idx) in catalog"
            :key="item.id"
            :src="item.image"
            :alt="item.name"
            class="fish-img"
            :class="{ 'is-active': idx === currentProductIndex }"
            loading="eager"
            decoding="async"
          />

          <!-- Floor Shadow Reflection -->
          <div
            class="fish-floor-shadow"
            :style="{
              boxShadow: `0 35px 70px -15px ${currentProduct.accentColor}55`
            }"
          ></div>
        </div>
      </div>

      <!-- Mobile / Quick Selector Dots -->
      <div class="quick-dots">
        <button
          v-for="(item, idx) in catalog"
          :key="item.id"
          class="dot-btn"
          :class="{ 'is-active': idx === currentProductIndex }"
          :title="item.shortName"
          @click="setProductIndex(idx)"
        ></button>
      </div>

      <!-- Salmon Details & Specs Box -->
      <div class="salmon-info-box">
        <div class="info-sku-row">
          <span class="sku-tag">SKU: {{ currentProduct.sku }}</span>
          <span class="grade-tag">🏆 {{ currentProduct.grade }}</span>
          <span class="packaging-pill">📦 {{ currentProduct.packaging }}</span>
        </div>

        <h1 class="salmon-title">{{ currentProduct.name }}</h1>
        <p class="salmon-tagline">“{{ currentProduct.tagline }}”</p>
        <p class="salmon-desc">{{ currentProduct.description }}</p>

        <!-- Quick Spec Highlights -->
        <div class="spec-metrics-row">
          <div class="metric-card">
            <span class="m-label">QUY CÁCH / CỠ</span>
            <span class="m-val">{{ currentProduct.sizeSpec }}</span>
          </div>
          <div class="metric-card">
            <span class="m-label">ĐƠN VỊ TÍNH</span>
            <span class="m-val">{{ currentProduct.unit }}</span>
          </div>
          <div class="metric-card highlight-card">
            <span class="m-label">GIÁ CHÀO XUẤT XƯỞNG</span>
            <span class="m-val text-yellow">{{ currentProduct.priceDisplay }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.salmon-center-stage {
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  overflow: hidden;
  box-sizing: border-box;
}

.salmon-halo {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 580px;
  height: 480px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(50px);
  z-index: 1;
  transition: background 0.6s ease;
}

.showcase-content {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 960px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.salmon-top-specs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4px;
}

.spec-capsule {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(4, 16, 33, 0.65);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #bae6fd;
}

.spec-capsule-ice {
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(14, 116, 144, 0.2);
}

.spec-capsule-badge {
  background: rgba(255, 107, 74, 0.2);
  border-color: rgba(255, 107, 74, 0.4);
  color: #ff9e88;
}

.spec-divider {
  color: rgba(255, 255, 255, 0.3);
}

/* Fish 3D card */
.fish-card {
  position: relative;
  width: 100%;
  max-width: 620px;
  height: 310px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.fish-image-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fish-img {
  position: absolute;
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(1, 4, 10, 0.6), 0 0 20px rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}

.fish-img.is-active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.fish-floor-shadow {
  position: absolute;
  bottom: 0;
  width: 65%;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  transition: box-shadow 0.5s ease;
}

/* Quick Nav Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(4, 16, 33, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #bae6fd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition-fast);
}

.nav-arrow svg {
  width: 20px;
  height: 20px;
}

.nav-arrow:hover {
  background: rgba(14, 40, 77, 0.9);
  border-color: var(--accent-ice);
  color: #ffffff;
  transform: translateY(-50%) scale(1.1);
}

.nav-prev { left: -10px; }
.nav-next { right: -10px; }

/* Quick dots */
.quick-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0;
}

.dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.dot-btn.is-active {
  width: 22px;
  border-radius: 9999px;
  background: var(--accent-salmon);
  box-shadow: 0 0 8px var(--accent-salmon);
}

/* Info Box */
.salmon-info-box {
  width: 100%;
  background: rgba(5, 17, 35, 0.65);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(56, 189, 248, 0.14);
  border-radius: 14px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
}

.info-sku-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.sku-tag {
  font-size: 0.68rem;
  font-family: monospace;
  font-weight: 700;
  padding: 2px 8px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--text-ice);
}

.grade-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #fde047;
}

.packaging-pill {
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.salmon-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #ffffff;
  line-height: 1.2;
}

.salmon-tagline {
  font-size: 0.8rem;
  font-style: italic;
  color: #ff9e88;
  font-weight: 500;
}

.salmon-desc {
  font-size: 0.72rem;
  color: var(--text-secondary);
  line-height: 1.35;
  max-width: 820px;
  margin: 0 auto;
}

/* Metric Cards */
.spec-metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 4px;
}

.metric-card {
  background: rgba(3, 11, 23, 0.55);
  border: 1px solid rgba(56, 189, 248, 0.1);
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.highlight-card {
  background: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.35);
}

.m-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.m-val {
  font-size: 0.82rem;
  font-weight: 800;
  color: #f8fafc;
}

.text-yellow {
  color: #fde047;
  font-size: 0.92rem;
  font-family: var(--font-display);
}

@media (max-height: 800px) {
  .fish-card {
    height: 250px;
  }
  .salmon-desc {
    display: none;
  }
}

@media (max-width: 640px) {
  .salmon-center-stage {
    padding: 6px 12px;
  }
  .fish-card {
    height: 220px;
  }
  .salmon-title {
    font-size: 1.05rem;
  }
  .salmon-tagline {
    font-size: 0.72rem;
  }
  .spec-metrics-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
