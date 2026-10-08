<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!import.meta.client || !canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let animationFrameId: number
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  // Water Ripple Simulation using layered wave harmonics and interactive drops
  interface Ripple {
    x: number
    y: number
    radius: number
    maxRadius: number
    strength: number
    speed: number
    color: string
  }

  interface Bubble {
    x: number
    y: number
    size: number
    speedY: number
    speedX: number
    opacity: number
    sway: number
    swaySpeed: number
  }

  const ripples: Ripple[] = []
  const bubbles: Bubble[] = []

  // Initialize bubbles
  const bubbleCount = Math.min(30, Math.floor(width / 50))
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.35 + 0.1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    })
  }

  const addRipple = (x: number, y: number, strength = 1, isClick = false) => {
    ripples.push({
      x,
      y,
      radius: 2,
      maxRadius: isClick ? Math.min(width, height) * 0.45 : Math.random() * 70 + 50,
      strength,
      speed: isClick ? 3.5 : 1.8,
      color: isClick ? 'rgba(56, 189, 248, 0.4)' : 'rgba(103, 232, 249, 0.25)'
    })
    // Limit ripples to maintain high performance
    if (ripples.length > 25) {
      ripples.shift()
    }
  }

  // Auto natural raindrops / subtle ocean ripples
  let lastAutoDrop = 0
  const triggerAutoDrop = (timestamp: number) => {
    if (timestamp - lastAutoDrop > 2200) {
      addRipple(
        Math.random() * width * 0.8 + width * 0.1,
        Math.random() * height * 0.8 + height * 0.1,
        0.5 + Math.random() * 0.4,
        false
      )
      lastAutoDrop = timestamp
    }
  }

  // Mouse / Touch Interaction
  let lastMove = 0
  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    const now = performance.now()
    if (now - lastMove < 70) return // Throttle for smooth perf
    lastMove = now

    const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
    const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY
    addRipple(clientX, clientY, 0.35, false)
  }

  const handleClick = (e: MouseEvent) => {
    addRipple(e.clientX, e.clientY, 0.9, true)
  }

  window.addEventListener('mousemove', handlePointerMove, { passive: true })
  window.addEventListener('click', handleClick, { passive: true })
  window.addEventListener('touchmove', handlePointerMove, { passive: true })

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  // Simulation loop
  let time = 0
  const render = (timestamp: number) => {
    time += 0.015
    triggerAutoDrop(timestamp)

    ctx.clearRect(0, 0, width, height)

    // 1. Water Caustics Shimmer Layer (Dynamic Refraction Simulation)
    ctx.save()
    const gradient = ctx.createRadialGradient(
      width * 0.5 + Math.sin(time * 0.5) * 80,
      height * 0.35 + Math.cos(time * 0.4) * 60,
      50,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.85
    )
    gradient.addColorStop(0, 'rgba(14, 116, 144, 0.22)')
    gradient.addColorStop(0.4, 'rgba(8, 47, 73, 0.18)')
    gradient.addColorStop(0.8, 'rgba(3, 12, 24, 0.12)')
    gradient.addColorStop(1, 'rgba(2, 6, 12, 0.3)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    ctx.restore()

    // 2. Render and update concentric water ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      r.radius += r.speed
      const progress = r.radius / r.maxRadius
      const currentAlpha = (1 - progress) * r.strength

      if (progress >= 1) {
        ripples.splice(i, 1)
        continue
      }

      // Outer ripple ring
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(56, 189, 248, ${currentAlpha * 0.35})`
      ctx.lineWidth = Math.max(1, 2.5 * (1 - progress))
      ctx.stroke()

      // Inner refraction highlight ring
      if (r.radius > 12) {
        ctx.beginPath()
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.18})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Caustic shimmer burst inside
      if (r.radius > 20) {
        ctx.beginPath()
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 16), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(14, 165, 233, ${currentAlpha * 0.12})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // 3. Render gentle aquatic bubbles rising up
    ctx.fillStyle = 'rgba(186, 230, 253, 0.4)'
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i]
      b.y -= b.speedY
      b.sway += b.swaySpeed
      b.x += Math.sin(b.sway) * 0.35 + b.speedX

      if (b.y < -10) {
        b.y = height + 10
        b.x = Math.random() * width
      }

      ctx.beginPath()
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(186, 230, 253, ${b.opacity})`
      ctx.fill()

      // Tiny bubble shine
      ctx.beginPath()
      ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.8})`
      ctx.fill()
    }

    animationFrameId = requestAnimationFrame(render)
  }

  animationFrameId = requestAnimationFrame(render)

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('mousemove', handlePointerMove)
    window.removeEventListener('click', handleClick)
    window.removeEventListener('touchmove', handlePointerMove)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <div class="water-canvas-wrapper">
    <!-- Base Caustics Photo Texture with CSS fluid waving -->
    <div class="water-caustics-layer"></div>

    <!-- Sunlight Beam Rays through water -->
    <div class="water-light-rays"></div>

    <!-- Deep Water Gradient Tint -->
    <div class="water-depth-tint"></div>

    <!-- Interactive HTML5 60FPS Ripple Canvas -->
    <canvas ref="canvasRef" class="water-ripple-canvas"></canvas>

    <!-- Top Surface Specular Vignette -->
    <div class="water-surface-vignette"></div>
  </div>
</template>

<style scoped>
.water-canvas-wrapper {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(120% 100% at 50% 10%, #082444 0%, #041224 45%, #020712 100%);
}

/* Photo-realistic Caustics Layer */
.water-caustics-layer {
  position: absolute;
  inset: -5%;
  width: 110%;
  height: 110%;
  background-image: url('/images/water-surface.jpg');
  background-size: cover;
  background-position: center 30%;
  opacity: 0.28;
  mix-blend-mode: screen;
  filter: contrast(125%) brightness(85%);
  animation: causticsDrift 28s ease-in-out infinite alternate;
  transform: translateZ(0);
}

@keyframes causticsDrift {
  0% {
    transform: scale(1) translate(0, 0) rotate(0deg);
  }
  50% {
    transform: scale(1.04) translate(-1%, 1.5%) rotate(0.4deg);
  }
  100% {
    transform: scale(1.02) translate(1.2%, -1%) rotate(-0.3deg);
  }
}

/* Light beams penetrating water surface */
.water-light-rays {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% -10%,
    rgba(56, 189, 248, 0.22) 0%,
    rgba(14, 116, 144, 0.12) 45%,
    rgba(2, 6, 12, 0) 80%
  );
  animation: rayPulse 8s ease-in-out infinite alternate;
}

@keyframes rayPulse {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Deep water oceanic vignette */
.water-depth-tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 45%,
    rgba(2, 12, 28, 0.45) 0%,
    rgba(2, 7, 16, 0.85) 75%,
    rgba(1, 4, 10, 0.96) 100%
  );
}

/* 60fps Interactive Ripple Canvas */
.water-ripple-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* Edge shadow for ultra luxury contrast */
.water-surface-vignette {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 100px rgba(1, 4, 10, 0.85);
  pointer-events: none;
}
</style>
