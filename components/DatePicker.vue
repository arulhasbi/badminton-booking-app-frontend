<template>
  <div>
    <VueDatePicker
      v-model="date"
      placeholder="Pilih tanggal booking"
      :min-date="new Date()"
      :enable-time-picker="false"
      hide-offset-dates
      auto-apply
      :model-value="date"
      @update:model-value="handleDate"
      @cleared="handleDateCleared"
      input-class-name="custom-text placeholder:text-xs placeholder:italic placeholder:font-sans"
    >
    </VueDatePicker>
  </div>
</template>

<script>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  setup(_, { emit }) {
    const date = ref();
    const handleDate = (modelData) => {
      date.value = modelData;
      emit("dateHasBeenSelected", {
        date: modelData,
      });
    };
    const handleDateCleared = () => {
      date.value = null;
      emit("dateHasBeenCleared");
    };

    return {
      date,
      handleDate,
      handleDateCleared,
    };
  },
};
</script>

<style>
.custom-text {
  font-size: 0.875rem;
}
</style>
