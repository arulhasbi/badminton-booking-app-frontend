<template>
  <div class="min-h-screen flex flex-col pt-12">
    <Login />
    <div class="flex-1 flex flex-col">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
