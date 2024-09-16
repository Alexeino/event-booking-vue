<template>
  <section class="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-8">
    <template v-if="loading === false">
      <template v-if="errors">
        <SectionedCard class="lg:col-span-4">
          <div class="space-y-4 items-center flex flex-col">
            <div class="text-red-500">
              Could not load the events at the moment. Please try again later.
            </div>
            <RoundButton @click="fetchEvents" variant="danger">Retry</RoundButton>
          </div>
        </SectionedCard>
      </template>
      <template v-else>
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :when="event.date"
            :description="event.description"
            @click="handleRegisteration(event)"
          />
        </template>
        <template v-else>
          <div class="md:col-span-2 lg:col-span-4 sm:col-span-2 text-center text-gray-500">
            No events yet.
          </div>
        </template>
      </template>
    </template>
    <template v-else>
      <LoadingEventCard variant="event" v-for="i in 4" :key="i" />
    </template>
  </section>
</template>

<script setup>
import LoadingEventCard from '@/components//LoadingEventCard.vue';
import EventCard from '@/components/EventCard.vue';
import RoundButton from './RoundButton.vue';
import { ref, onMounted } from 'vue';
import SectionedCard from '@/components/SectionedCard.vue';
import useBookings from '@/composables/useBookings';

const { handleRegisteration } = useBookings();

const loading = ref(false);
const events = ref([]);
const errors = ref(null);
const fetchEvents = async () => {
  loading.value = true;
  errors.value = null;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
    // await console.log(events.value);
  } catch (error) {
    console.error(error);
    errors.value = error;
  } finally {
    loading.value = false;
    // events.value = [];
  }
};

onMounted(() => {
  fetchEvents();
});
</script>

<style lang="scss" scoped></style>
