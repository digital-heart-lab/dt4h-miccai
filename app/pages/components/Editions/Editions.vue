<script setup lang="ts">
import { BookOpen, Calendar, ExternalLink, FileText, Globe, MapPin, Play } from 'lucide-vue-next';
import StatusBar from '../StatusBar.vue';

const { data: workshops } = await useAsyncData(() => getWorkshops())
const viewDetail = (year: number) => {
  navigateTo(`/workshops/${year}`)
}

</script>
<template>
  <section id="archive" class="section-dark py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1E6EF1]/[0.03] rounded-full blur-[150px] -translate-y-1/2" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="reveal mb-20">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <div class="font-mono-label text-[#60A5FA]">Workshop History</div>
        </div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#F4F6FB] mb-5 leading-tight">
          Past Editions
        </h2>
        <p class="text-[#6B7280] max-w-2xl text-lg">
          Explore our journey through the years. Each edition brings together researchers,
          clinicians, and industry experts to advance digital twin technology in healthcare.
        </p>
      </div>

      <div class="space-y-8">
        <template v-for="(workshop, index) in workshops" :key="workshop.year">
          <div v-if="workshop.status === 'completed'" class="reveal card-dark p-8 border-l-4 border-l-[#10B981] hover:border-l-[#34D399] group">
            <div class="grid lg:grid-cols-4 gap-8 items-center">
              <div class="lg:col-span-1">
                <div class="font-['Space_Grotesk'] text-5xl font-bold text-[#34D399] mb-3 group-hover:scale-105 transition-transform duration-300">{{ workshop.year }}</div>
                <div class="flex items-center gap-2.5 text-[#6B7280] text-sm mb-2">
                  <div class="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <MapPin :size="14" class="text-[#34D399]" />
                  </div>
                  {{ workshop.location }}
                </div>
                <div class="flex items-center gap-2.5 text-[#6B7280] text-sm mb-4">
                  <div class="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Calendar :size="14" class="text-[#34D399]" />
                  </div>
                  {{ formatDate(workshop.date) }}
                </div>
                <StatusBar :status="workshop.status" />
              </div>

              <div class="lg:col-span-2">
                <div class="grid grid-cols-3 gap-4 mb-5">
                  <div class="text-center p-4 rounded-2xl bg-[#10B981]/5 group-hover:bg-[#10B981]/10 transition-colors duration-300">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.submissions }}</div>
                    <div class="text-xs text-[#6B7280] mt-1">Submissions</div>
                  </div>
                  <div class="text-center p-4 rounded-2xl bg-[#10B981]/5 group-hover:bg-[#10B981]/10 transition-colors duration-300">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.accepted }}</div>
                    <div class="text-xs text-[#6B7280] mt-1">Accepted</div>
                  </div>
                  <div class="text-center p-4 rounded-2xl bg-[#10B981]/5 group-hover:bg-[#10B981]/10 transition-colors duration-300">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.participants }}</div>
                    <div class="text-xs text-[#6B7280] mt-1">Participants</div>
                  </div>
                </div>
                <div class="flex items-center gap-2.5 text-sm text-[#6B7280]">
                  <div class="w-7 h-7 rounded-lg bg-[#1E6EF1]/10 flex items-center justify-center">
                    <Globe :size="14" class="text-[#60A5FA]" />
                  </div>
                  {{ workshop.countries }} countries represented
                </div>
              </div>

              <div class="lg:col-span-1 flex flex-col gap-3">
                <button @click="viewDetail(workshop.year)"
                  class="btn-primary flex items-center justify-center gap-2 text-sm">
                  <BookOpen :size="16" /> View Details
                </button>
                <a href="https://link.springer.com/book/10.1007/978-3-032-07694-6" target="_blank"
                  rel="noopener noreferrer" class="btn-secondary flex items-center justify-center gap-2 text-sm">
                  <ExternalLink :size="16" /> Proceedings
                </a>
              </div>
            </div>
          </div>
          <div v-else class="reveal card-dark p-8 border-l-4 border-l-[#1E6EF1] hover:border-l-[#60A5FA] group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[#1E6EF1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="grid lg:grid-cols-4 gap-8 items-center relative z-10">
              <div class="lg:col-span-1">
                <div class="font-['Space_Grotesk'] text-5xl font-bold text-[#60A5FA] mb-3 group-hover:scale-105 transition-transform duration-300">{{ workshop.year }}</div>
                <div class="flex items-center gap-2.5 text-[#6B7280] text-sm mb-2">
                  <div class="w-7 h-7 rounded-lg bg-[#1E6EF1]/10 flex items-center justify-center">
                    <MapPin :size="14" class="text-[#60A5FA]" />
                  </div>
                  {{ workshop.location }}
                </div>
                <div class="flex items-center gap-2.5 text-[#6B7280] text-sm mb-4">
                  <div class="w-7 h-7 rounded-lg bg-[#1E6EF1]/10 flex items-center justify-center">
                    <Calendar :size="14" class="text-[#60A5FA]" />
                  </div>
                  {{ formatDate(workshop.date) }}
                </div>
                <StatusBar :status="workshop.status" />
              </div>

              <div class="lg:col-span-2">
                <p class="text-[#6B7280] text-sm leading-relaxed">
                  Join us for the 2nd DT4H at MICCAI 2026 in Abu Dhabi, United Arab Emirates. We look forward to another
                  year of groundbreaking research and collaboration.
                </p>
              </div>

              <div class="lg:col-span-1 flex flex-col gap-3">
                <a :href="workshop.cmtLink" target="_blank" rel="noopener noreferrer"
                  class="btn-primary flex items-center justify-center gap-2 text-sm">
                  <FileText :size="16" /> Submit Paper
                </a>
                <button @click="viewDetail(workshop.year)"
                  class="btn-secondary flex items-center justify-center gap-2 text-sm">
                  <Play :size="16" /> Learn More
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>