<template>
  <div class="container mx-auto px-5 flex items-center flex-col flex-1">
    <div class="relative w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-start justify-between p-4 px-6 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Verifikasi Email
          </h3>
        </div>
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Sebuah tautan verifikasi telah dikirim ke email Anda. Silakan
            periksa email Anda dan klik pada tautan untuk memverifikasi akun
            Anda.
          </p>
        </div>
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="clicker"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Kembali ke halaman utama
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  setup() {
    definePageMeta({
      middleware: ["check-register"],
    });
    const router = useRouter();
    const clicker = () => {
      router.push("/");
    };
    return { clicker };
  },
});
</script>
