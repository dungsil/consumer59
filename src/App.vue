<script lang="ts" setup>
import { data, hashTags } from './constants'

const random = ref(Math.floor(Math.random() * 59))

const onShareTwitter = () => {
  const text = data[random.value] + ' ' + hashTags
  window.open(
    'https://twitter.com/intent/tweet?text='
    + encodeURIComponent(text)
    + '&url=' + encodeURIComponent('https://c59.dun.land?r=' + random.value)
  )
}
</script>

<template>
  <main class="flex flex-col w-full h-full px4 py10 text-center font-sans text-gray-700 space-y-16">
    <div class="flex-grow">
      <h1 class="font-900 text-4xl">소비자59</h1>

      <div class="flex flex-col justify-center items-center gap8 mt-16">
        <p class="font-500 text-sm">오늘의 문장:</p>

        <div class="flex gap4 max-w-full">
          <input
            type="text"
            class="flex-grow w150 h16 px2 border border-gray-300 rounded-xl font-900 text-xl text-center"
            :value="data[random]"
            @focus="$e => $e.target.select()"
          >

          <c59-button
            class="hidden sm:inline-block border border-gray-300 rounded-md leading-none"
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
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>
