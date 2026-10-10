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
    <!-- Menu Header: Nhỏ gọn đồng bộ với menu trái -->
    <div class="menu-header">
      <h2 class="menu-title">MÓN NGON</h2>
    </div>

    <!-- Vertical Menu: Các item tách rời, ôm sát chữ, vuông phải bo tròn trái, kính mờ iOS 27 -->
    <nav class="vertical-menu-container" role="tablist" aria-label="Danh sách món ngon chế biến từ cá hồi">
      <button 
        v-for="dish in recipes" 
        :key="dish.id"
        role="tab"
        :aria-selected="selectedRecipeId === dish.id"
        class="menu-item-pill"
        :class="{ 
          'is-active': selectedRecipeId === dish.id,
          'is-match': dish.recommendedProductId === currentProduct.id 
        }"
        @click="handleRecipeClick(dish.id)"
        :title="`${dish.name} — Bấm xem công thức`"
      >
        <!-- Thanh active chỉ báo phát sáng ở mép phải -->
        <span class="pill-active-edge" v-if="selectedRecipeId === dish.id"></span>

        <!-- Badge thời gian nấu (chỉ hiện trên desktop, ẩn trên mobile để tối giản) -->
        <span class="pill-cook-tag hide-mobile">{{ dish.cookTime }}</span>

        <!-- Tên món ăn: 1 dòng duy nhất -->
        <span class="pill-name">{{ dish.shortName }}</span>

        <!-- Chấm chỉ báo nhỏ nếu món này hợp nhất với loại cá đang chọn -->
        <span v-if="dish.recommendedProductId === currentProduct.id" class="pill-match-dot hide-mobile" title="Chuẩn vị nhất cho cá đang xem"></span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  max-width: 100%;
  height: auto;
  padding: 4px 0;
  box-sizing: border-box;
  user-select: none;
  z-index: 25;
}

/* Menu Header */
.menu-header {
  padding-right: 6px;
  margin-bottom: 5px;
  flex-shrink: 0;
  text-align: right;
}

.menu-title {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 800;
  color: rgba(254, 205, 211, 0.9);
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

/* Vertical Menu Container: Các item tách rời, căn phải */
.vertical-menu-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

/* Menu Item Pill:
   - Chiều cao đúng 1 dòng (line-height 1, padding vừa vặn)
   - Tách rời nhau (gap 5px / mobile 4px)
   - Không cố định chiều dài, co giãn theo chữ (width: fit-content)
   - Vuông bên phải (bám mép màn hình), bo tròn bên trái (border-radius: 9999px 0 0 9999px)
   - Nền đầm bớt trong suốt (0.88) để chữ rõ ràng sắc nét, không bị lẫn với hình ảnh bên dưới
*/
.menu-item-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  width: fit-content;
  max-width: fit-content;
  padding: 5px 8px 5px 12px;
  background: rgba(6, 20, 40, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-right: none;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: #f1f5f9;
  cursor: pointer;
  outline: none;
  text-align: right;
  line-height: 1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-item-pill:hover {
  background: rgba(28, 26, 46, 0.94);
  border-color: rgba(255, 107, 74, 0.65);
  color: #ffffff;
  transform: translateX(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

/* Active State: Hiệu ứng kính sáng iOS */
.menu-item-pill.is-active {
  background: rgba(48, 18, 14, 0.96);
  border-color: rgba(255, 107, 74, 0.85);
  border-right: none;
  color: #ffffff;
  transform: translateX(-4px);
  box-shadow: 0 4px 20px rgba(255, 107, 74, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.menu-item-pill.is-match {
  border-color: rgba(255, 107, 74, 0.55);
}

/* Dải chỉ báo active ở mép phải */
.pill-active-edge {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.5px;
  background: #ff6b4a;
  box-shadow: 0 0 10px #ff6b4a;
}

/* Tên món: 1 dòng duy nhất */
.pill-name {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.01em;
  white-space: nowrap;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  transition: color 0.18s;
}

.menu-item-pill:hover .pill-name,
.menu-item-pill.is-active .pill-name {
  color: #ffffff;
}

.menu-item-pill.is-active .pill-name {
  font-weight: 800;
}

/* Badge Thời gian nấu (chỉ hiện desktop) */
.pill-cook-tag {
  font-size: 0.56rem;
  font-weight: 700;
  color: #fef08a;
  background: rgba(234, 179, 8, 0.18);
  border: 1px solid rgba(234, 179, 8, 0.35);
  padding: 1px 5px;
  border-radius: 9999px;
  line-height: 1;
  white-space: nowrap;
  flex-shrink: 0;
}

.pill-match-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ff6b4a;
  box-shadow: 0 0 6px #ff6b4a;
  flex-shrink: 0;
  display: inline-block;
}

/* Mobile Responsive: Tối giản hoàn toàn, không thumbnail, không thời gian nấu */
@media (max-width: 768px) {
  .side-menu-rail {
    padding: 2px 0;
  }

  .menu-header {
    padding-right: 4px;
    margin-bottom: 3px;
  }

  .menu-title {
    font-size: 0.56rem;
  }

  .vertical-menu-container {
    gap: 4px;
  }

  .menu-item-pill {
    padding: 3.5px 6px 3.5px 7px;
    gap: 4px;
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
  }

  .pill-name {
    font-size: 0.55rem;
  }

  .pill-active-edge {
    width: 2.5px;
  }
}
</style>
