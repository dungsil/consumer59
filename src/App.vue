<script lang="ts" setup>
const data = reactive<Record<number, string>>({
  1: "파렴치한 SPC 사회적 합의 이행하라.",
  2: "파리바게뜨는 노동자 괴롭히지 말고 사회적 합의 성실하게 이행하라.",
  3: "약속을 지켜야 한다!",
  4: "사회적 합의 불이행!",
  5: "SPC 파리바게뜨 불법행위 중단하고 합의를 이행하라",
  6: "SPC파리바게뜨 불법행위 사과하고, 관련자 징계하고, 사회적 합의 약속을 지켜라!",
  7: "반노동, 반인권, 성차별기업 SPC파리바게뜨 불법행위 중단하고 합의를이행하라!!",
  8: "노조파괴 자행.",
  9: "노동탄압 인권침해 멈춰라.",
  10: "노조파괴 불법행위 사과하고 관련자 징계하라.",
  11: "노조할 권리 탄압하는 SPC는 나쁜 기업.",
  12: "앞으로는 상생 뒤로는 노조파괴.",
  13: "불법 승진차별 SPC 처벌하라!",
  14: "SPC자본은 노동탄압 인권침해 지금 당장 중단하라!",
  15: "SPC 파리바게뜨 부당노동행위 중단하라!",
  16: "파리바게뜨는 노조파괴 불법행위 사죄하라!",
  17: "SPC그룹 불법 노동자탄압 즉각 멈춰라!",
  18: "파리바게뜨, 돈으로 민주노총 탈퇴 공작",
  19: "노조와해 불법행위",
  20: "공정하게 진급하고, 특정노조에 가입했다고 괴롭힘을 당하지 않아야하고",
  21: "노동자 직접 고용과 처우 개선하라.",
  22: "노조할 권리 탄압하는 SPC는 나쁜기업",
  23: "파리바게뜨는 노동조합 인정하고 사회적 합의 이행하라.",
  24: "점심시간도 없는 노동 착취 기업",
  25: "SPC 파리바게뜨는 점심시간 보장하라.",
  26: "파리바게뜨 제빵기사에게 휴가를 보장하라!",
  27: "밥 좀 먹고 빵 만들자!",
  28: "제빵기사 유산율 2배, 모성권 보장하라!",
  29: "제빵기사 유산율 50%, 모성보호 법도 안지키는 SPC파리바게뜨는 모성권을 보장하라",
  30: "휴식권, 모성권 보장하라.",
  31: "밥굶고 만드는 빵",
  32: "노동자 휴식권 보장하라",
  33: "점심시간도, 휴가도 보장하지 않는 SPC",
  34: "파리바게뜨는 불법행위 중단하라",
  35: "SPC파리바게뜨는 불법행위 사과하고 관련자를 처벌하라!",
  36: "노동착취 기업 SPC! 포켓몬은 노동착취 포장지가 아닙니다.",
  37: "노동자 괴롭히는 파리바게뜨 절대 용서 못해",
  38: "노동착취로 빵 만드는 나쁜 기업 SPC자본 규탄한다!",
  39: "밀가루 대신 노동자를 갈아 만든 그 빵,",
  40: "파렴치한 SPC 파리바게뜨",
  41: "노조파괴 SPC 소비자가 응징하자!",
  42: "파렴치한 SPC파리바게뜨 NO! 눈물로 만든 빵 안 먹어!!",
  43: "SPC파리바게뜨와 헤어지자!",
  44: "밀가루 대신 노동자를 갈아만든 그 빵!! 꼭 드셔야 하겠습니까? 끝까지 불매에 나서겠습니다.",
  45: "노동탄압이 계속되면 SPC제품이 퇴출될 것입니다.",
  46: "소비자가 혼내 주자.",
  47: "노동자 괴롭히는 파리바게뜨 안 먹어요.",
  48: "사지도 먹지도 맙시다.",
  49: "노동자 탄압 SPC 대표브랜드 안가요 안사요",
  50: "눈물로 만든 빵 안먹어",
  51: "노동착취로 만든 빵 안먹어!",
  52: "제빵노동자 눈물 담긴 빵, 먹지도 사지도 맙시다!",
  53: "제빵사의 눈물로 만든 빵은 먹지 않습니다!",
  54: "제빵사들의 눈물젖은 파리바게뜨빵, 사지도 먹지도 맙시다!",
  55: "점심시간도, 휴가도 보장하지 않는 SPC삼립, 파리바게뜨, 던킨도너츠, 배스킨라빈스 안먹어 ! #멈춰라 SPC, #SPC 불매",
  56: "SPC그룹이 인권을 보장하고, 노동법을 준수할 때까지 저는 제품을 사지 않겠습니다. #멈춰라 SPC, #SPC불매",
  57: "던킨#배라#삼립 안사요.",
  58: "노동착취로 빵 만드는 반사회적 기업 SPC 포켓몬빵 안 먹는다!",
  59: "노동자 탄압하는 SPC 대표브랜드 안가요! 안 사요!",
})
const random = ref(Math.floor(Math.random() * 60))
const hashTags = ['#SPC불매', '#소비자59'].join(' ')

const onShareTwitter = () => {
  const text = data[random.value] + ' ' + hashTags
  window.open(
    'https://twitter.com/intent/tweet?text='
    + encodeURIComponent(text)
    + '&url=' + encodeURIComponent('https://dun.land/consumer59?r=' + random.value)
  )
}
</script>

<template>
  <main class="flex flex-col w-full h-full px4 py10 text-center font-sans text-gray-700">
    <div class="flex-grow">
      <h1 class="font-900 text-4xl">소비자59</h1>

      <div class="flex flex-col justify-center items-center gap8 mt-16">
        <p class="font-500 text-sm">오늘의 표현:</p>

        <input
          type="text"
          class="w150 max-w-full h16 px2 border border-gray-300 rounded-xl font-900 text-xl text-center"
          :value="data[random]"
        >

        <div class="flex justify-around items-center gap4">
          <button type="button"
                  class="inline-flex items-center p4 rounded-md bg-#1da1f2 font-500 text-white text-center"
                  @click="onShareTwitter"
          >
            <span class="inline-block i-simple-icons:twitter" aria-hidden="true"></span>
            트위터로 공유하기
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </main>
</template>
