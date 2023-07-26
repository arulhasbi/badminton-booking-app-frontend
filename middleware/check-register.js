import { userAuthStore } from "~/store/auth";

export default function (to, from) {
  const authStore = userAuthStore();
  if (to.path.startsWith("/check-email")) {
    if (!authStore.justRegistered) {
      return navigateTo("/login");
    } else {
      authStore.setJustRegistered(false);
    }
  }
}
