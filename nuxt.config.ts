import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      activeYear: 0, //  config active year in enviornment variable.
    },
  },
  nitro: {
    storage: {
      data: {
        driver: "fs",
        base: "./server/assets/data", // 映射到物理路径
      },
    },
  },
});
