<script lang="ts" setup>
import { data, hashTags } from './constants'
import C59Footer from '~/components/c59-footer.vue'

const r = new URLSearchParams(window.location.search).get("r")
const random = ref(Math.floor(Math.random() * 59))

// 공유된 페이지 접근 시 동일한 문장 표시
if (!Number.isNaN(r)) {
  const num = parseInt(r as string)
  console.log(num)
  if (num >= 0 && num < 59) {
    random.value = num
  }
}

const showAlert = ref(false)

const onShareTwitter = () => {
  const text = data[random.value] + ' ' + hashTags
  window.open(
    'https://twitter.com/intent/tweet?text='
    + encodeURIComponent(text)
    + '&url=' + encodeURIComponent('https://c59.dun.land?r=' + random.value)
  )
}

const onCopy = () => {
  navigator.clipboard.writeText(data[random.value])
  showAlert.value = true
}
</script>

<template>
  <main class="flex flex-col w-full h-full px4 py10 text-center font-sans text-gray-700 space-y-16">
    <div class="flex-grow">
      <h1 class="font-900 text-4xl">소비자59</h1>

      <div class="flex flex-col justify-center items-center gap8 mt-16">
        <p class="font-500 text-sm">오늘의 문장:</p>

        <div class="flex flex-col sm:flex-row gap4 max-w-full">
          <input
            type="text"
            class="w-full h16 px2 border border-gray-300 rounded-xl font-900 text-xl text-center"
            data-sm="flex-grow w150"
            :value="data[random]"
            @focus="$e => $e.target.select()"
          >

          <c59-button
            class="border border-gray-300 rounded-md leading-none"
            data-hover="bg-gray-200"
            @click="random = Math.floor(Math.random() * 59)"
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

          <c59-button @click="onCopy">
            <span class="inline-block mr1 i-heroicons:clipboard-document-list" aria-hidden="true"></span>
            클립보드에 복사하기
          </c59-button>
        </div>

        <c59-alert title="복사가 완료되었습니다." :show="showAlert" @close="showAlert = false" />
      </div>
    </div>

    <c59-footer />
  </main>
</template>
