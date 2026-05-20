<script setup lang="ts">
import type { Keynote } from '~~/shared/schemas/workshop'
import KeynoteCard from './KeynoteCard.vue'

defineProps<{
  keynotes: Keynote[]
  year: number
}>()
</script>

<template>
  <section id="keynotes" class="section-light py-24 md:py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 -left-32 w-[420px] h-[420px] bg-[#1E6EF1]/[0.05] rounded-full blur-[140px]" />
      <div class="absolute bottom-1/4 -right-32 w-[420px] h-[420px] bg-[#60A5FA]/[0.04] rounded-full blur-[140px]" />
    </div>

    <div class="max-w-5xl mx-auto relative z-10">
      <div class="reveal mb-12 md:mb-14 text-center">
        <div class="flex items-center justify-center gap-3 mb-5">
          <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1E6EF1]/30"></div>
          <div class="font-mono-label text-[#1E6EF1]">Programme</div>
          <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1E6EF1]/30"></div>
        </div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#0B0C0F] leading-tight">
          Keynote Speakers
        </h2>
      </div>

      <div class="space-y-6 stagger-children">
        <KeynoteCard v-for="(keynote, i) in keynotes" :key="keynote.name" :keynote="keynote" :index="i" :year="year" />
      </div>
    </div>
  </section>
</template>
