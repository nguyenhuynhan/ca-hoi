<script setup lang="ts">
const { 
  selectedRecipe, 
  isRecipeModalOpen, 
  closeRecipe, 
  orderRecipeSalmon,
  setProductById,
  isOrderModalOpen,
  formatCurrency,
  catalog 
} = useSalmonStore()

// Active tab on mobile
const mobileTab = ref<'steps' | 'ingredients'>('steps')

// Checklist of ingredients
const checkedIngredients = ref<Record<string, boolean>>({})

const toggleIngredient = (name: string) => {
  checkedIngredients.value[name] = !checkedIngredients.value[name]
}

// Find recommended product info
const recommendedProduct = computed(() => {
  return catalog.find(p => p.id === selectedRecipe.value.recommendedProductId) || catalog[0]
})

// Find other compatible products
const otherCompatibleProducts = computed(() => {
  if (!selectedRecipe.value.compatibleProductIds) return []
  return catalog.filter(p => 
    selectedRecipe.value.compatibleProductIds.includes(p.id) && 
    p.id !== recommendedProduct.value.id
  )
})

const orderSpecificProduct = (productId: string) => {
  setProductById(productId)
  closeRecipe()
  isOrderModalOpen.value = true
}

// Close with Escape key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isRecipeModalOpen.value) {
    closeRecipe()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <Transition name="recipe-modal-zoom">
    <div 
      v-if="isRecipeModalOpen" 
      class="recipe-modal-backdrop" 
      @click.self="closeRecipe"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`recipe-title-${selectedRecipe.id}`"
    >
      <!-- Khung modal chính -->
      <div class="recipe-modal-container">
        <!-- TẤM HÌNH MÓN ĂN LÀM BACKGROUND / HERO CINEMATIC -->
        <div class="recipe-background-image-wrap">
          <img 
            :src="selectedRecipe.image" 
            :alt="selectedRecipe.name" 
            class="recipe-bg-img"
            loading="eager"
          />
          <div class="recipe-bg-gradient-overlay"></div>
        </div>

        <!-- PHẦN CHỮ CÓ NỀN MỜ FROSTED GLASS ĐÈ LÊN BACKGROUND -->
        <div class="recipe-frosted-overlay">
          <!-- Top Bar: Nút đóng & Badge -->
          <div class="frosted-top-bar">
            <div class="recipe-meta-pills">
              <span class="meta-pill category-pill">
                🍳 {{ selectedRecipe.category }}
              </span>
              <span class="meta-pill time-pill">
                ⏱️ {{ selectedRecipe.cookTime }}
              </span>
              <span class="meta-pill diff-pill">
                ⭐ {{ selectedRecipe.difficulty }}
              </span>
              <span class="meta-pill servings-pill hide-mobile">
                👥 {{ selectedRecipe.servings }}
              </span>
              <span class="meta-pill cal-pill hide-mobile">
                🔥 {{ selectedRecipe.calories }}
              </span>
            </div>

            <button 
              class="btn-close-recipe" 
              @click="closeRecipe" 
              title="Đóng công thức (Esc)"
              aria-label="Đóng công thức"
            >
              ✕
            </button>
          </div>

          <!-- Header Tiêu Đề Món Ăn -->
          <div class="recipe-title-section">
            <div class="tagline-badge">
              <span class="sparkle">✨</span>
              <span>{{ selectedRecipe.tagline }}</span>
            </div>
            <h2 :id="`recipe-title-${selectedRecipe.id}`" class="recipe-headline">
              {{ selectedRecipe.name }}
            </h2>
            <p class="recipe-intro-desc">
              {{ selectedRecipe.description }}
            </p>
          </div>

          <!-- Mobile Tab Switcher (Chỉ hiển thị trên mobile để chuyển nhanh) -->
          <div class="mobile-tab-switch hide-desktop">
            <button 
              class="tab-btn" 
              :class="{ active: mobileTab === 'steps' }"
              @click="mobileTab = 'steps'"
            >
              🔥 Cách Nấu ({{ selectedRecipe.steps.length }} Bước)
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: mobileTab === 'ingredients' }"
              @click="mobileTab = 'ingredients'"
            >
              🧺 Nguyên Liệu ({{ selectedRecipe.ingredients.length }})
            </button>
          </div>

          <!-- Body Content: 2 Cột trên Desktop, Tab trên Mobile -->
          <div class="recipe-body-grid">
            <!-- CỘT 1: NGUYÊN LIỆU (Checklist) -->
            <div 
              class="recipe-col ingredients-col"
              :class="{ 'mobile-hidden': mobileTab !== 'ingredients' }"
            >
              <div class="col-header">
                <span class="col-icon">🧺</span>
                <h3 class="col-title">NGUYÊN LIỆU CẦN CÓ</h3>
                <span class="col-note">Khẩu phần: {{ selectedRecipe.servings }}</span>
              </div>

              <!-- Product Match Highlight Box -->
              <div class="recommended-cut-box">
                <div class="cut-badge-row">
                  <span class="cut-sparkle">🐟 LOẠI CÁ HỒI NÊN DÙNG:</span>
                  <span class="cut-name">{{ selectedRecipe.recommendedProductName }}</span>
                </div>
                <p class="cut-reason">
                  👉 {{ selectedRecipe.recommendedCutReason }}
                </p>

                <!-- Các loại cá hồi khác cũng phù hợp -->
                <div v-if="otherCompatibleProducts.length > 0" class="other-compatible-cuts">
                  <span class="other-cuts-title">Dòng cá khác cũng hợp nấu món này:</span>
                  <div class="other-cuts-list">
                    <button 
                      v-for="p in otherCompatibleProducts" 
                      :key="p.id"
                      type="button"
                      class="other-cut-tag"
                      @click="orderSpecificProduct(p.id)"
                      :title="`Bấm để chọn đặt ${p.name}`"
                    >
                      <span class="cut-tag-flag">{{ p.flag }}</span>
                      <span class="cut-tag-name">{{ p.shortName }}</span>
                      <span class="cut-tag-price">{{ p.priceDisplay.split('/')[0] }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Ingredients List Checklist -->
              <ul class="ingredients-list" role="list">
                <li 
                  v-for="(item, idx) in selectedRecipe.ingredients" 
                  :key="idx"
                  class="ingredient-item"
                  :class="{ 
                    'is-highlight': item.highlight,
                    'is-checked': checkedIngredients[item.name] 
                  }"
                  @click="toggleIngredient(item.name)"
                >
                  <label class="check-box-wrapper" @click.stop>
                    <input 
                      type="checkbox" 
                      :checked="checkedIngredients[item.name]"
                      @change="toggleIngredient(item.name)"
                      class="custom-check-input"
                    />
                    <span class="custom-check-mark"></span>
                  </label>
                  <span class="ing-name">{{ item.name }}</span>
                  <span class="ing-amount">{{ item.amount }}</span>
                </li>
              </ul>
            </div>

            <!-- CỘT 2: CÁCH NẤU TỪNG BƯỚC (Cooking Steps) -->
            <div 
              class="recipe-col steps-col"
              :class="{ 'mobile-hidden': mobileTab !== 'steps' }"
            >
              <div class="col-header">
                <span class="col-icon">🔥</span>
                <h3 class="col-title">CÁCH NẤU TỪNG BƯỚC</h3>
                <span class="col-note">Tổng thời gian: {{ selectedRecipe.cookTime }}</span>
              </div>

              <div class="steps-timeline">
                <div 
                  v-for="step in selectedRecipe.steps" 
                  :key="step.step"
                  class="step-card"
                >
                  <div class="step-num-badge">
                    <span>{{ step.step }}</span>
                  </div>
                  <div class="step-content">
                    <div class="step-top-line">
                      <h4 class="step-title">{{ step.title }}</h4>
                      <span class="step-time" v-if="step.time">⏱️ {{ step.time }}</span>
                    </div>
                    <p class="step-detail">{{ step.detail }}</p>
                  </div>
                </div>
              </div>

              <!-- Chef's Secret Tip Box -->
              <div class="chef-tip-box">
                <div class="chef-icon-wrap">
                  <span class="chef-icon">👨‍🍳</span>
                </div>
                <div class="chef-tip-text">
                  <span class="chef-tip-title">BÍ QUYẾT TỪ BẾP TRƯỞNG:</span>
                  <p class="chef-tip-content">{{ selectedRecipe.chefTip }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER: CHỌN MUA CÁ HỒI NÀY NGAY (Sticky bottom CTA) -->
          <div class="recipe-action-footer">
            <div class="footer-product-info">
              <img 
                :src="recommendedProduct.image" 
                :alt="recommendedProduct.name" 
                class="footer-prod-thumb hide-mobile"
              />
              <div class="footer-prod-text">
                <span class="footer-prod-label">Cá hồi tươi nhập khẩu chuẩn món này:</span>
                <div class="footer-prod-name-row">
                  <span class="footer-prod-name">{{ recommendedProduct.name }}</span>
                  <span class="footer-prod-price" :style="{ color: recommendedProduct.accentColor }">
                    {{ recommendedProduct.priceDisplay }}
                  </span>
                </div>
              </div>
            </div>

            <button 
              class="btn-order-salmon-cta"
              :style="{
                background: `linear-gradient(135deg, ${recommendedProduct.accentColor} 0%, #dc2626 100%)`,
                boxShadow: `0 8px 30px -4px ${recommendedProduct.accentColor}88`
              }"
              @click="orderRecipeSalmon(selectedRecipe)"
            >
              <span class="cta-fire-icon">⚡</span>
              <div class="cta-text-group">
                <span class="cta-main-text">ĐẶT MUA CÁ HỒI CHO MÓN NÀY</span>
                <span class="cta-sub-text">Ướp đá thùng xốp — Giao tận bếp trong 2H</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.recipe-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 7, 18, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
}

.recipe-modal-container {
  position: relative;
  width: 100%;
  max-width: 1040px;
  height: 90vh;
  height: 90dvh;
  max-height: 820px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.2);
}

/* BACKGROUND IMAGE LAYER */
.recipe-background-image-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
}

.recipe-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.04);
  filter: brightness(0.65) saturate(1.15);
  transition: transform 8s ease;
}

.recipe-modal-container:hover .recipe-bg-img {
  transform: scale(1.08);
}

.recipe-bg-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 75% 20%, rgba(2, 7, 18, 0.3) 0%, rgba(2, 7, 18, 0.88) 85%);
  pointer-events: none;
}

/* FROSTED GLASS CONTENT OVERLAY ĐÈ LÊN BACKGROUND */
.recipe-frosted-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(4, 16, 33, 0.78);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 18px 24px 16px;
  box-sizing: border-box;
  overflow: hidden;
}

/* TOP BAR */
.frosted-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.recipe-meta-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-pill {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  backdrop-filter: blur(8px);
}

.category-pill {
  background: rgba(255, 107, 74, 0.2);
  border-color: rgba(255, 107, 74, 0.4);
  color: #fed7aa;
}

.time-pill {
  background: rgba(56, 189, 248, 0.18);
  border-color: rgba(56, 189, 248, 0.35);
  color: #bae6fd;
}

.diff-pill {
  background: rgba(250, 204, 21, 0.18);
  border-color: rgba(250, 204, 21, 0.35);
  color: #fef08a;
}

.btn-close-recipe {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-close-recipe:hover {
  background: rgba(239, 68, 68, 0.8);
  border-color: #ef4444;
  transform: rotate(90deg);
}

/* TITLE SECTION */
.recipe-title-section {
  margin-bottom: 14px;
  flex-shrink: 0;
}

.tagline-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-salmon);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.recipe-headline {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 6px;
}

.recipe-intro-desc {
  font-size: 0.82rem;
  line-height: 1.5;
  color: #cbd5e1;
  max-width: 820px;
}

/* MOBILE TAB SWITCH */
.mobile-tab-switch {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.tab-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(255, 107, 74, 0.4);
}

/* BODY GRID (2 COLUMNS) */
.recipe-body-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 18px;
  overflow: hidden;
  margin-bottom: 14px;
}

.recipe-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  box-sizing: border-box;
}

.col-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.col-icon {
  font-size: 1rem;
}

.col-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--accent-ice);
  text-transform: uppercase;
}

.col-note {
  font-size: 0.68rem;
  color: #94a3b8;
  margin-left: auto;
}

/* RECOMMENDED CUT BOX */
.recommended-cut-box {
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.15) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(255, 107, 74, 0.35);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 10px;
}

.cut-badge-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 3px;
}

.cut-sparkle {
  font-size: 0.62rem;
  font-weight: 800;
  color: #fdba74;
  letter-spacing: 0.06em;
}

.cut-name {
  font-size: 0.78rem;
  font-weight: 800;
  color: #ffffff;
}

.cut-reason {
  font-size: 0.7rem;
  color: #cbd5e1;
  line-height: 1.35;
}

.other-compatible-cuts {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
}

.other-cuts-title {
  display: block;
  font-size: 0.62rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 5px;
}

.other-cuts-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.other-cut-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 6px;
  padding: 3px 7px;
  color: #e2e8f0;
  font-size: 0.62rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.other-cut-tag:hover {
  background: rgba(56, 189, 248, 0.18);
  border-color: rgba(56, 189, 248, 0.5);
  color: #ffffff;
  transform: translateY(-1px);
}

.cut-tag-price {
  color: var(--accent-salmon);
  font-weight: 700;
  font-size: 0.58rem;
}

/* INGREDIENTS LIST */
.ingredients-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 0.76rem;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.15s;
}

.ingredient-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(56, 189, 248, 0.3);
}

.ingredient-item.is-highlight {
  border-color: rgba(255, 107, 74, 0.4);
  background: rgba(255, 107, 74, 0.08);
}

.ingredient-item.is-checked {
  opacity: 0.6;
  text-decoration: line-through;
}

.check-box-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-check-input {
  cursor: pointer;
  width: 15px;
  height: 15px;
  accent-color: var(--accent-salmon);
}

.ing-name {
  flex: 1;
  font-weight: 600;
}

.ing-amount {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-ice);
  white-space: nowrap;
}

/* STEPS TIMELINE */
.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.step-card {
  display: flex;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.2s;
}

.step-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 107, 74, 0.25);
  transform: translateX(2px);
}

.step-num-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-salmon) 0%, #dc2626 100%);
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(255, 107, 74, 0.4);
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-top-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.step-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
}

.step-time {
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
  white-space: nowrap;
}

.step-detail {
  font-size: 0.76rem;
  line-height: 1.45;
  color: #cbd5e1;
}

/* CHEF'S TIP BOX */
.chef-tip-box {
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 10px;
  align-items: flex-start;
}

.chef-icon {
  font-size: 1.3rem;
  line-height: 1;
}

.chef-tip-text {
  flex: 1;
}

.chef-tip-title {
  display: block;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #fde68a;
  margin-bottom: 2px;
}

.chef-tip-content {
  font-size: 0.74rem;
  color: #fef3c7;
  line-height: 1.4;
}

/* ACTION FOOTER (STICKY) */
.recipe-action-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-product-info {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.footer-prod-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.footer-prod-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.footer-prod-label {
  font-size: 0.65rem;
  color: #94a3b8;
}

.footer-prod-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-prod-name {
  font-size: 0.8rem;
  font-weight: 800;
  color: #ffffff;
}

.footer-prod-price {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
}

.btn-order-salmon-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
  flex-shrink: 0;
}

.btn-order-salmon-cta:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.1);
}

.cta-fire-icon {
  font-size: 1.2rem;
}

.cta-text-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.cta-main-text {
  font-family: var(--font-display);
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.cta-sub-text {
  font-size: 0.64rem;
  opacity: 0.9;
  line-height: 1;
}

/* TRANSITIONS */
.recipe-modal-zoom-enter-active,
.recipe-modal-zoom-leave-active {
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.recipe-modal-zoom-enter-from,
.recipe-modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* RESPONSIVE DESIGN - TABLET & MOBILE */
@media (min-width: 769px) {
  .hide-desktop {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .recipe-modal-backdrop {
    padding: 0;
    align-items: flex-end;
  }

  .recipe-modal-container {
    height: 94vh;
    height: 94dvh;
    max-height: 94dvh;
    border-radius: 20px 20px 0 0;
    border-bottom: none;
  }

  .recipe-frosted-overlay {
    padding: 14px 14px 14px;
  }

  .recipe-headline {
    font-size: 1.18rem;
  }

  .recipe-intro-desc {
    font-size: 0.74rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .recipe-body-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }

  .mobile-hidden {
    display: none !important;
  }

  .recipe-col {
    padding-right: 0;
  }

  .recipe-action-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding-top: 10px;
    padding-bottom: env(safe-area-inset-bottom, 6px);
  }

  .footer-prod-text {
    align-items: center;
    text-align: center;
  }

  .footer-prod-name-row {
    justify-content: center;
  }

  .btn-order-salmon-cta {
    justify-content: center;
    padding: 10px 14px;
    width: 100%;
    text-align: center;
  }

  .cta-text-group {
    align-items: center;
  }
}
</style>
