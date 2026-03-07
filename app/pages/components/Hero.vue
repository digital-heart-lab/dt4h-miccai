<script setup lang="ts">
import heroBg from "~/assets/images/digital-hand.png"
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
        class="absolute inset-0 bg-gradient-to-br from-[rgba(11,12,15,0.92)] via-[rgba(11,12,15,0.75)] to-[rgba(11,12,15,0.85)]" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-transparent to-transparent opacity-60" />
    </div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-[#1E6EF1]/10 rounded-full blur-[120px]" />
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#1E6EF1]/8 rounded-full blur-[100px]" />
    </div>

    <div class="relative z-10 min-h-screen flex flex-col justify-center px-[8vw] py-[15vh]">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="animate-slide-up">
          <div
            class="cursor-pointer inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1E6EF1]/20 to-[#3B82F6]/10 border border-[#1E6EF1]/30 mb-8 backdrop-blur-sm hover:border-[#1E6EF1]/50 transition-all duration-300 group"
            @click="viewActive">
            <span
              class="w-2.5 h-2.5 rounded-full bg-[#1E6EF1] animate-pulse shadow-[0_0_10px_rgba(30,110,241,0.8)]"></span>
            <span v-if="activeEdition.status === 'upcoming'" class="text-sm text-[#60A5FA] font-medium">DT4H {{
              activeYear }} — Coming Soon</span>
            <span v-else-if="activeEdition.status === 'ongoing'" class="text-sm text-[#60A5FA] font-medium">DT4H {{
              activeYear }} — Is Ongoing</span>
            <span v-else-if="activeEdition.status === 'completed'" class="text-sm text-[#60A5FA] font-medium">DT4H {{
              activeYear }} — Has Completed</span>
          </div>

          <h1
            class="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-tight text-[#F4F6FB] mb-6">
            Digital Twin<br />
            for Healthcare
          </h1>
          <p class="text-xl text-[#A6ACB8] mb-4 font-light">
            MICCAI {{ activeYear }} Workshop
          </p>
          <p class="text-[#6B7280] mb-10 max-w-lg leading-relaxed">
            An international workshop dedicated to advancing digital twin technology in healthcare, where researchers,
            clinicians, and industry experts converge to shape the future of personalized medicine.
          </p>

          <div class="flex flex-wrap gap-4 mb-10">
            <a v-if="activeEdition.status === 'ongoing'" :href="activeEdition.cmtLink" target="_blank"
              rel="noopener noreferrer" class="btn-primary flex items-center gap-2">
              <span>Submit Paper</span>
              <ChevronRight :size="18" />
            </a>
            <button @click="viewActive" class="btn-secondary flex items-center gap-2">
              <span>Learn More</span>
            </button>
          </div>

          <button @click="onViewArchive"
            class="flex items-center gap-2.5 text-sm text-[#A6ACB8] hover:text-[#60A5FA] transition-all duration-300 group">
            <History :size="16" class="group-hover:rotate-12 transition-transform duration-300" />
            <span>View Past Editions</span>
            <ArrowRight :size="14" class="group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        <div class="animate-slide-in-right animation-delay-300 opacity-0">
          <div class="card-dark p-8 space-y-6 backdrop-blur-xl bg-[#13151A]/80">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-gradient-to-b from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
              <div class="font-mono-label text-[#60A5FA]">Workshop Details</div>
            </div>

            <div class="space-y-5">
              <div class="flex items-start gap-4 group">
                <div
                  class="w-10 h-10 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
                  <Calendar class="text-[#60A5FA]" :size="20" />
                </div>
                <div>
                  <div class="font-medium text-[#F4F6FB]">{{ formatDate(activeEdition.date) }}</div>
                  <div v-if="activeEdition.date.length < 3" class="text-sm text-[#6B7280]">Exact date TBA</div>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-10 h-10 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
                  <MapPin class="text-[#60A5FA]" :size="20" />
                </div>
                <div>
                  <div class="font-medium text-[#F4F6FB]">{{ activeEdition.location }}</div>
                  <div class="text-sm text-[#6B7280]">In-person workshop</div>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div
                  class="w-10 h-10 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
                  <FileText class="text-[#60A5FA]" :size="20" />
                </div>
                <div>
                  <div class="font-medium text-[#F4F6FB]">Paper Submission Deadline</div>
                  <div class="text-sm text-[#6B7280]">{{ formatDate(activeEdition.submissionDeadline) }}</div>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-[rgba(244,246,251,0.06)]">
              <div class="flex justify-between text-center">
                <div class="group cursor-default">
                  <div
                    class="text-2xl font-bold text-[#60A5FA] group-hover:scale-110 transition-transform duration-300">
                    <template v-if="activeEdition.keynoteSpeakers">
                      {{ activeEdition.keynoteSpeakers || '?' }}
                    </template>
                    <Construction v-else />
                  </div>
                  <div class="text-xs text-[#6B7280] mt-1">Keynotes</div>
                </div>
                <div class="group cursor-default">
                  <div
                    class="text-2xl font-bold text-[#60A5FA] group-hover:scale-110 transition-transform duration-300">
                    <template v-if="activeEdition.oralSessions">
                      {{ activeEdition.oralSessions }}
                    </template>
                    <Construction v-else />
                  </div>
                  <div class="text-xs text-[#6B7280] mt-1">Oral Sessions</div>
                </div>
                <div class="group cursor-default">
                  <div
                    class="text-2xl font-bold text-[#60A5FA] group-hover:scale-110 transition-transform duration-300">
                    <Construction />
                  </div>
                  <div class="text-xs text-[#6B7280] mt-1">Poster Demo</div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-5 card-dark p-5 flex items-center gap-5 border-l-4 border-l-[#10B981] hover:border-l-[#34D399] transition-colors duration-300">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/10 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Award class="text-[#34D399]" :size="22" />
            </div>
            <div v-if="prevEdition" class="flex-1">
              <div class="text-sm font-medium text-[#F4F6FB]">DT4H {{ activeYear - 1 }} Successfully Concluded</div>
              <div class="text-xs text-[#6B7280] mt-0.5">{{ prevEdition.participants }} participants from {{
                prevEdition.countries }} countries</div>
            </div>
            <button @click="viewPrevEditon"
              class="text-sm text-[#60A5FA] hover:text-[#93C5FD] transition-colors duration-300 flex items-center gap-1 group">
              <span>View Recap</span>
              <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>