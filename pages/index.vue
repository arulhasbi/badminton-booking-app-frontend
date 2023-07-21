<template>
  <div class="container mx-auto px-5 mb-3 flex items-end">
    <button type="button" class="amazon-button-css px-5 py-2.5 text-sm">
      <NuxtLink :to="`/login`">Masuk</NuxtLink>
      <!-- <img
        class="w-4 h-4 ml-2"
        src="~/assets/icons/google-color-svgrepo-com.svg"
        alt="Google Sign In Logo"
      /> -->
    </button>
  </div>
  <Breadcrumbs />
  <main>
    <Courts />
  </main>
</template>
