<template>
  <SectionedCard>
    <section class="flex justify-between">
      <div class="flex space-x-2 align-middle">
        <div class="">{{ what }}</div>
        <teamplate>
          <component
            :is="icon"
            :class="{
              'animate-spin': pending,
              'text-orange-400': pending,
              'text-red-500': failed,
              'text-green-600': !pending && !failed
            }"
          />
        </teamplate>
      </div>

      <RoundButton variant="danger">Cancel</RoundButton>
    </section>
  </SectionedCard>
</template>

<script setup>
import SectionedCard from './SectionedCard.vue';
import RoundButton from './RoundButton.vue';
import { LoaderCircle, Check, CircleX } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
  what: String,
  status: String
});

const pending = computed(() => props.status === 'pending');
const failed = computed(() => props.status === 'failed');
const icon = computed(() => (pending.value ? LoaderCircle : failed.value ? CircleX : Check));
</script>

<style lang="scss" scoped></style>
