import { defineStore } from "pinia";

export const useBookingStore = defineStore({
  id: "booking",
  state: () => ({
    bookingData: null,
    courtId: null,
    courtInfo: null,
  }),
  getters: {
    getBookingData() {
      return this.bookingData;
    },
    getCourtId() {
      return this.courtId;
    },
    getCourtInfo() {
      return this.courtInfo;
    },
  },
  actions: {
    setBookingData(data) {
      this.bookingData = data;
    },
    setCourtId(id) {
      this.courtId = id;
    },
    setCourtInfo(data) {
      this.courtInfo = data;
    },
  },
});
