import { useUserOnBoardingStore } from "~/store/userOnBoarding";

export default function (to, from) {
  const userOnBoardingStore = useUserOnBoardingStore();
  if (
    to.path.startsWith("/check-email") ||
    to.path.startsWith("/verified-email") ||
    to.path.startsWith("/verification-failed")
  ) {
    if (!userOnBoardingStore.justRegistered) {
      return navigateTo("/login");
    } else {
      userOnBoardingStore.setJustRegistered(false);
    }
  }
}
