// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
  ],
  css: [
    '@/assets/css/main.css'
  ],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active'
    }
  },
  app: {
    pageTransition: { name: 'page' }
  },
  runtimeConfig: {
    public: {
      VITE_CARS_API_BASEURL: process.env.VITE_CARS_API_BASEURL,
      VITE_AUTH_API_BASEURL: process.env.VITE_AUTH_API_BASEURL
    }
  }
})
