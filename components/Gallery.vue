<template>
  <div class="grid gap-4 self-center">
    <div class="card-css rounded-lg lg:h-64 overflow-hidden">
      <img class="h-full w-full object-cover" :src="selectedImage" alt="" />
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div
        class="card-css rounded-lg group relative"
        v-for="(image, index) in images"
        :key="index"
      >
        <img class="h-auto max-w-full rounded-lg" :src="image" alt="" />
        <div
          @click="selectImage(image)"
          class="overlay absolute left-0 top-0 hidden h-full w-full cursor-pointer bg-gray-500 bg-opacity-50 group-hover:block"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage:
        "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
      images: [
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
      ],
    };
  },
  methods: {
    selectImage(image) {
      this.selectedImage = image;
    },
  },
};
</script>
