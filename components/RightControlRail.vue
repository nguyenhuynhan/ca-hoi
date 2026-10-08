<script setup lang="ts">
const { processingOptions, selectedProcessing } = useSalmonStore()

const selectOption = (id: string) => {
  selectedProcessing.value = id
}
</script>

<template>
  <aside class="side-menu-rail right-rail" aria-label="Menu chọn quy cách sơ chế">
    <!-- Header -->
    <div class="menu-header">
      <h2 class="menu-title">QUY CÁCH SƠ CHẾ</h2>
      <span class="menu-subtitle hide-mobile">Cắt theo yêu cầu & miễn phí</span>
    </div>

    <!-- Processing Options List: Bám mép phải, bo tròn bên trái -->
    <nav class="vertical-menu-container" role="tablist" aria-label="Tùy chọn cắt thái sơ chế">
      <button 
        v-for="opt in processingOptions" 
        :key="opt.id"
        role="tab"
        :aria-selected="selectedProcessing === opt.id"
        class="processing-item-row"
        :class="{ active: selectedProcessing === opt.id }"
        @click="selectOption(opt.id)"
        :title="opt.description"
      >
        <!-- Thanh chỉ báo active ở mép phải menu -->
        <span class="item-active-bar" v-if="selectedProcessing === opt.id"></span>

        <!-- Nội dung -->
        <div class="item-content">
          <span class="opt-icon">{{ opt.icon }}</span>
          <div class="opt-text-group">
            <div class="opt-top-row">
              <span class="opt-name">{{ opt.name }}</span>
            </div>
            <span class="opt-badge">{{ opt.badge }}</span>
          </div>
        </div>
      </button>
    </nav>

    <!-- Trust / Quality Badges Mini Card -->
    <div class="trust-mini-card hide-mobile">
      <div class="trust-row">
        <span class="trust-icon">✈️</span>
        <span class="trust-text">Bay thẳng hàng không 24h</span>
      </div>
      <div class="trust-row">
        <span class="trust-icon">🍣</span>
        <span class="trust-text">Sashimi Grade quốc tế</span>
      </div>
      <div class="trust-row">
        <span class="trust-icon">🧊</span>
        <span class="trust-text">Ướp đá thùng xốp 0-2°C</span>
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
}

.menu-title {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-salmon);
  text-transform: uppercase;
}

.menu-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.vertical-menu-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 4px;
}

/* Vuông bên phải bám mép màn hình, bo tròn bên trái */
.processing-item-row {
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 12px 6px 10px;
  background: rgba(4, 16, 33, 0.45);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: right;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.processing-item-row:hover {
  background: rgba(10, 28, 54, 0.7);
  color: #ffffff;
  border-color: rgba(255, 107, 74, 0.3);
  transform: translateX(-3px);
}

.processing-item-row.active {
  background: linear-gradient(270deg, rgba(35, 17, 14, 0.95) 0%, rgba(14, 25, 45, 0.85) 100%);
  color: #ffffff;
  border-color: var(--accent-salmon);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(255, 107, 74, 0.15);
  transform: translateX(-4px);
}

.item-active-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 3.5px;
  background: var(--accent-salmon);
  box-shadow: 0 0 10px var(--accent-salmon);
}

.item-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}

.opt-icon {
  font-size: 0.95rem;
  line-height: 1;
}

.opt-text-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  min-width: 0;
}

.opt-name {
  font-size: 0.73rem;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.2;
}

.opt-badge {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  color: #38bdf8;
  line-height: 1;
}

.processing-item-row.active .opt-name {
  color: #ffffff;
  font-weight: 800;
}

.processing-item-row.active .opt-badge {
  color: #fed7aa;
}

.trust-mini-card {
  margin-top: 10px;
  padding: 8px 10px;
  background: rgba(6, 20, 39, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.trust-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.trust-icon {
  font-size: 0.72rem;
}

@media (max-width: 768px) {
  .menu-header {
    padding-right: 8px;
  }
  .menu-title {
    font-size: 0.68rem;
  }
  .processing-item-row {
    padding: 5px 10px 5px 8px;
  }
  .opt-name {
    font-size: 0.65rem;
  }
  .opt-badge {
    font-size: 0.58rem;
  }
}
</style>
