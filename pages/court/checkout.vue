<template>
  <p>Checkout page</p>
</template>

<script>
import { useBookingStore } from "~/store/booking";
export default {
  setup() {
    const bookingStore = useBookingStore();

    // Access the data
    const bookingData = bookingStore.bookingData;
    const courtId = bookingStore.courtId;

    console.log(bookingData);
    console.log(courtId);
  },
};
</script>
