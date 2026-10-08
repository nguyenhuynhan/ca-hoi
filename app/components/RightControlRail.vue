<script setup lang="ts">
const { 
  recipes, 
  currentProduct, 
  selectedRecipeId, 
  openRecipe,
  closeMobileRecipeDrawer 
} = useSalmonStore()

const handleRecipeClick = (id: string) => {
  openRecipe(id)
  closeMobileRecipeDrawer()
}
</script>

<template>
  <aside class="side-menu-rail right-rail" aria-label="Menu gợi ý món ngon từ cá hồi">
    <!-- Header -->
    <div class="menu-header">
      <div class="header-title-row">
        <span class="chef-hat-icon">🍳</span>
        <h2 class="menu-title">MÓN NGON GỢI Ý</h2>
      </div>
      <span class="menu-subtitle">8 công thức chuẩn vị • Bấm xem cách nấu</span>
    </div>

    <!-- Recipes List: Bám sát mép phải màn hình, bo cong góc trái -->
    <nav class="vertical-menu-container" role="tablist" aria-label="Danh sách món ngon có thể nấu">
      <button 
        v-for="dish in recipes" 
        :key="dish.id"
        role="tab"
        :aria-selected="selectedRecipeId === dish.id"
        class="recipe-dish-row"
        :class="{ 
          'is-active': selectedRecipeId === dish.id,
          'is-match-product': dish.recommendedProductId === currentProduct.id 
        }"
        @click="handleRecipeClick(dish.id)"
        :title="`${dish.name} — Bấm để xem hình & cách nấu`"
      >
        <!-- Thanh chỉ báo active ở mép phải menu -->
        <span class="item-active-bar" v-if="selectedRecipeId === dish.id"></span>

        <!-- Nội dung món ăn -->
        <div class="item-content">
          <!-- Thumbnail ảnh món ăn thực tế -->
          <div class="dish-thumb-wrap">
            <img 
              :src="dish.image" 
              :alt="dish.shortName" 
              class="dish-thumb-img" 
              loading="lazy" 
            />
            <span class="dish-cook-badge">{{ dish.cookTime }}</span>
          </div>

          <!-- Text group -->
          <div class="dish-text-group">
            <div class="dish-top-line">
              <span class="dish-name">{{ dish.shortName }}</span>
            </div>
            
            <div class="dish-tags-row">
              <span 
                v-if="dish.recommendedProductId === currentProduct.id" 
                class="tag-match-cur"
              >
                ✨ Hợp cá đang xem
              </span>
              <span v-else class="dish-cat-tag">
                {{ dish.category }}
              </span>
            </div>
          </div>

          <!-- Action hint arrow -->
          <span class="dish-arrow">›</span>
        </div>
      </button>
    </nav>

    <!-- Trust / Quality Badges Mini Card -->
    <div class="trust-mini-card hide-mobile">
      <div class="trust-row">
        <span class="trust-icon">✈️</span>
        <span class="trust-text">Cá tươi bay hàng không 24h</span>
      </div>
      <div class="trust-row">
        <span class="trust-icon">🔪</span>
        <span class="trust-text">Lọc da, rút xương miễn phí</span>
      </div>
      <div class="trust-row">
        <span class="trust-icon">🧊</span>
        <span class="trust-text">Ướp đá thùng xốp giao 2H</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.side-menu-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 2px 0 2px 2px;
  box-sizing: border-box;
}

.menu-header {
  padding: 0 12px 6px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
  flex-shrink: 0;
}

.header-title-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.chef-hat-icon {
  font-size: 0.95rem;
}

.menu-title {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--accent-salmon);
  text-transform: uppercase;
}

.menu-subtitle {
  font-size: 0.62rem;
  color: var(--text-muted);
}

.vertical-menu-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 4px;
  flex: 1;
}

/* Vuông bên phải bám mép màn hình, bo tròn bên trái */
.recipe-dish-row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 8px;
  background: rgba(4, 16, 33, 0.55);
  border: 1px solid rgba(56, 189, 248, 0.1);
  border-right: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: right;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.recipe-dish-row:hover {
  background: rgba(14, 38, 70, 0.85);
  color: #ffffff;
  border-color: rgba(255, 107, 74, 0.4);
  transform: translateX(-4px);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
}

.recipe-dish-row.is-match-product {
  border-color: rgba(255, 107, 74, 0.35);
  background: rgba(25, 20, 28, 0.75);
}

.recipe-dish-row.is-active {
  background: linear-gradient(270deg, rgba(45, 18, 14, 0.95) 0%, rgba(14, 25, 48, 0.9) 100%);
  color: #ffffff;
  border-color: var(--accent-salmon);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 14px rgba(255, 107, 74, 0.2);
  transform: translateX(-5px);
}

.item-active-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 4px;
  background: var(--accent-salmon);
  box-shadow: 0 0 12px var(--accent-salmon);
}

.item-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}

/* THUMBNAIL HÌNH MÓN ĂN */
.dish-thumb-wrap {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  order: 3;
}

.dish-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-dish-row:hover .dish-thumb-img {
  transform: scale(1.15);
}

.dish-cook-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  font-size: 0.5rem;
  font-weight: 800;
  color: #fef08a;
  text-align: center;
  line-height: 1.2;
}

/* TEXT GROUP */
.dish-text-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  min-width: 0;
  order: 2;
  flex: 1;
}

.dish-top-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  width: 100%;
}

.dish-name {
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  color: #e2e8f0;
}

.recipe-dish-row.is-active .dish-name,
.recipe-dish-row:hover .dish-name {
  color: #ffffff;
  font-weight: 800;
}

.dish-tags-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dish-cat-tag {
  font-size: 0.6rem;
  color: #94a3b8;
  line-height: 1;
}

.tag-match-cur {
  font-size: 0.58rem;
  font-weight: 800;
  color: #fdba74;
  background: rgba(255, 107, 74, 0.2);
  padding: 1px 4px;
  border-radius: 3px;
  border: 1px solid rgba(255, 107, 74, 0.35);
  line-height: 1.1;
  white-space: nowrap;
}

.dish-arrow {
  order: 1;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 300;
  transition: transform 0.2s, color 0.2s;
  padding-left: 2px;
}

.recipe-dish-row:hover .dish-arrow {
  color: var(--accent-salmon);
  transform: translateX(-2px);
}

.trust-mini-card {
  margin-top: 6px;
  padding: 6px 10px;
  background: rgba(6, 20, 39, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.trust-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.63rem;
  color: var(--text-secondary);
}

.trust-icon {
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .menu-header {
    padding-right: 8px;
  }
  .menu-title {
    font-size: 0.7rem;
  }
  .recipe-dish-row {
    padding: 5px 8px 5px 6px;
  }
  .dish-name {
    font-size: 0.66rem;
  }
  .dish-thumb-wrap {
    width: 30px;
    height: 30px;
  }
  .tag-match-cur,
  .dish-cat-tag {
    font-size: 0.54rem;
  }
}
</style>
