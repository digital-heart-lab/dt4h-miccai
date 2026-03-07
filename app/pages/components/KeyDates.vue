<script setup lang="ts">
import { Calendar } from 'lucide-vue-next';
import type { Event } from "~~/shared/schemas/workshop"

defineProps<{
  dates: Event[]
}>()

</script>
<template>
  <section id="timeline" class="section-dark py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.02]">
      <div class="w-full h-full" :style="{
        backgroundImage: 'linear-gradient(rgba(244,246,251,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,251,0.5) 1px, transparent 1px)'
        , backgroundSize: '60px 60px'
      }"></div>
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#1E6EF1]/[0.04] rounded-full blur-[120px]" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-3 gap-16 items-center">
        <div class="reveal-left">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
            <div class="font-mono-label text-[#60A5FA]">Schedule</div>
          </div>
          <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#F4F6FB] mb-5 leading-tight">
            Key Dates
          </h2>
          <p class="text-[#6B7280] text-lg">
            Mark your calendar for important deadlines and workshop dates.
          </p>
        </div>

        <div class="lg:col-span-2">
          <div class="relative">
            <div
              class="absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1E6EF1] via-[#3B82F6] to-[#1E6EF1] opacity-20">
            </div>

            <div class="grid grid-cols-5 gap-4">
              <div v-for="(item, i) in dates" class="reveal-scale text-center group cursor-default"
                :style="{ transitionDelay: `${i * 0.1}s` }">
                <div class="relative mb-6">
                  <div class="w-4 h-4 rounded-full bg-gradient-to-br from-[#1E6EF1] to-[#3B82F6] mx-auto relative z-10 shadow-[0_0_20px_rgba(30,110,241,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
                  <div class="absolute inset-0 w-4 h-4 rounded-full bg-[#1E6EF1] mx-auto animate-ping opacity-20"></div>
                </div>
                <div class="font-mono-label text-base text-[#60A5FA] mb-2 group-hover:text-[#93C5FD] transition-colors duration-300">{{ item.month }}</div>
                <div class="font-['Space_Grotesk'] font-bold text-2xl text-[#F4F6FB] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ item.day }}
                </div>
                <div class="text-xs text-[#6B7280] leading-relaxed">{{ item.event }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>