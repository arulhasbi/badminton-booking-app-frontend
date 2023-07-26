<template>
  <div class="container mx-auto px-5 mb-3">
    <div class="flex items-end justify-between" v-if="!isAuthenticated">
      <button type="button" class="amazon-button-css px-5 py-2.5 text-sm">
        <NuxtLink :to="`/login`">Login</NuxtLink>
      </button>
      <NuxtLink
        to="/resend-verification"
        class="hover:cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >Akun belum terverifikasi?</NuxtLink
      >
    </div>
    <div v-else class="flex items-end justify-between">
      <button
        @click="logout"
        type="button"
        class="amazon-button-css px-5 py-2.5 text-sm"
      >
        Logout
      </button>
      <span
        >Hi Kak, <b>{{ user.name }}</b></span
      >
    </div>
  </div>
</template>
<script>
import { userAuthStore } from "~/store/auth";

export default defineComponent({
  setup() {
    const authStore = userAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.user);
    const router = useRouter();
    const errorMessage = ref("");
    const logout = async () => {
      try {
        await authStore.logout();
        router.push("/");
      } catch (error) {
        if (error.message) {
          errorMessage.value = error.message;
        } else {
          errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
        }
      }
    };
    return {
      logout,
      errorMessage,
      isAuthenticated,
      user,
    };
  },
});
</script>
