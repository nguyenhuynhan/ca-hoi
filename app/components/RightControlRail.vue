<script setup lang="ts">
const { currentProduct, processingOptions, selectedProcessing } = useSalmonStore()
</script>

<template>
  <aside class="right-control-rail">
    <!-- Processing Style Selector -->
    <div class="rail-section">
      <div class="section-title">
        <span class="title-icon">🔪</span>
        <span>YÊU CẦU SƠ CHẾ THEO MÓN</span>
      </div>

      <div class="options-grid">
        <button
          v-for="opt in processingOptions"
          :key="opt.id"
          class="option-card"
          :class="{ 'is-selected': selectedProcessing === opt.id }"
          @click="selectedProcessing = opt.id"
        >
          <div class="opt-header">
            <span class="opt-icon">{{ opt.icon }}</span>
            <span class="opt-badge">{{ opt.badge }}</span>
          </div>
          <div class="opt-name">{{ opt.name }}</div>
          <div class="opt-desc">{{ opt.description }}</div>
        </button>
      </div>
    </div>

    <!-- Culinary Uses for Selected Salmon -->
    <div class="rail-section">
      <div class="section-title">
        <span class="title-icon">🍽️</span>
        <span>MÓN NGON ĐỀ XUẤT</span>
      </div>
      <div class="culinary-pills">
        <span
          v-for="(dish, idx) in currentProduct.culinaryUses"
          :key="idx"
          class="dish-pill"
        >
          {{ dish }}
        </span>
      </div>
    </div>

    <!-- Quality Commitments & Cold Chain Seal -->
    <div class="rail-section commitment-section">
      <div class="section-title">
        <span class="title-icon">🛡️</span>
        <span>TIÊU CHUẨN XUẤT XƯỞNG</span>
      </div>
      <div class="guarantee-cards">
        <div class="guarantee-item">
          <span class="g-icon">❄️</span>
          <div class="g-text">
            <span class="g-title">Chuỗi Lạnh Khép Kín 0–2°C</span>
            <span class="g-sub">Thùng xốp đá gel lạnh sâu 24H</span>
          </div>
        </div>
        <div class="guarantee-item">
          <span class="g-icon">✅</span>
          <div class="g-text">
            <span class="g-title">Cam Kết Đổi Mới 100%</span>
            <span class="g-sub">Bảo hành độ tươi sống trong 24H</span>
          </div>
        </div>
        <div class="guarantee-item">
          <span class="g-icon">📜</span>
          <div class="g-text">
            <span class="g-title">Chứng Nhận GlobalGAP & ASC</span>
            <span class="g-sub">Kiểm dịch hải quan đầy đủ</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.right-control-rail {
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(4, 16, 33, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(56, 189, 248, 0.16);
  z-index: 20;
  overflow-y: auto;
}

.rail-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-ice);
  text-transform: uppercase;
}

.title-icon {
  font-size: 0.85rem;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.option-card {
  text-align: left;
  background: rgba(7, 24, 48, 0.45);
  border: 1px solid rgba(56, 189, 248, 0.12);
  border-radius: 9px;
  padding: 8px 12px;
  cursor: pointer;
  transition: var(--transition-fast);
  color: inherit;
  font-family: inherit;
}

.option-card:hover {
  background: rgba(14, 40, 77, 0.6);
  border-color: rgba(56, 189, 248, 0.35);
}

.option-card.is-selected {
  background: linear-gradient(135deg, rgba(255, 107, 74, 0.18) 0%, rgba(14, 44, 84, 0.8) 100%);
  border-color: var(--accent-salmon);
  box-shadow: 0 0 15px rgba(255, 107, 74, 0.25);
}

.opt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
}

.opt-icon {
  font-size: 1rem;
}

.opt-badge {
  font-size: 0.62rem;
  font-weight: 700;
  padding: 1px 6px;
  background: rgba(56, 189, 248, 0.15);
  border-radius: 4px;
  color: #bae6fd;
}

.option-card.is-selected .opt-badge {
  background: rgba(255, 107, 74, 0.25);
  color: #ff9e88;
}

.opt-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.25;
}

.opt-desc {
  font-size: 0.65rem;
  color: var(--text-secondary);
  line-height: 1.3;
  margin-top: 2px;
}

.culinary-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.dish-pill {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 9999px;
  color: #bae6fd;
}

.commitment-section {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid rgba(56, 189, 248, 0.12);
}

.guarantee-cards {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: rgba(3, 11, 23, 0.4);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: 8px;
}

.g-icon {
  font-size: 1rem;
}

.g-text {
  display: flex;
  flex-direction: column;
}

.g-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: #f1f5f9;
}

.g-sub {
  font-size: 0.62rem;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .right-control-rail {
    width: 260px;
  }
}

@media (max-width: 768px) {
  .right-control-rail {
    display: none;
  }
}
</style>
