<script setup lang="ts">
import heroBg from "~/assets/images/hero.jpg"
import { History, FileText, ArrowRight, Award, Calendar, MapPin, ChevronRight, Construction } from "lucide-vue-next";
import type { Workshop } from "~~/shared/schemas/workshop";
const config = useRuntimeConfig()
const activeYear = computed(() => config.public.activeYear)

const { data } = await useAsyncData(() => Promise.all([
  getWorkshopDetail(activeYear.value),
  getWorkshopDetail(activeYear.value - 1)
]))

const activeEdition = computed<Workshop>(() => data.value![0]!)
const prevEdition = computed<Workshop | undefined>(() => data.value?.[1])

const onViewArchive = () => {
  setTimeout(() => {
    document.getElementById('archive')?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}
const viewPrevEditon = () => {
  navigateTo(`/workshops/${activeYear.value - 1}/#recap`)
}
const viewActive = () => {
  navigateTo(`/workshops/${activeYear.value}/`)
}

</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <div class="absolute inset-0">
      <img :src="heroBg" alt="Clinical Laboratory" class="w-full h-full object-cover animate-pulse-subtle" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-[rgba(11,12,15,0.85)] via-[rgba(11,12,15,0.5)] to-[rgba(11,12,15,0.7)]" />
    </div>

    <div class="relative z-10 min-h-screen flex flex-col justify-center px-[8vw] py-[15vh]">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="animate-slide-up">
          <div
            class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E6EF1]/20 border border-[#1E6EF1]/30 mb-6"
            @click="viewActive">
            <span class="w-2 h-2 rounded-full bg-[#1E6EF1] animate-pulse"></span>
            <span v-if="activeEdition.status === 'upcoming'" class="text-sm text-[#1E6EF1] font-medium">DT4H {{
              activeYear }} — Coming Soon</span>
            <span v-else-if="activeEdition.status === 'ongoing'" class="text-sm text-[#1E6EF1] font-medium">DT4H {{
              activeYear }} — Is Ongoing</span>
            <span v-else-if="activeEdition.status === 'completed'" class="text-sm text-[#1E6EF1] font-medium">DT4H {{
              activeYear }} — Has Completed</span>
          </div>

          <h1
            class="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-tight text-[#F4F6FB] mb-6">
            Digital Twin<br />for Healthcare
          </h1>
          <p class="text-xl text-[#A6ACB8] mb-4">
            MICCAI {{ activeYear }} Workshop — {{ activeEdition.year }}
          </p>
          <p class="text-[#6B7280] mb-8 max-w-lg">
            An international workshop dedicated to advancing digital twin technology in healthcare, where researchers,
            clinicians, and industry experts converge to shape the future of personalized medicine.
          </p>

          <div class="flex flex-wrap gap-4 mb-8">
            <a v-if="activeEdition.status === 'ongoing'" :href="activeEdition.cmtLink" target="_blank"
              rel="noopener noreferrer" class="btn-primary flex items-center gap-2">
              Submit Paper
              <ChevronRight :size="18" />
            </a>
            <button @click="viewActive" class="btn-secondary flex items-center gap-2">
              Learn More
            </button>
          </div>

          <button @click="onViewArchive"
            class="flex items-center gap-2 text-sm text-[#A6ACB8] hover:text-[#1E6EF1] transition-colors group">
            <History :size="16" />
            View Past Editions
            <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div class="animate-slide-in-right animation-delay-300 opacity-0">
          <div class="card-dark p-8 space-y-6  backdrop-blur bg-transparent">
            <div class="font-mono-label text-[#1E6EF1]">Workshop Details</div>

            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <Calendar class="text-[#1E6EF1] mt-1" :size="20" />
                <div>
                  <div class="font-medium text-[#F4F6FB]">{{ formatDate(activeEdition.date) }}</div>
                  <div v-if="activeEdition.date.length < 3" class="text-sm text-[#A6ACB8]">Exact date TBA</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <MapPin class="text-[#1E6EF1] mt-1" :size="20" />
                <div>
                  <div class="font-medium text-[#F4F6FB]">{{ activeEdition.location }}</div>
                  <div class="text-sm text-[#A6ACB8]">In-person workshop</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <FileText class="text-[#1E6EF1] mt-1" :size="20" />
                <div>
                  <div class="font-medium text-[#F4F6FB]">Paper Submission Deadline</div>
                  <div class="text-sm text-[#A6ACB8]">{{ formatDate(activeEdition.submissionDeadline) }}</div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-[rgba(244,246,251,0.08)]">
              <div class="flex justify-between text-center">
                <div>
                  <div class="text-2xl font-bold text-[#1E6EF1]">
                    <template v-if="activeEdition.keynoteSpeakers">
                      {{ activeEdition.keynoteSpeakers || '?' }}
                    </template>
                    <Construction v-else />
                  </div>
                  <div class="text-xs text-[#A6ACB8]">Keynotes</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-[#1E6EF1]">
                    <template v-if="activeEdition.oralSessions">
                      {{ activeEdition.oralSessions }}
                    </template>
                    <Construction v-else />
                  </div>
                  <div class="text-xs text-[#A6ACB8]">Oral Sessions</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-[#1E6EF1]">
                    <Construction />
                  </div>
                  <div class="text-xs text-[#A6ACB8]">Poster Demo</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 card-dark p-4 flex items-center gap-4 border-l-4 border-l-[#10B981]">
            <div class="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
              <Award class="text-[#10B981]" :size="20" />
            </div>
            <div v-if="prevEdition" class="flex-1">
              <div class="text-sm font-medium text-[#F4F6FB]">DT4H {{ activeYear - 1 }} Successfully Concluded</div>
              <div class="text-xs text-[#A6ACB8]">{{ prevEdition.participants }} participants from {{
                prevEdition.countries }} countries</div>
            </div>
            <button @click="viewPrevEditon" class="text-sm text-[#1E6EF1] hover:underline">
              View Recap
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>