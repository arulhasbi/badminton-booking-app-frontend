<template>
  <UserOnBoarding />
  <Breadcrumbs />
  <div v-if="courtError">{{ error.message }}</div>
  <div v-else-if="!courtData">Loading...</div>
  <div v-else class="container mx-auto px-5 flex flex-col flex-1">
    <div class="court flex-1">
      <Gallery :images="courtData.imageUrl" />
      <div class="court-info">
        <div class="court-info-header pb-5 rounded">
          <h2 class="text-xl mb-2 font-medium">{{ courtData.name }}</h2>
          <div class="badges flex">
            <span
              class="bg-green-300 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
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
                alt="Phone Number"
              />
              {{ courtData.phoneNumber }}
            </span>
            <button
              type="button"
              @click="
                goToCourtLocation({
                  name: courtData.name,
                  address: courtData.location,
                })
              "
            >
              <img
                class="w-7 h-7 transform hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease-in-out"
                src="~/assets/icons/google-maps-old-svgrepo-com.svg"
                alt="Google Map"
              />
            </button>
          </div>
        </div>
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
            <TimeSlots
              :ratePerHour="courtData.rate"
              @booked="handleBookingProcess"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookingStore } from "~/store/booking";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const bookingStore = useBookingStore();
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
      bookingStore.setBookingData(bookData.value);
      bookingStore.setCourtId(route.params.id);
      const courtInfo = {
        name: courtData.value.name,
        description: courtData.value.description,
        rate: courtData.value.rate,
        phoneNumber: courtData.value.phoneNumber,
      };
      bookingStore.setCourtInfo(courtInfo);
      sessionStorage.setItem("bookingData", JSON.stringify(bookData.value));
      sessionStorage.setItem("courtId", route.params.id);
      sessionStorage.setItem("courtInfo", JSON.stringify(courtInfo));
      // direct user to checkout page
      router.push({ name: "court-checkout" });
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
