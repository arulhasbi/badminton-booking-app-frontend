<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else-if="!data">Loading...</div>
  <div v-else class="border border-gray-300 rounded">
    <div class="relative overflow-x-auto shadow-sm rounded">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr
            v-for="(list, listIndex) in columns"
            :key="listIndex"
            :class="`border-b border-gray-200 dark:border-gray-700 ${
              listIndex % 2 === 0 ? 'bg-gray-50' : ''
            }`"
          >
            <td
              v-for="item in list"
              :key="item._id"
              class="text-sm cursor-pointer text-center px-2 py-4 active:bg-green-500"
              :class="{
                'hover:bg-green-200': !isSelected(item._id),
                'bg-green-200': isSelected(item._id),
              }"
              @click="selectCell({ _id: item._id, hourRange: item.hourRange })"
            >
              {{ item.hourRange }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="selectedIds.length > 0"
        class="py-4 px-8 bg-white flex justify-between items-center"
      >
        <button
          type="button"
          class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600"
          @click="book"
        >
          <span> Booking lapangan </span>
          <img
            src="~/assets/icons/badminton-player.svg"
            class="h-6 w-6 ml-3"
            alt="Icon description"
          />
        </button>
        <span
          class="text-sm text-blue-500 hover:cursor-pointer hover:underline"
          @click="removeAllSelectedIds"
        >
          Batalkan semua pilihan
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  setup(_, { emit }) {
    const { data, error } = useFetch("http://localhost:8080/time-slots");
    const selectedIds = ref([]);
    const columns = computed(() => {
      if (data.value) {
        let result = [];
        const columnSize = Math.ceil(data.value.length / 4);
        for (let i = 0; i < data.value.length; i += columnSize) {
          result.push(data.value.slice(i, i + columnSize));
        }
        return result;
      }
    });
    const gapExists = (range1, range2) => {
      // Extract end time of the first range and start time of the second range
      const endTimeRange1 = range1.split(" - ")[1];
      const startTimeRange2 = range2.split(" - ")[0];

      // Convert times to Date objects for comparison
      const endTimeDate = new Date(`1970-01-01T${endTimeRange1}:00`);
      const startTimeDate = new Date(`1970-01-01T${startTimeRange2}:00`);

      // If the start time of the second range is later than the end time of the first range, a gap exists
      return startTimeDate.getTime() > endTimeDate.getTime();
    };

    const getSlotsToFill = (range1, range2) => {
      // Extract end time of the first range and start time of the second range
      const endTimeRange1 = range1.split(" - ")[1];
      const startTimeRange2 = range2.split(" - ")[0];

      // // Convert times to Date objects for comparison
      const endTimeDate = new Date(`1970-01-01T${endTimeRange1}:00Z`);
      const startTimeDate = new Date(`1970-01-01T${startTimeRange2}:00Z`);

      // // Get all possible time slots
      const allSlots = data.value.map((item) => item.hourRange);

      // Filter the slots that fall between the end time of the first range and the start time of the second range
      const slotsToFill = allSlots.filter((range) => {
        const rangeStartTime = new Date(
          `1970-01-01T${range.split(" - ")[0]}:00Z`
        );
        const rangeEndTime = new Date(
          `1970-01-01T${range.split(" - ")[1]}:00Z`
        );
        return rangeEndTime > endTimeDate && rangeStartTime < startTimeDate;
      });

      return slotsToFill;
    };
    const selectCell = (payload) => {
      if (selectedIds.value.includes(payload._id)) {
        selectedIds.value = selectedIds.value.filter(
          (id) => payload._id !== id
        );
      } else {
        selectedIds.value = [...selectedIds.value, payload._id];
      }
      // Sort selectedIds based on time
      selectedIds.value.sort((a, b) => {
        const aSlot = data.value.find((item) => item._id === a);
        const bSlot = data.value.find((item) => item._id === b);
        return aSlot.hourRange.localeCompare(bSlot.hourRange);
      });
      // Check for gaps and fill them
      for (let i = 1; i < selectedIds.value.length; i++) {
        const prevSlot = data.value.find(
          (item) => item._id === selectedIds.value[i - 1]
        );
        const currSlot = data.value.find(
          (item) => item._id === selectedIds.value[i]
        );
        if (gapExists(prevSlot.hourRange, currSlot.hourRange)) {
          const slotsToFill = getSlotsToFill(
            prevSlot.hourRange,
            currSlot.hourRange
          );
          slotsToFill.forEach((slot) => {
            const slotToFill = data.value.find(
              (item) => item.hourRange === slot
            );
            if (slotToFill && !selectedIds.value.includes(slotToFill._id)) {
              selectedIds.value.push(slotToFill._id);
            }
          });
        }
      }
    };
    const isSelected = (id) => {
      return selectedIds.value.includes(id);
    };
    const removeAllSelectedIds = () => {
      selectedIds.value = [];
    };
    const book = () => {
      const selectedHourRanges = data.value.filter((item) =>
        selectedIds.value.includes(item._id)
      );
      emit("booked", selectedHourRanges);
    };
    return {
      data,
      error,
      columns,
      selectCell,
      isSelected,
      selectedIds,
      removeAllSelectedIds,
      book,
    };
  },
});
</script>
