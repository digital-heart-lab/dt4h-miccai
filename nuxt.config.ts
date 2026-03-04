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
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      wrangler: {
        d1_databases: [
          {
            binding: "DB",
            database_name: "dt4h",
            database_id: "b78f8226-fec1-422e-8108-16183be35790",
          },
        ],
      },
    },
  },
});
