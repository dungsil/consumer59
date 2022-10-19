<script lang="ts" setup>
import { data, hashTags } from './constants'

const random = () => Math.floor(Math.random() * 59) + 1 // 기존링크 호환 유지를 위하여 +1 추가..

const query = useUrlSearchParams<Record<string, number>>('history',{
  initialValue: { r: random() }
})

const text = computed(() => data[query.r - 1])
const hashTagedText = computed(() => `${text.value} ${hashTags}`)
const url = computed(() => `https://c59.dun.land?r=${query.r}`)
const { copy, copied } = useClipboard({ source: computed(() => `${hashTagedText.value} ${url.value}`) })

const onShareTwitter = () => window.open(
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(hashTagedText.value)}&url=${encodeURIComponent(url.value)}`
)
</script>

<template>
  <main class="flex flex-col w-full h-full px4 py10 text-center font-sans text-gray-700 space-y-16">
    <div class="flex-grow space-y-8">

      <header class="flex flex-col gap2">
        <h1 class="font-900 text-4xl">소비자59</h1>
        <p>
          2022년

          <a
            href="https://m.khan.co.kr/national/court-law/article/202210192022001"
            target="_blank"
            class="font-500 text-blue-600 underline"
          >
            서울지방법원이 선정한
          </a>

          소비자를 위한 59가지 문장을 쉽게 공유할 수 있습니다. 😎
        </p>
      </header>

      <main class="flex flex-col justify-center items-center gap8">
        <div class="flex flex-col sm:flex-row gap4 max-w-full">
          <input
            v-model="text"
            type="text"
            class="w-full h16 px2 border border-gray-300 rounded-xl font-900 text-xl text-center"
            data-sm="flex-grow w150"
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

        <div class="flex justify-around items-center gap4">
          <c59-button class="bg-#1da1f2 text-white text-center" @click="onShareTwitter">
            <span class="inline-block mr1 i-simple-icons:twitter" aria-hidden="true"></span>
            트위터로 공유하기
          </c59-button>

          <c59-button @click="copy()">
            <span class="inline-block mr1 i-heroicons:clipboard-document-list" aria-hidden="true"></span>
            클립보드에 복사하기
          </c59-button>
        </div>

        <c59-alert title="복사가 완료되었습니다." :show="copied" />
      </main>
    </div>

    <c59-footer />
  </main>
</template>
