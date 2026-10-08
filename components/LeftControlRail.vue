<script setup lang="ts">
const { catalog, currentProductIndex, setProductIndex } = useSalmonStore()
</script>

<template>
  <aside class="side-menu-rail left-rail" aria-label="Menu chọn loại cá hồi">
    <!-- Menu Header -->
    <div class="menu-header">
      <h2 class="menu-title">CÁ HỒI NHẬP KHẨU</h2>
      <span class="menu-subtitle hide-mobile">8 dòng tuyển chọn</span>
    </div>

    <!-- Vertical Menu: Bám sát mép trái, bo tròn bên phải -->
    <nav class="vertical-menu-container" role="tablist" aria-label="Danh mục 8 sản phẩm cá hồi">
      <button 
        v-for="(item, idx) in catalog" 
        :key="item.id"
        role="tab"
        :aria-selected="currentProductIndex === idx"
        class="menu-item-row"
        :class="{ active: currentProductIndex === idx }"
        :style="{ '--item-accent': item.accentColor }"
        @click="setProductIndex(idx)"
        :title="`${item.name} — ${item.priceDisplay}`"
      >
        <!-- Thanh chỉ báo active ở mép trái menu -->
        <span class="item-active-bar" v-if="currentProductIndex === idx"></span>

        <!-- Nội dung label -->
        <div class="item-content">
          <span class="item-flag">{{ item.flag }}</span>
          <div class="item-text-group">
            <span class="item-name">{{ item.shortName }}</span>
            <span class="item-price-tag">{{ item.priceDisplay }}</span>
          </div>
        </div>
      </button>
    </nav>
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
  padding: 2px 2px 2px 0;
  box-sizing: border-box;
}

.menu-header {
  padding: 0 0 6px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-title {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-ice);
  text-transform: uppercase;
}

.menu-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.vertical-menu-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
}

/* Menu item row: Vuông bên trái bám mép màn hình, bo tròn bên phải */
.menu-item-row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 12px;
  background: rgba(4, 16, 33, 0.45);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: left;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.menu-item-row:hover {
  background: rgba(10, 28, 54, 0.7);
  color: #ffffff;
  border-color: rgba(56, 189, 248, 0.25);
  transform: translateX(3px);
}

.menu-item-row.active {
  background: linear-gradient(90deg, rgba(14, 42, 77, 0.95) 0%, rgba(7, 24, 46, 0.85) 100%);
  color: #ffffff;
  border-color: var(--item-accent);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(56, 189, 248, 0.15);
  transform: translateX(4px);
}

.item-active-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3.5px;
  background: var(--item-accent);
  box-shadow: 0 0 10px var(--item-accent);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.item-flag {
  font-size: 0.95rem;
  line-height: 1;
}

.item-text-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.item-name {
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.item-price-tag {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent-salmon);
  line-height: 1;
}

.menu-item-row.active .item-name {
  color: #ffffff;
  font-weight: 800;
}

@media (max-width: 768px) {
  .menu-header {
    padding-left: 8px;
  }
  .menu-title {
    font-size: 0.68rem;
  }
  .menu-item-row {
    padding: 5px 8px 5px 10px;
  }
  .item-name {
    font-size: 0.66rem;
  }
  .item-price-tag {
    font-size: 0.60rem;
  }
}
</style>
