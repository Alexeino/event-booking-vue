<template>
  <SectionedCard>
    <section class="flex justify-between">
      <div class="flex space-x-2 align-middle">
        <div class="">{{ what }}</div>
        <!-- <RoundButton :variant="buttonVariant">{{ status.toLocaleUpperCase() }}</RoundButton> -->
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

      <RoundButton variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
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

// const buttonVariant = computed(() => {
//   return props.status === 'pending' ? 'warning' : props.status === 'failed' ? 'danger' : 'success';
// });
</script>

<style lang="scss" scoped></style>
