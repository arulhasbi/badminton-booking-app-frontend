<template>
  <Login />
  <NuxtPage />
</template>

<script setup>
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
