<script setup lang="ts">
import { Calendar } from 'lucide-vue-next';
import type { Event } from "~~/shared/schemas/workshop"

defineProps<{
  dates: Event[]
}>()

</script>
<template>
  <section id="timeline" class="section-dark py-24 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.03]">
      <div class="w-full h-full" :style="{
        backgroundImage: 'linear-gradient(rgba(244,246,251,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,251,0.5) 1px, transparent 1px)'
        , backgroundSize: '60px 60px'
      }"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F4F6FB] mb-4">
        Key Dates
      </h2>
      <div class="grid lg:grid-cols-3 gap-12 items-center">
        <div class="reveal-left">
          <p class="text-[#A6ACB8] mb-6">
            Plan ahead. Submissions are reviewed in a single cycle with tight turnaround.
          </p>
          <button class="btn-secondary flex items-center gap-2 text-sm">
            <Calendar :size="16" /> Add to Calendar
          </button>
        </div>

        <div class="lg:col-span-2">
          <div class="relative">
            <div
              class="absolute top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-[#1E6EF1] via-[#1E6EF1] to-transparent opacity-30">
            </div>

            <div class="grid grid-cols-5 gap-4">
              <div v-for="(item, i) in dates" class="reveal-scale text-center"
                :style="{ transitionDelay: `${i * 0.1}s` }">
                <div class="w-3 h-3 rounded-full bg-[#1E6EF1] mx-auto mb-4 relative z-10 animate-pulse"></div>
                <div class="font-mono-label text-[#1E6EF1] mb-2">{{ item.month }}</div>
                <div class="font-['Space_Grotesk'] font-bold text-xl text-[#F4F6FB] mb-1">
                  {{ item.day }}
                </div>
                <div class="text-xs text-[#A6ACB8]">{{ item.event }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>