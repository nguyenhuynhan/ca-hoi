<script setup lang="ts">
const { catalog, isPriceTableOpen, setProductIndex, formatCurrency, isOrderModalOpen } = useSalmonStore()

const filterOrigin = ref<'all' | 'NAUY' | 'CHILE'>('all')

const filteredList = computed(() => {
  if (filterOrigin.value === 'all') return catalog
  if (filterOrigin.value === 'NAUY') return catalog.filter(p => p.origin.includes('NAUY'))
  return catalog.filter(p => p.origin.includes('CHILE'))
})

const selectToOrder = (idx: number) => {
  setProductIndex(idx)
  isPriceTableOpen.value = false
  isOrderModalOpen.value = true
}

const selectToView = (idx: number) => {
  setProductIndex(idx)
  isPriceTableOpen.value = false
}

const printTable = () => {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<template>
  <div v-if="isPriceTableOpen" class="modal-backdrop" @click="isPriceTableOpen = false">
    <div class="table-modal-card" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-left">
          <div class="header-badge">BẢNG BÁO GIÁ CHÍNH THỨC</div>
          <h2 class="table-main-title">BẢNG CHÀO GIÁ CÁ HỒI</h2>
          <p class="table-sub">Tổng Kho Nhập Khẩu Trực Tiếp Nauy & Chile • Cập nhật giá mới nhất</p>
        </div>

        <div class="header-right">
          <!-- Filter buttons -->
          <div class="filter-tabs">
            <button 
              class="tab-btn" 
              :class="{ 'is-active': filterOrigin === 'all' }" 
              @click="filterOrigin = 'all'"
            >
              Tất Cả (8)
            </button>
            <button 
              class="tab-btn" 
              :class="{ 'is-active': filterOrigin === 'NAUY' }" 
              @click="filterOrigin = 'NAUY'"
            >
              🇳🇴 Nauy (5)
            </button>
            <button 
              class="tab-btn" 
              :class="{ 'is-active': filterOrigin === 'CHILE' }" 
              @click="filterOrigin = 'CHILE'"
            >
              🇨🇱 Chile (3)
            </button>
          </div>

          <button class="btn-print" @click="printTable" title="In hoặc Lưu PDF bảng giá">
            🖨️ In Bảng Giá
          </button>

          <button class="btn-close" @click="isPriceTableOpen = false" title="Đóng">
            ✕
          </button>
        </div>
      </div>

      <!-- Table Body Container -->
      <div class="table-scroll-wrap">
        <table class="official-price-table">
          <thead>
            <tr>
              <th class="th-stt">STT</th>
              <th class="th-sku">Mã SKU</th>
              <th class="th-name">Sản phẩm / Thương hiệu</th>
              <th class="th-unit">ĐVT</th>
              <th class="th-size">Đường kính / Cỡ</th>
              <th class="th-img">Hình ảnh đính kèm</th>
              <th class="th-pack">Quy cách đóng gói</th>
              <th class="th-origin">Xuất xứ</th>
              <th class="th-price">Giá chào (VND)</th>
              <th class="th-action">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item, idx) in filteredList" 
              :key="item.sku"
              class="table-row"
              @click="selectToView(catalog.indexOf(item))"
            >
              <td class="td-stt">{{ idx + 1 }}</td>
              <td class="td-sku font-mono">{{ item.sku }}</td>
              <td class="td-name">
                <div class="name-bold">{{ item.name }}</div>
                <div class="name-sub">{{ item.grade }}</div>
              </td>
              <td class="td-unit">
                <span class="unit-badge">{{ item.unit }}</span>
              </td>
              <td class="td-size font-medium">{{ item.sizeSpec }}</td>
              <td class="td-img">
                <div class="table-img-box">
                  <img :src="item.image" :alt="item.name" />
                </div>
              </td>
              <td class="td-pack">{{ item.packaging }}</td>
              <td class="td-origin">
                <div class="origin-cell">
                  <span>{{ item.flag }}</span>
                  <span class="origin-text">{{ item.origin }}</span>
                </div>
              </td>
              <!-- Yellow highlighted Price Column matching user's original image -->
              <td class="td-price-yellow">
                <div class="price-value-box">
                  <span class="yellow-price">{{ item.price.toLocaleString('vi-VN') }}</span>
                  <span class="yellow-unit">₫/{{ item.unit.toLowerCase() }}</span>
                </div>
              </td>
              <td class="td-action" @click.stop>
                <button class="btn-table-buy" @click="selectToOrder(catalog.indexOf(item))">
                  Đặt Mua
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <div class="footer-note">
          <span class="note-bullet">📌</span>
          <span>Báo giá đã bao gồm VAT. Hỗ trợ cắt phi lê, hút chân không, đóng thùng xốp ướp đá theo yêu cầu. Giao hỏa tốc 2 giờ.</span>
        </div>
        <div class="footer-contact">
          <span>Hotline hỗ trợ sỉ & lẻ: <strong>0909.123.456</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(2, 7, 18, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.table-modal-card {
  width: 100%;
  max-width: 1400px;
  max-height: 92vh;
  background: #06152a;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Header */
.modal-header {
  padding: 16px 24px;
  background: #0a1f3d;
  border-bottom: 2px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 8px;
  background: rgba(56, 189, 248, 0.2);
  border-radius: 4px;
  color: var(--accent-ice);
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.table-main-title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #38bdf8;
  margin: 0;
}

.table-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background: rgba(3, 11, 23, 0.6);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.15);
}

.tab-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-fast);
}

.tab-btn.is-active {
  background: var(--accent-salmon);
  color: #ffffff;
}

.btn-print {
  padding: 7px 14px;
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #bae6fd;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-close:hover {
  background: #ef4444;
  border-color: #ef4444;
}

/* Table */
.table-scroll-wrap {
  flex: 1;
  overflow: auto;
  background: #041021;
}

.official-price-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.official-price-table th {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #09264a;
  color: #e0f2fe;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 14px;
  border: 1px solid #133966;
  white-space: nowrap;
}

.official-price-table td {
  padding: 12px 14px;
  border: 1px solid #0e294b;
  font-size: 0.76rem;
  vertical-align: middle;
}

.table-row {
  cursor: pointer;
  transition: background 0.15s ease;
}

.table-row:hover {
  background: rgba(14, 44, 84, 0.5);
}

.td-stt {
  text-align: center;
  font-weight: 800;
  color: var(--accent-ice);
  width: 50px;
}

.td-sku {
  font-family: monospace;
  font-size: 0.8rem;
  color: #cbd5e1;
  white-space: nowrap;
  width: 110px;
}

.td-name {
  min-width: 240px;
}

.name-bold {
  font-weight: 800;
  color: #ffffff;
  font-size: 0.82rem;
}

.name-sub {
  font-size: 0.65rem;
  color: #ff9e88;
  margin-top: 2px;
}

.td-unit {
  text-align: center;
  width: 70px;
}

.unit-badge {
  padding: 3px 8px;
  background: rgba(56, 189, 248, 0.15);
  border-radius: 4px;
  color: #bae6fd;
  font-weight: 800;
  font-size: 0.7rem;
}

.td-size {
  color: #e2e8f0;
  font-weight: 600;
  white-space: nowrap;
}

.td-img {
  text-align: center;
  width: 100px;
}

.table-img-box {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #020712;
  border: 1px solid rgba(56, 189, 248, 0.2);
  margin: 0 auto;
}

.table-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.td-pack {
  font-size: 0.7rem;
  color: #94a3b8;
  line-height: 1.35;
  max-width: 220px;
}

.td-origin {
  text-align: center;
  width: 100px;
}

.origin-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.origin-text {
  font-weight: 700;
  color: #bae6fd;
  font-size: 0.74rem;
}

/* Yellow highlighted Price column */
.th-price {
  background: #eab308 !important;
  color: #000000 !important;
}

.td-price-yellow {
  background: #fef08a !important;
  color: #000000 !important;
  text-align: right;
  width: 130px;
}

.price-value-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.yellow-price {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 900;
  color: #000000;
}

.yellow-unit {
  font-size: 0.65rem;
  color: #44403c;
  font-weight: 700;
}

.td-action {
  text-align: center;
  width: 100px;
}

.btn-table-buy {
  padding: 6px 14px;
  background: #ff6b4a;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.74rem;
  font-weight: 800;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-table-buy:hover {
  background: #ff5230;
  transform: scale(1.05);
}

/* Footer */
.modal-footer {
  padding: 12px 24px;
  background: #0a1f3d;
  border-top: 1px solid rgba(56, 189, 248, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #94a3b8;
}

.footer-note {
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 900px) {
  .modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
