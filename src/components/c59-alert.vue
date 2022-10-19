<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  show: Boolean
})
</script>

<template>
  <div v-show="show" class="rounded-md bg-green-50 p4">
    <div class="flex leading-none">
      <div class="flex-shrink-0">
        <span class="inline-block i-heroicons:clipboard-document-check-solid text-green-900" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-green-800">{{ title }}</p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">

          <button
            type="button"
            class="btn bg-green-50 p1.5 text-green-500"
            data-hover="bg-green-100"
            @click="$emit('close')"
          >
            <span class="sr-only">닫기</span>
            <span class="inline-block i-heroicons:x-mark-20-solid" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

