<template>
  <div class="grid gap-4 self-center">
    <div class="card-css rounded-lg lg:h-64 overflow-hidden">
      <img
        class="h-full w-full object-cover"
        :src="selectedImage"
        alt=""
        @mousemove="handleMouseMove"
        @mouseleave="zoom = false"
      />
      <div
        class="absolute w-24 h-24 border border-black rounded-full cursor-none pointer-events-none bg-no-repeat"
        v-if="zoom"
        :style="{
          top: `${y}px`,
          left: `${x}px`,
          backgroundImage: `url(${selectedImage})`,
          backgroundPosition: `${bgX}% ${bgY}%`,
          backgroundSize: `${width * scale}px ${height * scale * 1.5}px`,
        }"
      ></div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div
        class="card-css rounded-lg group relative"
        v-for="(image, index) in images"
        :key="index"
      >
        <img class="h-auto max-w-full rounded-lg" :src="image" alt="" />
        <div
          @click="image !== selectedImage ? selectImage(image) : null"
          class="overlay absolute left-0 top-0 h-full w-full cursor-pointer bg-gray-500 bg-opacity-50 group-hover:block"
          :class="{
            'bg-gray-500': image === selectedImage,
            hidden: image !== selectedImage,
          }"
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
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
      images: [
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
      ],
      zoom: false,
      bgX: 0,
      bgY: 0,
      width: 0,
      height: 0,
      scale: 2, // Change this to adjust the zoom level
    };
  },
  methods: {
    selectImage(image) {
      this.selectedImage = image;
    },
    handleMouseMove(e) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const scale = 1.5; // Change this to adjust the zoom level

      // Calculate the mouse position relative to the image
      const x = e.pageX - left;
      const y = e.pageY - top;

      // Calculate the background position for the magnifier
      const bgX = (x / width) * 100;
      const bgY = (y / height) * 100;

      this.zoom = true;
      this.x = e.pageX - 48;
      this.y = e.pageY - 48;
      this.bgX = bgX;
      this.bgY = bgY;
      this.width = width;
      this.height = height;
      this.scale = scale;
    },
  },
};
</script>
