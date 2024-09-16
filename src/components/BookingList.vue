<template>
  <section class="grid grid-col-1 gap-3">
    <template v-if="loading === false">
      <BookingItem
        @click="cancelBooking(booking.id)"
        v-for="booking in bookings"
        :key="booking.id"
        :what="booking.eventTitle"
        :status="booking.status"
      />
    </template>
    <template v-else>
      <LoadingEventCard variant="booking" v-for="i in 2" :key="i" />
    </template>
  </section>
</template>

<script setup>
import BookingItem from '@/components/BookingItem.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import useBookings from '@/composables/useBookings';
import { onMounted } from 'vue';
const { fetchBookings } = useBookings();

const { bookings, loading, cancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>

<style lang="scss" scoped></style>
