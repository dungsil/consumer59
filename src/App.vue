<script lang="ts" setup>
import { useRoute } from '#app'
import { data, hashTags } from './constants'
import { computed, useClipboard, useUrlSearchParams, watch } from '#imports'

const router = useRoute()

const random = () => Math.floor(Math.random() * 59) + 1 // 기존링크 호환 유지를 위하여 +1 추가..
const query = useUrlSearchParams<Record<string, number>>('history',{
  initialValue: { r: router.query.r as unknown as number ?? random() }
})

const text = computed(() => data[query.r - 1])
const hashTaggedText = computed(() => `${text.value} ${hashTags}`)
const url = computed(() => `https://c59.dun.land?r=${query.r}`)
const ogImage = computed(() => `https://dun.land/oas/consumer59/${encodeURIComponent(text.value)}`)
const { copy, copied } = useClipboard({ source: computed(() => `${hashTaggedText.value} ${url.value}`) })

const onShareTwitter = () => window.open(
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(hashTaggedText.value)}&url=${encodeURIComponent(url.value)}`
)

const onShareFacebook = () => window.open(
  `https://www.facebook.com/dialog/share?app_id=3140497639595640&display=popup&hashtag=%23소비자59&href=${encodeURIComponent(url.value)}`
)

useHead({
  title: text.value,
  meta: [
    { id: 'og:url', property: 'og:url', content: url.value },
    { id: 'twitter:url', name: 'twitter:url', content: url.value },

    { id: 'description', name: 'description', content: hashTaggedText.value },
    { id: 'og:description', property: 'og:description', content: hashTaggedText.value },
    { id: 'twitter:description', name: 'twitter:description', content: hashTaggedText.value },

    { id: 'og:image', property: 'og:image', content: ogImage.value },
    { id: 'twitter:image', name: 'twitter:image', content: ogImage.value },
  ]
})

watch(hashTaggedText, (content) => {
  useHead({
    title: text.value,
    meta: [
      { id: 'description', name: 'description', content },
      { id: 'og:description', property: 'og:description', content },
      { id: 'twitter:description', name: 'twitter:description', content },
    ]
  })
})
</script>

<template>
  <main class="!flex flex-col w-full h-full text-center font-sans text-gray-700 space-y-16" style="display: none;">
    <div class="flex-grow space-y-8 px4 py15 sm:py10">
      <header class="flex flex-col gap2">
        <h1 class="font-900 text-4xl">소비자59</h1>
        <p>
          2022년

          <a
            href="https://m.khan.co.kr/national/court-law/article/202210192022001"
            target="_blank"
            class="font-700 text-blue-600"
            data-hover="underline"
          >서울지방법원이 선정</a>한 소비자를 위한

          <a target="_blank" href="https://twitter.com/pblu_nojo/status/1582658438714494978" class="font-700 text-blue-600" data-hover="underline">
            59가지 문장</a>을 쉽게 공유할 수 있습니다. 😎
        </p>
      </header>

      <main class="flex flex-col justify-center items-center gap8">
        <div class="flex flex-col sm:flex-row gap4 max-w-full">
          <input
            v-model="text"
            type="text"
            class="w-full h16 px2 border border-gray-300 rounded-xl font-900 text-xl text-center"
            data-sm="flex-grow w150"
            data-focus="outline-none ring-2 ring-offset-2 ring-indigo-600"
            aria-label="소비자59 문장"
          >

          <c59-button
            class="border border-gray-300 rounded-md leading-none"
            data-hover="bg-gray-200"
            @click="query.r = random()"
          >
            <span class="inline-block w5 h5 i-heroicons:arrow-path-solid" aria-hidden="true"></span>
            <span class="sr-only">문장 변경</span>
          </c59-button>
        </div>

        <div class="flex flex-col gap2">
          <h2 class="font-500 text-sm text-gray-700">공유:</h2>
          <div class="flex flex-col items-center gap4 w-200px" data-sm="flex-row justify-around w-auto">
            <c59-button class="w-full bg-#1da1f2 text-white text-center" data-sm="w-auto" @click="onShareTwitter">
              <span class="inline-block mr1 i-simple-icons:twitter" aria-hidden="true"></span>
              트위터로 공유
            </c59-button>

            <c59-button class="w-full bg-#3b5998 text-white text-center" data-sm="w-auto" @click="onShareFacebook">
              <span class="inline-block mr1 i-simple-icons:facebook" aria-hidden="true"></span>
              페이스북으로 공유
            </c59-button>

            <c59-button class="w-full" data-sm="w-auto" @click="copy()">
              <span class="inline-block mr1 i-heroicons:clipboard-document-list" aria-hidden="true"></span>
              클립보드에 복사
            </c59-button>
          </div>
        </div>

        <c59-alert title="복사가 완료되었습니다." :show="copied" />
      </main>
    </div>

    <c59-footer />
  </main>
</template>
