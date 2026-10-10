<script setup lang="ts">
const { 
  catalog, 
  currentProductIndex, 
  isPriceTableOpen, 
  setProductIndex,
  formatCurrency 
} = useSalmonStore()

const closeModal = () => {
  isPriceTableOpen.value = false
}

const selectAndClose = (idx: number) => {
  setProductIndex(idx)
  closeModal()
}
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isPriceTableOpen" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="header-left">
            <h2 id="modal-title" class="table-main-title">BẢNG CHÀO GIÁ CÁ HỒI</h2>
            <span class="header-sub">Tổng kho phân phối sỉ & lẻ cá hồi Nauy & Chile nhập khẩu chính ngạch</span>
          </div>

          <button class="btn-close" @click="closeModal" aria-label="Đóng bảng báo giá">
            ✕
          </button>
        </div>

        <!-- Scrollable Table Container -->
        <div class="table-scroll-wrap">
          <table class="quote-table">
            <thead>
              <tr>
                <th class="th-stt">STT</th>
                <th class="th-name">Sản phẩm / Thương hiệu</th>
                <th class="th-unit">ĐVT</th>
                <th class="th-size">Đường kính / Cỡ</th>
                <th class="th-img">Hình ảnh</th>
                <th class="th-pkg">Quy cách đóng gói</th>
                <th class="th-origin">Xuất xứ</th>
                <th class="th-price">Giá chào (VNĐ)</th>
                <th class="th-action">Chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, idx) in catalog" 
                :key="item.id"
                :class="{ 'row-active': currentProductIndex === idx }"
              >
                <!-- STT -->
                <td class="td-stt">{{ idx + 1 }}</td>

                <!-- Tên Sản Phẩm -->
                <td class="td-name">
                  <div class="name-wrap">
                    <div>
                      <strong class="item-full-name">{{ item.name }}</strong>
                      <span class="item-species hide-mobile">{{ item.species }}</span>
                    </div>
                  </div>
                </td>

                <!-- ĐVT -->
                <td class="td-unit">
                  <span class="unit-badge">{{ item.unit }}</span>
                </td>

                <!-- Cỡ -->
                <td class="td-size">{{ item.sizeSpec }}</td>

                <!-- Hình ảnh thumbnail -->
                <td class="td-img">
                  <img :src="item.image" :alt="item.name" class="table-thumb" />
                </td>

                <!-- Quy cách -->
                <td class="td-pkg">{{ item.packaging }}</td>

                <!-- Xuất xứ -->
                <td class="td-origin">
                  <span class="origin-badge" :class="item.origin.toLowerCase().includes('nauy') ? 'origin-nauy' : 'origin-chile'">
                    {{ item.origin }}
                  </span>
                </td>

                <!-- Giá chào (vàng nổi bật như bản in gốc) -->
                <td class="td-price">
                  <span class="price-highlight">
                    {{ formatCurrency(item.price) }}
                  </span>
                  <div v-if="item.unit === 'CON' || item.id.includes('nguyen-con')" class="whole-fish-badge-table">
                    ⚖️ Cân thực tế báo giá
                  </div>
                </td>

                <!-- Thao tác chọn -->
                <td class="td-action">
                  <button 
                    class="btn-pick" 
                    :class="{ 'is-selected': currentProductIndex === idx }"
                    @click="selectAndClose(idx)"
                  >
                    {{ currentProductIndex === idx ? 'Đang chọn' : 'Chọn xem' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <div class="footer-notes">
            <span>* Giá chào trên đã bao gồm VAT & công cắt thái sơ chế chuẩn Sashimi/Steak.</span>
            <span>* Đối với cá nguyên con: Báo giá chuẩn xác theo trọng lượng cân thực tế (~5 - 6kg/con) trước khi giao.</span>
            <span>* Giao hàng hỏa tốc trong thùng xốp ướp đá giữ lạnh 0°C – 2°C toàn thành phố.</span>
          </div>

          <button class="btn-done" @click="closeModal">
            Đóng & Tiếp Tục Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.modal-card {
  width: 100%;
  max-width: 1300px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  background: rgba(4, 16, 33, 0.95);
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.15);
  background: rgba(6, 23, 48, 0.6);
}

.table-main-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #38bdf8;
  margin: 0;
}

.header-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.btn-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: #ef4444;
}

.table-scroll-wrap {
  flex: 1;
  overflow: auto;
  padding: 8px 12px;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  text-align: left;
}

.quote-table th {
  background: #0f3057;
  color: #ffffff;
  font-weight: 800;
  padding: 10px 10px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  white-space: nowrap;
  font-family: var(--font-display);
  font-size: 0.74rem;
  letter-spacing: 0.03em;
}

.quote-table td {
  padding: 8px 10px;
  border: 1px solid rgba(56, 189, 248, 0.12);
  color: #e2e8f0;
  vertical-align: middle;
}

.quote-table tbody tr {
  background: rgba(5, 18, 36, 0.4);
  transition: background 0.18s;
}

.quote-table tbody tr:nth-child(even) {
  background: rgba(7, 24, 48, 0.6);
}

.quote-table tbody tr:hover {
  background: rgba(14, 42, 77, 0.75);
}

.quote-table tbody tr.row-active {
  background: rgba(14, 60, 110, 0.85);
  border-left: 3px solid var(--accent-salmon);
}

.td-stt {
  text-align: center;
  font-weight: 700;
  width: 40px;
}

.td-sku {
  font-family: monospace;
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.75rem;
}

.name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-flag {
  font-size: 1.1rem;
}

.item-full-name {
  font-weight: 800;
  color: #ffffff;
  display: block;
}

.item-species {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.td-unit {
  text-align: center;
}

.unit-badge {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #38bdf8;
}

.table-thumb {
  width: 58px;
  height: 42px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.td-pkg {
  font-size: 0.72rem;
  color: #94a3b8;
  max-width: 220px;
}

.origin-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
}

.origin-nauy {
  background: rgba(56, 189, 248, 0.15);
  color: #7dd3fc;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.origin-chile {
  background: rgba(244, 63, 94, 0.15);
  color: #fda4af;
  border: 1px solid rgba(244, 63, 94, 0.3);
}

/* CỘT GIÁ CHÀO VÀNG RỰC RỠ NHƯ BẢN BÁO GIÁ GỐC */
.th-price {
  background: #facc15 !important;
  color: #0f172a !important;
  text-align: right;
}

.td-price {
  background: rgba(250, 204, 21, 0.12);
  text-align: right;
}

.price-highlight {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 900;
  color: #facc15;
}

.whole-fish-badge-table {
  font-size: 0.62rem;
  color: #fdba74;
  font-weight: 700;
  margin-top: 2px;
  background: rgba(255, 107, 74, 0.18);
  border: 1px solid rgba(255, 107, 74, 0.35);
  padding: 1px 4px;
  border-radius: 4px;
  display: inline-block;
}

.btn-pick {
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.3);
  background: rgba(56, 189, 248, 0.15);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-pick:hover {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
}

.btn-pick.is-selected {
  background: var(--accent-salmon);
  border-color: var(--accent-salmon);
  box-shadow: 0 0 10px rgba(255, 107, 74, 0.4);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid rgba(56, 189, 248, 0.15);
  background: rgba(6, 23, 48, 0.6);
}

.footer-notes {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.68rem;
  color: var(--text-muted);
}

.btn-done {
  padding: 7px 18px;
  background: var(--accent-salmon);
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-done:hover {
  background: #ff7d5f;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
