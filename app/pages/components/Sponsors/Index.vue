<script setup lang="ts">
import type { SponsorList } from '~~/shared/schemas/workshop';
import Sponsor from './Sponsor.vue';

const props = defineProps<{
  sponsors: SponsorList
}>()

const sponsorItems = computed(() => [
  ...(props.sponsors.platinum ?? []),
  ...(props.sponsors.gold ?? []),
  ...(props.sponsors.supporting ?? []),
])
</script>

<template>
  <section id="sponsors" class="section-light py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1E6EF1]/[0.02] rounded-full blur-[120px]" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="reveal text-center mb-14">
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#0B0C0F] leading-tight">
          Sponsors
        </h2>
      </div>

      <div v-if="sponsorItems.length" class="reveal flex flex-wrap justify-center items-center gap-6">
        <Sponsor v-for="sponsor in sponsorItems" :key="sponsor.name" :sponsor="sponsor" />
      </div>
    </div>
  </section>
</template>
