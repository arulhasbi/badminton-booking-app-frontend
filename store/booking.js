import { defineStore } from "pinia";

export const useBookingStore = defineStore({
  id: "booking",
  state: () => ({
    bookingData: null,
    courtId: null,
  }),
  actions: {
    setBookingData(data) {
      this.bookingData = data;
    },
    setCourtId(id) {
      this.courtId = id;
    },
  },
});
