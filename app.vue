<script setup lang="ts">
const { currentProduct, catalog } = useSalmonStore()

// Dynamic head configuration & Preload all 8 salmon images
useHead({
  htmlAttrs: {
    'data-theme': computed(() => currentProduct.value.id)
  },
  link: computed(() => [
    ...catalog.map(product => ({
      rel: 'preload',
      as: 'image',
      href: product.image,
      type: 'image/jpeg'
    }))
  ])
})

// Client-side image preloading & decoding in memory for zero-lag switching
onMounted(() => {
  if (import.meta.client) {
    catalog.forEach((item) => {
      const img = new Image()
      img.src = item.image
    })
  }
})
</script>

<template>
  <div class="app-root" :data-theme="currentProduct.id">
    <!-- Hiệu ứng mặt nước lung linh tương tác phía sau -->
    <WaterBackground />

    <!-- Ambient Dynamic Glow Layer -->
    <div class="ambient-glow"></div>

    <!-- Header tinh gọn -->
    <AppHeader />

    <!-- Khu vực trung tâm: Cá hồi 3D + 2 Rail Menu bám sát mép -->
    <main class="main-stage">
      <SalmonCenterpiece />
    </main>

    <!-- Bottom Dock thanh toán & chốt đơn -->
    <BottomDock />

    <!-- Modal Bảng Chào Giá Gốc 8 sản phẩm -->
    <PriceTableModal />

    <!-- Modal Nhập Thông Tin Đặt Hàng -->
    <OrderModal />
  </div>
</template>

<style scoped>
.app-root {
  position: relative;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.ambient-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at 50% 30%, rgba(56, 189, 248, 0.08) 0%, rgba(2, 7, 18, 0.6) 80%);
  pointer-events: none;
  z-index: 2;
}

.main-stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 2px 0 0 0;
  position: relative;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .main-stage {
    padding: 0;
  }
}
</style>
