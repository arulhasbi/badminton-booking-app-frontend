import { userAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = userAuthStore();
  if (authStore.isAuthenticated) {
    return navigateTo("/");
  }
});
