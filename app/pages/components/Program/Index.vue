<script setup lang="ts">
import type { ProgramList } from '~~/shared/schemas/workshop'

defineProps<{
  data: ProgramList
}>()
</script>

<template>
  <section id="program"
    class="section-light scroll-mt-20 bg-[#F7F9FD] py-24 md:py-28 px-[8vw] relative overflow-hidden"
    aria-labelledby="program-heading">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 -right-32 w-[460px] h-[460px] bg-[#1E6EF1]/[0.05] rounded-full blur-[150px]" />
      <div class="absolute bottom-1/4 -left-32 w-[420px] h-[420px] bg-[#60A5FA]/[0.04] rounded-full blur-[140px]" />
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="reveal mb-12 md:mb-14 text-center">
        <h2 id="program-heading"
          class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#0B0C0F] leading-tight">
          Workshop Program
        </h2>
        <p class="mt-4 text-[#6B7280] text-base md:text-lg">
          {{ data.date }} · {{ data.venue }}<template v-if="data.room"> · {{ data.room }}</template>
        </p>
      </div>

      <ol class="card-light overflow-hidden mb-10">
        <li v-for="item in data.schedule" :key="`${item.time}-${item.activity}`"
          class="grid md:grid-cols-[150px_1fr] gap-3 md:gap-6 p-5 md:p-6 border-b border-[rgba(11,12,15,0.07)] last:border-b-0">
          <time class="font-mono-label text-[#1E6EF1] pt-1">{{ item.time }}</time>
          <div>
            <h3 class="font-['Inter'] text-lg font-semibold text-[#0B0C0F] leading-snug">
              {{ item.activity }}
            </h3>
            <p v-if="item.speaker" class="font-['Inter'] mt-1 text-[#374151] font-medium">
              {{ item.speaker }}
            </p>
            <p v-if="item.talkTitle" class="font-['Inter'] mt-1 text-sm md:text-base text-[#6B7280] leading-relaxed">
              {{ item.talkTitle }}
            </p>
            <p v-if="item.detail" class="font-['Inter'] mt-1 text-sm text-[#6B7280]">
              {{ item.detail }}
            </p>
          </div>
        </li>
      </ol>

      <div class="grid lg:grid-cols-2 gap-6">
        <article v-for="session in data.oralSessions" :key="session.title" class="card-light p-5 md:p-7">
          <div class="pb-5 mb-5 border-b border-[rgba(11,12,15,0.07)]">
            <div class="font-mono-label text-[#1E6EF1] mb-2">{{ session.time }}</div>
            <h3 class="font-['Space_Grotesk'] text-2xl font-semibold text-[#0B0C0F]">
              {{ session.title }}
            </h3>
            <p class="font-['Inter'] mt-2 text-sm text-[#6B7280]">Session Chair: {{ session.chair }}</p>
          </div>

          <ol class="space-y-5">
            <li v-for="presentation in session.presentations" :key="presentation.title"
              class="grid grid-cols-[28px_1fr] gap-3">
              <span aria-hidden="true"
                class="w-7 h-7 rounded-lg bg-[#1E6EF1]/10 text-[#1E6EF1] text-xs font-semibold flex items-center justify-center">
                {{ presentation.number }}
              </span>
              <div>
                <p class="font-['Inter'] font-semibold text-[#0B0C0F] leading-snug">
                  {{ presentation.presenter }}
                  <span class="font-normal text-[#6B7280]">({{ presentation.affiliation }})</span>
                </p>
                <p class="font-['Inter'] mt-1 text-sm text-[#6B7280] leading-relaxed">
                  {{ presentation.title }}
                </p>
              </div>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>
</template>
