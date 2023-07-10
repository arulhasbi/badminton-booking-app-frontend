<template>
  <div class="mt-3">
    <VueDatePicker
      v-model="date"
      placeholder="Pilih tanggal boking"
      :min-date="new Date()"
      :enable-time-picker="false"
      hide-offset-dates
      auto-apply
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
  setup() {
    const date = ref();

    return {
      date,
    };
  },
};
</script>
