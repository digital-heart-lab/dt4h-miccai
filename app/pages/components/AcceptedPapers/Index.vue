<script setup lang="ts">
import type { AcceptedPaper } from '~~/shared/schemas/workshop'

defineProps<{
  papers: AcceptedPaper[]
  year: number
}>()
</script>

<template>
  <section id="accepted-papers"
    class="section-light scroll-mt-20 bg-[#F7F9FD] py-14 md:py-16 px-[8vw]"
    aria-labelledby="accepted-papers-heading">
    <div class="max-w-7xl mx-auto">
      <div class="mb-7 md:mb-8 md:flex md:items-end md:justify-between md:gap-8">
        <h2 id="accepted-papers-heading"
          class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0B0C0F] leading-tight">
          Accepted Papers
        </h2>
        <p class="mt-2 md:mt-0 text-sm text-[#6B7280] md:pb-1">
          {{ papers.length }} papers accepted for DT4H {{ year }}
        </p>
      </div>

      <ol class="border-t border-[rgba(11,12,15,0.12)]">
        <li v-for="(paper, index) in papers" :key="paper.title"
          class="grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr] gap-3 md:gap-4 py-5 md:py-6 border-b border-[rgba(11,12,15,0.1)]">
          <span aria-hidden="true"
            class="font-mono-label text-xs text-[#1E6EF1] pt-1">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <article class="min-w-0">
            <h3 class="font-['Inter'] text-base font-semibold text-[#0B0C0F] leading-snug">
              {{ paper.title }}
            </h3>
            <p class="font-['Inter'] mt-1.5 text-sm text-[#6B7280] leading-relaxed">
              {{ paper.authors }}
            </p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
