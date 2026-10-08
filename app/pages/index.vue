<script setup lang="ts">
import "~/style/app.css"
import Hero from "./components/Hero.vue";
import Topics from "./components/Topics.vue";
import Edition from "./components/Editions/Editions.vue";
useHead({ title: 'DT4H Workshop Series | Digital Twin for Healthcare' })
</script>

<template>
  <Hero />
  <Topics />
  <Edition />
</template>