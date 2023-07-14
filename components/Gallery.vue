<template>
  <div class="grid gap-4 self-start">
    <div class="card-css rounded overflow-hidden">
      <img
        class="h-full w-full object-cover"
        :src="selectedImage"
        alt=""
        @mousemove="handleMouseMove"
        @mouseleave="zoom = false"
      />
      <div
        class="absolute w-24 h-24 border border-black rounded-full cursor-none pointer-events-none bg-no-repeat z-[10]"
        v-if="zoom"
        :style="{
          top: `${y}px`,
          left: `${x}px`,
          backgroundImage: `url(${selectedImage})`,
          backgroundPosition: `${bgX}% ${bgY}%`,
          backgroundSize: `${width * scale}px ${height * scale}px`,
        }"
      ></div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div
        class="card-css rounded group relative"
        v-for="(image, index) in images"
        :key="index"
      >
        <img class="h-auto max-w-full" :src="image" alt="" />
        <div
          @click="index !== selectedIndex ? selectImage(index) : null"
          class="overlay absolute left-0 top-0 h-full w-full cursor-pointer bg-gray-500 bg-opacity-50 group-hover:block"
          :class="{
            'bg-gray-500 hover:cursor-default': index === selectedIndex,
            hidden: index !== selectedIndex,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  data() {
    return {
      selectedImage: null,
      selectedIndex: 0,
      preloadedImages: [],
      zoom: false,
      bgX: 0,
      bgY: 0,
      width: 0,
      height: 0,
      scale: 2, // Change this to adjust the zoom level
    };
  },
  created() {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
  },
  mounted() {
    this.preloadImages();
  },
  methods: {
    async selectImage(index) {
      this.selectedImage = this.images[index];
      this.selectedIndex = index;
    },
    preloadImages() {
      this.images.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          this.preloadedImages.push(imageUrl);
        };
      });
    },
    handleMouseMove(e) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const scale = 1.5; // Change this to adjust the zoom level

      // Calculate the mouse position relative to the image
      const x = e.clientX - left;
      const y = e.clientY - top;

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
