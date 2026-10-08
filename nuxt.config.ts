// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  nitro: {
    preset: process.env.NITRO_PRESET || (process.env.NODE_ENV === 'production' ? 'cloudflare_module' : undefined),

    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  app: {
    head: {
      title: 'CHUYỆN CÁ HỒI — Tổng Kho Cá Hồi Nauy & Chile Tươi Lạnh Cao Cấp',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Chuyện Cá Hồi — Tổng kho nhập khẩu trực tiếp cá hồi Nauy tươi Đại Tây Dương & cá hồi Chile Coho. Đạt chuẩn Sashimi, công thức món ngon chuẩn vị, giao ướp đá hỏa tốc 2H.' },
        { name: 'theme-color', content: '#030c18' },
        { property: 'og:title', content: 'CHUYỆN CÁ HỒI — Gợi Ý Món Ngon & Bảng Giá Cá Hồi Nhập Khẩu' },
        { property: 'og:description', content: 'Cá hồi tươi Nauy nguyên con, nguyên tảng, phi lê & cắt thỏi sashimi. Hướng dẫn công thức nấu món ngon từ cá hồi chuẩn 5 sao.' },
        { property: 'og:image', content: '/images/dishes/sashimi.jpg' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap' }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ]
})