<template>
  <div class="container mx-auto px-5">
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="!data">Loading...</div>
    <div v-else>
      <span class="text-sm">Menampilkan <u>6</u> dari <b>20</b> lapangan</span>
      <div class="mt-3 cards-css">
        <div
          v-for="item in data"
          :key="item._id"
          class="border rounded overflow-hidden px-4 card-css"
        >
          <div class="card-header stretched-out bg-white p-4">
            <h2 class="text-base mb-2">{{ item.name }}</h2>
            <div class="badges flex">
              <span
                class="bg-yellow-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="~/assets/icons/price-tag-svgrepo-com.svg"
                  alt="Price Tag"
                />
                {{ formatCurrency(item.rate) }} / Jam
              </span>
              <span
                class="bg-pink-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                <img
                  class="w-3 h-3 mr-1"
                  src="~/assets/icons/phone-rounded-svgrepo-com.svg"
                  alt="Price Tag"
                />
                {{ item.phoneNumber }}
              </span>
            </div>
          </div>
          <div class="stretched-out swiper-box">
            <swiper
              :modules="modules"
              :slides-per-view="1"
              :space-between="0"
              navigation
              :scrollbar="{ draggable: true }"
              @swiper="onSwiper"
            >
              <swiper-slide
                v-slot="{ isActive }"
                v-for="(image, imageIndex) in item.imageUrl"
                :key="imageIndex"
              >
                <img :src="image" alt="Court image" />
              </swiper-slide>
            </swiper>
          </div>
          <div class="bg-white stretched-out p-4 flex gap-4">
            <NuxtLink :to="`/court/${item._id}`" class="w-full">
              <button
                type="button"
                class="w-full text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 justify-center"
              >
                <img
                  class="w-4 h-4 mr-2 -ml-1"
                  src="~/assets/icons/shuttlecock-svgrepo-com.svg"
                  alt="Shuttlecock Icon"
                />Lihat lapangan
              </button>
            </NuxtLink>
            <button type="button">
              <img
                class="w-10 h-10 mr-2 -ml-1 transform hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease-in-out"
                src="~/assets/icons/google-maps-old-svgrepo-com.svg"
                alt="Google Map"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="flex mt-4">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >Lihat lebih banyak lapangan</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const { data, error } = useFetch("http://localhost:8080/courts");
    const swiper = ref(null);
    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance;
    };
    return {
      data,
      error,
      onSwiper,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
});
</script>

<style scoped>
.swiper-cards {
  width: 100%;
  height: 100%;
}
</style>
