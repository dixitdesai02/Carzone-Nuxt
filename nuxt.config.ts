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
    VITE_CARS_API_BASEURL:"https://testapi.io/api/dartya/resource/cardata",
    VITE_AUTH_API_BASEURL:"https://testapi.io/api/dartya"
  }
})
