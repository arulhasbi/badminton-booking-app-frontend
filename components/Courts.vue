<template>
  <div class="container mx-auto px-5">
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="!courts">Loading...</div>
    <div v-else>
      <div class="cards-css">
        <div
          v-for="item in courts"
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
            <button
              type="button"
              @click="
                goToCourtLocation({ name: item.name, address: item.location })
              "
            >
              <img
                class="w-10 h-10 mr-2 -ml-1 transform hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease-in-out"
                src="~/assets/icons/google-maps-old-svgrepo-com.svg"
                alt="Google Map"
              />
            </button>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" class="flex justify-center mt-6">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <a
              type="button"
              @click="prevPage"
              :disabled="page <= 1"
              class="hover:cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Sebelumnya</a
            >
          </li>
          <li v-for="index in totalPages" :key="index">
            <a
              @click="clickPage(index)"
              :class="{
                'bg-slate-100': page === index,
                'bg-white': page !== index,
              }"
              class="hover:cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >{{ index }}</a
            >
          </li>
          <li>
            <a
              type="button"
              @click="nextPage"
              :disabled="page >= totalPages"
              class="hover:cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Selanjutnya</a
            >
          </li>
        </ul>
      </nav>
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
  data() {
    return {
      error: null,
      courts: [],
      page: 1,
      totalPages: 0,
    };
  },
  created() {
    this.fetchCourts();
  },
  watch: {
    page: {
      handler() {
        this.fetchCourts();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchCourts() {
      try {
        const response = await fetch(
          `http://localhost:8080/courts?page=${this.page}&limit=6`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch courts data");
        }
        const data = await response.json();
        this.courts = data.data;
        this.totalPages = data.pages;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    },
    goToCourtLocation(location) {
      let name = location.name.replace(/ /g, "+");
      let address = location.address.replace(/ /g, "+");
      let url =
        "https://www.google.com/maps/search/?api=1&query=" +
        name +
        "," +
        address;
      window.open(url, "_blank");
    },
    clickPage(page) {
      this.page = page;
    },
    prevPage() {
      if (this.page > 1) this.page -= 1;
    },
    nextPage() {
      if (this.page < this.totalPages) this.page += 1;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
  setup() {
    const swiper = ref(null);
    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance;
    };
    return {
      onSwiper,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
});
</script>

<style scoped>
.swiper-cards {
  width: 100%;
  height: 100%;
}
</style>
