<template>
  <SectionedCard>
    <template #header>
      {{ title }}
    </template>
    <template #default>
      {{ when }}
    </template>
    <template #footer>
      <div class="space-y-2">
        <p>{{ description }}</p>
        <div class="flex justify-end">
          <RoundButton @click="$emit('register')">Register</RoundButton>
          <!-- Using Button as component to avoid Fall Through-->
        </div>
      </div>
    </template>
  </SectionedCard>
</template>

<script setup>
import RoundButton from '@/components/RoundButton.vue';
import SectionedCard from '@/components/SectionedCard.vue';
defineProps({
  title: String,
  when: String,
  description: String
});

defineEmits(['register']);
</script>

<style lang="scss" scoped></style>
