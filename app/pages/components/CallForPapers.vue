<script setup lang="ts">
import { ArrowRight, BookOpen, CheckCircle, Download, ExternalLink } from 'lucide-vue-next';

import { type PaperTemplate } from "~~/shared/schemas/workshop"
defineProps<{
  paperTempaltes: PaperTemplate[]
  cmtLink: string
  paperRequirementLink: string
}>()

const steps = [
  { step: 1, text: 'Register on CMT' },
  { step: 2, text: 'Upload PDF + supplementary' },
  { step: 3, text: 'Respond to reviewer questions' },
]

const topics = [
  'Development of digital twins using medical imaging data.',
  'Integrating imaging and non-imaging data for dynamic digital twins.',
  'Computational modeling of specific diseases (e.g., cardiovascular, neurology, oncology, pulmonology oncology, etc)',
  'AI techniques for digital twin efficiency and accuracy.',
  'Validation and deployment challenges for digital twins in clinical practice.',
]
</script>

<template>
  <section id="call-for-papers" class="section-light py-24 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="text-[20vw] font-['Space_Grotesk'] font-bold text-[#0B0C0F] opacity-[0.02]">
        SUBMIT
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0B0C0F] mb-6">
        call for Papers
      </h2>
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="reveal-left">
          <p class="text-[#4B5563] mb-4 leading-relaxed">
            We invite 8-page submissions (including figures) with up to 2 pages for references.
            Double-blind review; Springer LNCS proceedings.
          </p>
          <h3 class="font-['Space_Grotesk'] font-semibold text-lg text-[#0B0C0F] mb-4">
            Topics
          </h3>
          <div class="space-y-4 mb-4">
            <div v-for="item in topics" class="flex items-center gap-3">
              <CheckCircle class="text-[#1E6EF1] shrink-0" :size="20" />
              <span class="text-[#0B0C0F]">{{ item }}</span>
            </div>
          </div>
          <NuxtLink :to="paperRequirementLink" class="flex items-center gap-1 text-[#1E6EF1] ml-1">
            More details
            <ArrowRight :size="16" />
          </NuxtLink>
        </div>

        <div class="reveal-right space-y-6">
          <div class="card-light p-6">
            <h3 class="font-['Space_Grotesk'] font-semibold text-lg text-[#0B0C0F] mb-4">
              Submission Steps
            </h3>
            <div class="space-y-4">
              <div v-for="item in steps" class="flex items-center gap-4">
                <div
                  class="w-8 h-8 rounded-full bg-[#1E6EF1] text-white flex items-center justify-center font-semibold text-sm">
                  {{ item.step }}
                </div>
                <span class="text-[#4B5563]">{{ item.text }}</span>
              </div>
            </div>
          </div>

          <div class="card-light p-6">
            <h3 class="font-['Space_Grotesk'] font-semibold text-lg text-[#0B0C0F] mb-4">
              Templates & Links
            </h3>
            <div class="flex flex-wrap gap-3">
              <a v-for="template in paperTempaltes" :href="template.link" download
                class="btn-secondary-light flex items-center gap-2 text-sm">
                <Download :size="16" />{{ template.label }}
              </a>
              <a :href="cmtLink" target="_blank" rel="noopener noreferrer"
                class="btn-primary flex items-center gap-2 text-sm">
                <ExternalLink :size="16" /> Open CMT
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>