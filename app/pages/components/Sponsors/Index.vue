<script setup lang="ts">
import type { SponsorList } from '~~/shared/schemas/workshop';



defineProps<{
  sponsors: SponsorList
}>()
</script>

<template>
  <section id="sponsors" class="section-light py-24 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <div class="reveal text-center mb-16">
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0B0C0F]">
          Sponsors
        </h2>
        <p class="text-[#6B7280] mt-4">
          Supported by leading organizations in healthcare technology
        </p>
      </div>

      <div class="space-y-12">
        <div class="reveal" v-if="sponsors.platinum?.length">
          <div class="font-mono-label text-center text-[#1E6EF1] mb-6">Platinum</div>
          <div class="flex justify-center items-center flex-wrap gap-4">
            <Sponsor v-for="sponsor in sponsors.platinum" :sponsor="sponsor" />
          </div>
        </div>

        <div class="reveal" :style="{ transitionDelay: '0.1s' }" v-if="sponsors.gold?.length">
          <div class="font-mono-label text-center text-[#1E6EF1] mb-6">Gold</div>
          <div class="flex flex-wrap justify-center items-center gap-4">
            <Sponsor v-for="sponsor in sponsors.gold" :sponsor="sponsor" />
          </div>
        </div>

        <div class="reveal" :style="{ transitionDelay: '0.2s' }" v-if="sponsors.supporting?.length">
          <div class="font-mono-label text-center text-[#1E6EF1] mb-6">Supporting</div>
          <div class="flex flex-wrap justify-center items-center gap-4">
            <Sponsor v-for="sponsor in sponsors.supporting" :sponsor="sponsor" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>