import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);

const fetchBookings = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
    // await console.log(bookings.value);
  } finally {
    loading.value = false;
  }
};

const handleRegisteration = async (event) => {
  if (bookings.value.some((b) => b.eventId === event.id && b.userId === 1)) {
    alert("You've already registered for this event");
    return;
  }
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  };

  bookings.value = [...bookings.value, newBooking];

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed'
      })
    });

    if (response.ok) {
      // Mocking the response from the server so that the booking status is updated
      // Usually in real apps the created object is returned from the server to confirm
      // that the object was created.
      const index = bookings.value.findIndex((b) => b.id === newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (error) {
    console.error('Failed to confirm booking', error);
    // Scenario - 1
    // Mocking that the booking was not confirmed and removing newBooking from the bookings list
    // bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
    bookings.value.find((b) => b.id === newBooking.id).status = 'failed';

    // Scenario - 2
    // Mocking that the booking was not confirmed and updating the status of the booking to 'failed'
    // newBooking.status = 'failed';
    // bookings.value = [...bookings.value, newBooking];
  }
};
const findBookingById = (bookingId) => {
  return bookings.value.findIndex((b) => b.id === bookingId);
};

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  } catch (error) {
    console.error('Failed to cancel booking', error);
    bookings.value.splice(index, 0, originalBooking);
  }
};

export default function useBookings() {
  return {
    bookings,
    loading,
    fetchBookings,
    handleRegisteration,
    cancelBooking
  };
}
