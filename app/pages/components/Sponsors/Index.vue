<script setup lang="ts">
import type { SponsorList } from '~~/shared/schemas/workshop';
import Sponsor from './Sponsor.vue';



defineProps<{
  sponsors: SponsorList
}>()
</script>

<template>
  <section id="sponsors" class="section-light py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1E6EF1]/[0.02] rounded-full blur-[120px]" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="reveal text-center mb-20">
        <div class="flex items-center justify-center gap-3 mb-5">
          <div class="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <div class="font-mono-label text-[#1E6EF1]">Partners</div>
          <div class="w-8 h-[2px] bg-gradient-to-l from-transparent via-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
        </div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#0B0C0F] leading-tight">
          Sponsors
        </h2>
      </div>

      <div class="space-y-16">
        <div class="reveal" v-if="sponsors.platinum?.length">
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1E6EF1]/30"></div>
            <div
              class="font-mono-label text-center text-[#1E6EF1] px-4 py-1.5 rounded-full bg-[#1E6EF1]/5 border border-[#1E6EF1]/10">
              Platinum</div>
            <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1E6EF1]/30"></div>
          </div>
          <div class="flex justify-center items-center flex-wrap gap-8">
            <Sponsor v-for="sponsor in sponsors.platinum" :sponsor="sponsor" tier="platinum" />
          </div>
        </div>

        <div class="reveal" :style="{ transitionDelay: '0.1s' }" v-if="sponsors.gold?.length">
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1E6EF1]/20"></div>
            <div
              class="font-mono-label text-center text-[#1E6EF1] px-4 py-1.5 rounded-full bg-[#1E6EF1]/5 border border-[#1E6EF1]/10">
              Gold</div>
            <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1E6EF1]/20"></div>
          </div>
          <div class="flex flex-wrap justify-center items-center gap-6">
            <Sponsor v-for="sponsor in sponsors.gold" :sponsor="sponsor" tier="gold" />
          </div>
        </div>

        <div class="reveal" :style="{ transitionDelay: '0.2s' }" v-if="sponsors.supporting?.length">
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1E6EF1]/15"></div>
            <div
              class="font-mono-label text-center text-[#1E6EF1] px-4 py-1.5 rounded-full bg-[#1E6EF1]/5 border border-[#1E6EF1]/10">
              Supporting</div>
            <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1E6EF1]/15"></div>
          </div>
          <div class="flex flex-wrap justify-center items-center gap-5">
            <Sponsor v-for="sponsor in sponsors.supporting" :sponsor="sponsor" tier="supporting" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>