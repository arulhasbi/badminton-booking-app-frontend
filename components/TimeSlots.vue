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
    const selectCell = (payload) => {
      if (selectedIds.value.includes(payload._id)) {
        selectedIds.value = selectedIds.value.filter(
          (id) => payload._id !== id
        );
      } else {
        selectedIds.value = [...selectedIds.value, payload._id];
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
