<template>
  <RoundedCard class="animate-pulse">
    <template v-if="variant == 'event'">
      <div class="p-4 border-b border-gray-200 h-8 bg-gray-300"></div>
      <div class="p-4 border-b border-gray-200 h-6 bg-gray-300"></div>
      <div class="p-4 h-6 bg-gray-300"></div>
      <div class="flex justify-end p-4">
        <div class="h-8 w-24 bg-gray-300 rounded-full"></div>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-end p-4">
        <div class="h-6 w-16 bg-gray-300 rounded-full"></div>
      </div>
    </template>
  </RoundedCard>
</template>

<script setup>
import RoundedCard from './RoundedCard.vue';

defineProps({
  variant: {
    type: String,
    default: 'event'
  }
});
</script>

<style lang="scss" scoped></style>
