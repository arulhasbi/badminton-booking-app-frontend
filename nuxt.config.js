// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js",
        tagPosition: "bodyClose",
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css",
      },
    ],
  },
});
