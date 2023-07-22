import { defineStore } from "pinia";

export const useUserOnBoardingStore = defineStore({
  id: "userOnBoarding",
  state: () => ({
    justRegistered: false,
  }),
  actions: {
    setJustRegistered(value) {
      this.justRegistered = value;
    },
  },
});
