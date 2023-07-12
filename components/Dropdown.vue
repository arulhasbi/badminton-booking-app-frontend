<template>
  <div class="relative w-full" ref="dropdown">
    <input
      readonly
      class="placeholder:font-sans placeholder:text-gray-400 text-sm border border-gray-300 w-full px-4 py-2 rounded focus:outline-none focus:shadow-outline placeholder:text-xs placeholder:italic custom-pl"
      :class="{
        'bg-green-100': selected,
        'bg-gray-200': disabled,
        'hover:cursor-pointer hover:border-gray-400': !disabled,
        'hover:cursor-default': disabled,
      }"
      @click="!disabled && toggleDropdown()"
      :value="selectedOption"
      placeholder="Pilih arena"
    />
    <img
      src="~/assets/icons/badminton-arena.svg"
      class="absolute left-3 top-3 h-3.5 w-3.5"
      alt="Icon description"
    />
    <span
      v-if="selected"
      class="absolute right-3 top-3 cursor-pointer"
      @click.stop="clearSelection"
      ><img
        src="~/assets/icons/close.svg"
        class="h-4 w-4"
        alt="Icon description"
    /></span>
    <ul
      class="mt-2 rounded bg-white ring-1 ring-black ring-opacity-5 overflow-hidden border border-gray-300"
      v-if="open"
    >
      <li v-for="item in items" :key="item._id">
        <a
          class="text-sm block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
          @click="handleItem({ _id: item._id, arenaCode: item.arenaCode })"
          >Arena - {{ item.arenaCode }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["items", "clearFlag", "disabled"],
  setup(props, { emit }) {
    const open = ref(false);
    const dropdown = ref(null);
    const selectedOption = ref(null);
    const selected = ref(false);

    watch(
      () => props.clearFlag,
      () => {
        selectedOption.value = null;
        selected.value = false;
        open.value = false;
      }
    );

    const toggleDropdown = () => {
      open.value = !open.value;
      if (open.value) {
        document.addEventListener("click", closeDropdown);
      } else {
        document.removeEventListener("click", closeDropdown);
      }
    };

    const closeDropdown = (event) => {
      if (!dropdown.value.contains(event.target)) {
        open.value = false;
        document.removeEventListener("click", closeDropdown);
      }
    };

    const handleItem = (modelData) => {
      selectedOption.value = `Arena - ${modelData.arenaCode}`;
      selected.value = true;
      emit("itemHasBeenSelected", modelData);
      open.value = false;
      document.removeEventListener("click", closeDropdown);
    };

    const clearSelection = () => {
      selectedOption.value = null;
      selected.value = false;
      open.value = false;
      emit("itemHasBeenCleared");
    };

    return {
      open,
      dropdown,
      toggleDropdown,
      handleItem,
      clearSelection,
      selectedOption,
      selected,
    };
  },
};
</script>

<style>
.custom-pl {
  padding-left: 35px;
}
</style>
