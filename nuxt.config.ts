export default defineNuxtConfig({
  srcDir: 'src',

  css: ['@unocss/reset/tailwind.css', '~/styles/main.css'],
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],

  ssr: true,
  app: {
    head: {
      titleTemplate: `%s · 소비자59`,

      htmlAttrs: {
        lang: 'ko-KR',
        dir: 'ltr',
      },
      meta: [
        { id: 'description', property: 'description', content: '2022년 서울지방법원이 선정한 소비자를 위한 59가지 문장' },

        { id: 'og:type', property: 'og:type', content: 'website' },
        { id: 'og:url', property: 'og:type', content: 'website' },
        { id: 'og:title', property: 'og:title', content: '소비자59' },
        { id: 'og:description', property: 'og:description', content: '2022년 서울지방법원이 선정한 소비자를 위한 59가지 문장' },

        { id: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { id: 'twitter:title', name: 'twitter:title', content: '소비자59' },
        { id: 'twitter:description', name: 'twitter:description', content: '2022년 서울지방법원이 선정한 소비자를 위한 59가지 문장' },
        { id: 'twitter:domain', name: 'twitter:domain', content: 'c59.dun.land' },
        { id: 'twitter:url', name: 'twitter:url', content: 'https://c59.dun.land' },
        { id: 'twitter:creator', name: 'twitter:creator', content: '@dun__land' },
        { id: 'twitter:site', name: 'twitter:site', content: '@dun__land' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://dun.land' },
        { rel: 'stylesheet', href: 'https://dun.land/pretendard/v1.3.3/pretendard.min.css' }
      ]
    }
  },
  nitro: {
    preset: 'netlify'
  },
  build: {
    extractCSS: true,
    optimizeCSS: true
  }
})
