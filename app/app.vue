<script setup lang="ts">
const { catalog, currentProduct } = useSalmonStore()

// Dynamic head configuration & Preload all salmon images
useHead({
  htmlAttrs: {
    'data-theme': computed(() => currentProduct.value.id)
  },
  link: computed(() => [
    ...catalog.map(item => ({
      rel: 'preload',
      as: 'image',
      href: item.image,
      type: 'image/jpeg'
    }))
  ])
})

// Client-side image preloading & decoding in memory
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
  <div class="app-root">
    <!-- Interactive 60FPS Water Surface Ripple Background -->
    <WaterBackground />

    <!-- Top Navigation Header -->
    <AppHeader />

    <!-- Main Centralized Stage (Single Screen Layout) -->
    <main class="main-stage">
      <LeftControlRail />
      <SalmonCenterpiece />
      <RightControlRail />
    </main>

    <!-- Bottom Dock: Quantity, Subtotal & Actions -->
    <BottomDock />

    <!-- Modals -->
    <PriceTableModal />
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
  background-color: #020712;
}

.main-stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .main-stage {
    flex-direction: column;
  }
}
</style>
