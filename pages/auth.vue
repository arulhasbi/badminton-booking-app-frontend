<template>
  <div class="container mx-auto px-5 mb-3">
    <p>{{ loadingText }}</p>
  </div>
</template>

<script>
export default defineComponent({
  setup() {
    const baseText = "Authenticating user, please wait ";
    const loadingText = ref(baseText);
    const loadingDots = ref("");
    const router = useRouter();
    let intervalId;

    const animateLoadingText = () => {
      intervalId = setInterval(() => {
        loadingDots.value += ".";
        if (loadingDots.value.length > 3) loadingDots.value = "";
        loadingText.value = baseText + loadingDots.value;
      }, 100);
    };

    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users/authenticated",
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.isAuthenticated) {
          router.push("/", { isAuthenticated: data.isAuthenticated });
        } else {
          router.push("/", { isAuthenticated: data.isAuthenticated });
        }

        clearInterval(intervalId); // stop the animation
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onMounted(() => {
      animateLoadingText();
      checkAuthentication();
    });

    onUnmounted(() => clearInterval(intervalId));

    return { loadingText };
  },
});
</script>
