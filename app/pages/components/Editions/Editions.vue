<script setup lang="ts">
import { BookOpen, Calendar, ExternalLink, FileText, Globe, MapPin, Play } from 'lucide-vue-next';
import StatusBar from '../StatusBar.vue';

const workshops = await getWorkshops()
const viewDetail = (year: number) => {
  navigateTo(`/workshops/${year}`)
}

</script>
<template>
  <section id="archive" class="section-dark py-24 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <div class="reveal mb-16">
        <div class="font-mono-label text-[#1E6EF1] mb-4">Workshop History</div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F4F6FB] mb-4">
          Past Editions
        </h2>
        <p class="text-[#A6ACB8] max-w-2xl">
          Explore our journey through the years. Each edition brings together researchers,
          clinicians, and industry experts to advance digital twin technology in healthcare.
        </p>
      </div>

      <div class="space-y-8">
        <template v-for="workshop in workshops">
          <div v-if="workshop.status === 'completed'" class="reveal card-dark p-8 border-l-4 border-l-[#10B981]">
            <div class="grid lg:grid-cols-4 gap-8 items-center">
              <div class="lg:col-span-1">
                <div class="font-['Space_Grotesk'] text-5xl font-bold text-[#10B981] mb-2">{{ workshop.year }}</div>
                <div class="flex items-center gap-2 text-[#A6ACB8] text-sm">
                  <MapPin :size="14" /> {{ workshop.location }}
                </div>
                <div class="flex items-center gap-2 text-[#A6ACB8] text-sm mt-1">
                  <Calendar :size="14" /> {{ formatDate(workshop.date) }}
                </div>
                <StatusBar :status="workshop.status" />
              </div>

              <div class="lg:col-span-2">
                <div class="grid grid-cols-3 gap-4 mb-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.submissions }}</div>
                    <div class="text-xs text-[#A6ACB8]">Submissions</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.accepted }}</div>
                    <div class="text-xs text-[#A6ACB8]">Accepted</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-[#F4F6FB]">{{ workshop.participants }}</div>
                    <div class="text-xs text-[#A6ACB8]">Participants</div>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-sm text-[#A6ACB8]">
                  <Globe :size="14" /> {{ workshop.countries }} countries represented
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
          <div v-else class="reveal card-dark p-8 border-l-4 border-l-[#1E6EF1]">
            <div class="grid lg:grid-cols-4 gap-8 items-center">
              <div class="lg:col-span-1">
                <div class="font-['Space_Grotesk'] text-5xl font-bold text-[#1E6EF1] mb-2">{{ workshop.year }}</div>
                <div class="flex items-center gap-2 text-[#A6ACB8] text-sm">
                  <MapPin :size="14" /> {{ workshop.location }}
                </div>
                <div class="flex items-center gap-2 text-[#A6ACB8] text-sm mt-1">
                  <Calendar :size="14" /> {{ formatDate(workshop.date) }}
                </div>
                <StatusBar :status="workshop.status" />
              </div>

              <div class="lg:col-span-2">
                <p class="text-[#A6ACB8] text-sm">
                  Join us for the second edition of DT4H at MICCAI 2026 in Marrakech, Morocco.
                  We look forward to another year of groundbreaking research and collaboration.
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