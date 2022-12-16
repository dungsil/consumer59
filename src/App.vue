<script lang="ts" setup>
import { useHead } from '#head'
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
    <!-- 2022.12.16 - 트위터 정책 항의 -->
    <aside class="fixed w-full bg-indigo-600">
      <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex w-0 flex-1 items-center">
          <span class="flex rounded-lg bg-indigo-800 p-2">
            <span class="inline-block w6 h6 mr1 i-heroicons:megaphone c-white" aria-hidden="true"></span>
          </span>
            <p class="ml-3 truncate font-medium text-white">
              <span class="lg:hidden">트위터 공유하기 기능이 의도적으로 비활성화 되었습니다.</span>
              <span class="hidden lg:inline">
                트위터의 마스토돈 차단 정책에 항의의 차원으로 트위터 공유하기 기능을 이용하실 수 없습니다.
                '클립보드의 복사' 기능을 활용해 공유해주세요.
              </span>
            </p>
          </div>
          <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
               href="https://sns.dun.land/@sns/109522108410210998"
               class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              자세히 알아보기
            </a>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button type="button" class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
              <span class="sr-only">닫기</span>
              <span class="inline-block w6 h6 mr1 i-heroicons:x-mark c-white" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </aside>

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
            <c59-button class="w-full bg-#1da1f2 text-white text-center" data-sm="w-auto" disabled>
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
