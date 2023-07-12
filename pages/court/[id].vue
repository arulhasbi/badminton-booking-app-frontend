<template>
  <Breadcrumbs />
  <div v-if="courtError">{{ error.message }}</div>
  <div v-else-if="!courtData">Loading...</div>
  <div v-else class="container mx-auto px-5">
    <div class="gallery">
      <div class="grid gap-4 self-center">
        <div class="card-css rounded-lg">
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
            alt=""
          />
        </div>
        <div class="grid grid-cols-5 gap-4">
          <div class="card-css rounded-lg">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              alt=""
            />
          </div>
          <div class="card-css rounded-lg">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
            />
          </div>
          <div class="card-css rounded-lg">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div class="card-css rounded-lg">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
          </div>
          <div class="card-css rounded-lg">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="court-info">
        <div class="court-info-header px-5 py-5 rounded">
          <h2 class="text-xl mb-2 font-medium">{{ courtData.name }}</h2>
          <div class="badges flex">
            <span
              class="bg-yellow-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
            >
              <img
                class="w-3 h-3 mr-1"
                src="~/assets/icons/price-tag-svgrepo-com.svg"
                alt="Price Tag"
              />
              {{ formatCurrency(courtData.rate) }} / Jam
            </span>
            <span
              class="bg-pink-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
            >
              <img
                class="w-3 h-3 mr-1"
                src="~/assets/icons/phone-rounded-svgrepo-com.svg"
                alt="Price Tag"
              />
              {{ courtData.phoneNumber }}
            </span>
          </div>
        </div>
        <!-- <div class="court-info-location">
          <button
            type="button"
            class="hover:bg-gray-50 w-full text-gray-900 text-sm text-center flex items-center dark:focus:ring-gray-500 mr-2 bg-white px-5 py-1 mt-2 border border-gray-200 flex flex-row justify-between items-center rounded dark:bg-gray-700 dark:border-gray-500"
          >
            <div class="flex justify-center items-center">
              <img
                class="w-5 h-5 mr-5 -ml-1"
                src="~/assets/icons/google-maps-old-svgrepo-com.svg"
                alt="Google Map"
              />
              <span class="text-sm">Lihat lokasi di Google Map</span>
            </div>
            <img
              class="w-7 h-7 -ml-1"
              src="~/assets/icons/right-arrow-svgrepo-com.svg"
              alt="Google Map"
            />
          </button>
        </div> -->
        <div class="court-info-schedule">
          <div>
            <DatePicker
              @dateHasBeenSelected="handleDateSelection"
              @dateHasBeenCleared="handleDateCleared"
            />
          </div>
        </div>
        <div class="court-info-arena mt-3">
          <div v-if="arenasError">{{ error.message }}</div>
          <div v-else-if="!arenasData">Loading...</div>
          <Dropdown
            v-else
            :items="arenasData"
            @itemHasBeenSelected="handleArenaSelection"
            @itemHasBeenCleared="handleArenaCleared"
            :clearFlag="clearFlag"
            :disabled="!bookData.date"
          />
          <div v-if="arenaHasBeenSelected" class="mt-3">
            <TimeSlots @booked="handleBookingProcess" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const clearFlag = ref(false);
    const arenaHasBeenSelected = ref(false);
    const bookData = ref({
      arena: {},
      date: "",
      time_slots: [],
    });
    const { data: courtData, error: courtError } = useFetch(
      `http://localhost:8080/courts/${route.params.id}`
    );
    const { data: arenasData, error: arenasError } = useFetch(
      `http://localhost:8080/arenas/${route.params.id}`
    );
    // arena events
    const handleArenaCleared = () => {
      bookData.value.arena = {};
      bookData.value.time_slots = [];
      arenaHasBeenSelected.value = false;
    };
    const handleArenaSelection = (payload) => {
      bookData.value.arena = payload;
      arenaHasBeenSelected.value = true;
    };
    // date events
    const handleDateSelection = (payload) => {
      bookData.value.date = payload.date;
    };
    const handleDateCleared = () => {
      bookData.value.date = "";
      bookData.value.arena = {};
      bookData.value.time_slots = [];
      arenaHasBeenSelected.value = false;
      clearFlag.value = !clearFlag.value;
    };
    const handleBookingProcess = (payload) => {
      // payload contains selected time slots
      bookData.value.time_slots = payload;
    };

    return {
      courtData,
      courtError,
      arenasData,
      arenasError,
      arenaHasBeenSelected,
      handleBookingProcess,
      handleArenaCleared,
      handleArenaSelection,
      handleDateSelection,
      handleDateCleared,
      clearFlag,
      bookData,
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
};
</script>
