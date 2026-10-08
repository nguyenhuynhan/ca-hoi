// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  nitro: {
    preset: "cloudflare_module",

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
        { name: 'description', content: 'Chuyện Cá Hồi — Tổng kho nhập khẩu trực tiếp cá hồi Nauy tươi Đại Tây Dương & cá hồi Chile Coho. Đạt chuẩn Sashimi, cắt thái theo yêu cầu, giao ướp đá hỏa tốc 2H.' },
        { name: 'theme-color', content: '#030c18' },
        { property: 'og:title', content: 'CHUYỆN CÁ HỒI — Bảng Chào Giá & Tổng Kho Cá Hồi Nhập Khẩu' },
        { property: 'og:description', content: 'Cá hồi tươi Nauy nguyên con, nguyên tảng, phi lê & cắt thỏi sashimi. Cá hồi Chile Coho đông lạnh IQF. Giao thùng xốp ướp đá tận nơi.' },
        { property: 'og:image', content: '/images/salmon/nauy-phi-le.jpg' }
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
  ],

  modules: ["nitro-cloudflare-dev"]
})