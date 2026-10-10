<script setup lang="ts">
const emit = defineEmits(['select'])
const { catalog, currentProductIndex, setProductIndex } = useSalmonStore()

const handleItemClick = (idx: number) => {
  setProductIndex(idx)
  emit('select', idx)
}
</script>

<template>
  <aside class="side-menu-rail left-rail" aria-label="Menu chọn loại cá hồi">
    <!-- Menu Header: Nhỏ gọn -->
    <div class="menu-header">
      <h2 class="menu-title">CÁ HỒI</h2>
    </div>

    <!-- Vertical Menu: Các item tách rời, chiều dài co giãn theo chữ, vuông trái bo tròn phải, hiệu ứng trong suốt iOS -->
    <nav class="vertical-menu-container" role="tablist" aria-label="Danh mục 8 sản phẩm cá hồi">
      <button 
        v-for="(item, idx) in catalog" 
        :key="item.id"
        role="tab"
        :aria-selected="currentProductIndex === idx"
        class="menu-item-pill"
        :class="{ 
          'is-active': currentProductIndex === idx,
          'is-whole': item.unit === 'CON' || item.id.includes('nguyen-con')
        }"
        :style="{ '--item-accent': item.accentColor }"
        @click="handleItemClick(idx)"
        :title="`${item.name} — ${item.priceDisplay}`"
      >
        <!-- Thanh active chỉ báo phát sáng ở mép trái -->
        <span class="pill-active-edge" v-if="currentProductIndex === idx"></span>

        <!-- Nội dung đúng 1 dòng: Tên cá + chấm cam phát sáng (cá nguyên con) + giá trên desktop -->
        <span class="pill-name">{{ item.shortName }}</span>
        <span v-if="item.unit === 'CON' || item.id.includes('nguyen-con')" class="pill-whole-indicator" title="Cá nguyên con (báo giá theo cân)"></span>
        <span v-else class="pill-price-tag hide-mobile">{{ item.priceDisplay.split('/')[0] }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu-rail {
  position: relative;
  display: flex;
  flex-direction: column;
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
  padding-left: 6px;
  margin-bottom: 5px;
  flex-shrink: 0;
}

.menu-title {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 800;
  color: rgba(226, 232, 240, 0.85);
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

/* Vertical Menu Container: Các item tách rời, không có hộp nền thô bao bọc */
.vertical-menu-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}

/* Menu Item Pill:
   - Chiều cao đúng 1 dòng (height auto, line-height 1, padding vừa vặn)
   - Tách rời nhau (gap 5px)
   - Không cố định chiều dài, co giãn theo chữ (width: fit-content)
   - Vuông bên trái, bo tròn bên phải (border-radius: 0 9999px 9999px 0)
   - Hiệu ứng trong suốt iOS liquid glassmorphism thấy rõ hình nền phía sau
*/
.menu-item-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  max-width: fit-content;
  padding: 5px 12px 5px 8px;
  background: rgba(6, 20, 40, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  color: #f1f5f9;
  cursor: pointer;
  outline: none;
  text-align: left;
  line-height: 1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-item-pill:hover {
  background: rgba(14, 42, 77, 0.94);
  border-color: rgba(56, 189, 248, 0.6);
  color: #ffffff;
  transform: translateX(3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

/* Active State: Hiệu ứng kính sáng iOS với viền phát sáng */
.menu-item-pill.is-active {
  background: rgba(14, 45, 82, 0.96);
  border-color: rgba(56, 189, 248, 0.85);
  border-left: none;
  color: #ffffff;
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Dải chỉ báo active ở mép trái */
.pill-active-edge {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3.5px;
  background: var(--item-accent, #38bdf8);
  box-shadow: 0 0 10px var(--item-accent, #38bdf8);
}

/* Tên cá: 1 dòng duy nhất */
.pill-name {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.01em;
  white-space: nowrap;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  transition: color 0.18s;
}

.menu-item-pill:hover .pill-name,
.menu-item-pill.is-active .pill-name {
  color: #ffffff;
}

.menu-item-pill.is-active .pill-name {
  font-weight: 800;
}

/* Cá nguyên con: Phân biệt bằng viền/chữ và chấm màu cam tinh tế */
.menu-item-pill.is-whole {
  background: rgba(28, 16, 12, 0.88);
  border-color: rgba(249, 115, 22, 0.55);
}

.menu-item-pill.is-whole .pill-name {
  color: #fdba74;
}

.menu-item-pill.is-whole:hover,
.menu-item-pill.is-whole.is-active {
  background: rgba(38, 20, 14, 0.96);
  border-color: #f97316;
}

.menu-item-pill.is-whole:hover .pill-name,
.menu-item-pill.is-whole.is-active .pill-name {
  color: #ffedd5;
}

.menu-item-pill.is-whole .pill-active-edge {
  background: #f97316;
  box-shadow: 0 0 10px #f97316;
}

.pill-whole-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f97316;
  box-shadow: 0 0 8px #f97316, 0 0 2px #ffffff;
  flex-shrink: 0;
  display: inline-block;
  animation: pulse-orange 2s infinite ease-in-out;
}

@keyframes pulse-orange {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #f97316, 0 0 4px #ffffff; }
}

.pill-price-tag {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--accent-salmon);
  line-height: 1;
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.9;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .side-menu-rail {
    padding: 2px 0;
  }

  .menu-header {
    padding-left: 4px;
    margin-bottom: 3px;
  }

  .menu-title {
    font-size: 0.56rem;
  }

  .vertical-menu-container {
    gap: 4px;
  }

  .menu-item-pill {
    padding: 3.5px 7px 3.5px 6px;
    gap: 4px;
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
  }

  .pill-name {
    font-size: 0.55rem;
  }

  .pill-whole-indicator {
    width: 5px;
    height: 5px;
  }

  .pill-active-edge {
    width: 2.5px;
  }
}
</style>
