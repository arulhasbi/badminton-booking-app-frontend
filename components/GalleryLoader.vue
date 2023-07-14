<template>
  <div class="grid gap-4 self-start">
    <div class="card-css rounded overflow-hidden">
      <div class="w-full h-48 bg-slate-300 group relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-purple-500"
          ></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="index in 5"
        :key="index"
        class="h-20 card-css rounded group relative bg-slate-300"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-purple-500"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
;
