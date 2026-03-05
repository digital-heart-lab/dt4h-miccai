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
      activeYear: 2026,
    },
  },
  content: {
    database: {
      type: "d1",
      bindingName: "DB",
    },
  },
  nitro: {
    preset: "cloudflare_pages",
  },
});
