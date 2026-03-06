<script setup lang="ts">
import { Award, BarChart3, BookOpen, Calendar, CalendarDays, CheckCircle, ChevronRight, Clock, ExternalLink, FileText, Globe, Hammer, MapPin, Rocket, Users } from 'lucide-vue-next'
import Navigation from '../../components/Navigation.vue'
import KeyDates from '../../components/KeyDates.vue'
import Committee from '../../components/Committee/Index.vue'
import useAnimation from '~/pages/composables/useAnimation'
import StatusBar from '~/pages/components/StatusBar.vue'
import Sponsors from '~/pages/components/Sponsors/Index.vue'
import Foot from '~/layouts/components/foot.vue'
import CallForPapers from '../../components/CallForPapers.vue'

definePageMeta({
  layout: false,
})

const route = useRoute()
const year = Number(route.params.year)


if (isNaN(year) || year > 2026 || year < 2025) {

}
if (year === 2025) {
  location.href = '/workshops/2025'
}

const { data } = await useAsyncData(route.path, async () => {
  return getWorkshopDetail(year)
})

if (!data.value) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}

const navs = [{
  label: 'Papers',
  id: 'call-for-papers'
}, {
  label: 'Timeline',
  id: 'timeline'
}, {
  label: 'Committee',
  id: 'committee'
}, {
  label: 'Sponsors',
  id: 'sponsors'
}, {
  label: 'Announcements',
  url: '/blog'
}, {
  label: 'Home',
  url: '/'
}]
useAnimation()


</script>
<template>
  <template v-if="data">
    <Navigation :year="year" :navs="navs" />
    <div class="min-h-screen bg-[#0B0C0F] pt-24 pb-16 px-[8vw]">
      <div class="max-w-7xl mx-auto mb-16">
        <div class="flex items-center gap-4 mb-6">
          <div class="font-mono-label text-[#1E6EF1]">Workshop Edition</div>
          <StatusBar :status="data.status" />
        </div>
        <h2 class="text-[clamp(1.5rem,1vw,2rem)] text-[#A6ACB8]">
          DT4H {{ year }}
        </h2>
        <h1 class="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] font-bold text-[#F4F6FB] leading-none">
          &copy; International Workshop on Digital Twin for Healthcare (DT4H) in <a class="underline"
            :href="data.miccaiLink" target="_blank">MICCAI {{
              year }}</a>
        </h1>
        <div class="flex flex-wrap items-center gap-6 text-[#A6ACB8] mt-6">
          <div class="flex items-center gap-2">
            <MapPin :size="18" /> {{ data.location }}
          </div>
          <div class="flex items-center gap-2">
            <Calendar :size="18" /> {{ formatDate(data.date) }}
          </div>
        </div>
      </div>

      <div v-if="data.status === 'completed'" class="max-w-7xl mx-auto mb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="card-dark p-6 text-center">
            <BarChart3 class="text-[#1E6EF1] mx-auto mb-3" :size="28" />
            <div class="text-3xl font-bold text-[#F4F6FB]">{{ data.submissions }}</div>
            <div class="text-sm text-[#A6ACB8]">Submissions</div>
          </div>
          <div class="card-dark p-6 text-center">
            <FileText class="text-[#1E6EF1] mx-auto mb-3" :size="28" />
            <div class="text-3xl font-bold text-[#F4F6FB]">{{ data.accepted }}</div>
            <div class="text-sm text-[#A6ACB8]">Accepted Papers</div>
          </div>
          <div class="card-dark p-6 text-center">
            <Users class="text-[#1E6EF1] mx-auto mb-3" :size="28" />
            <div class="text-3xl font-bold text-[#F4F6FB]">{{ data.participants }}</div>
            <div class="text-sm text-[#A6ACB8]">Participants</div>
          </div>
          <div class="card-dark p-6 text-center">
            <Globe class="text-[#1E6EF1] mx-auto mb-3" :size="28" />
            <div class="text-3xl font-bold text-[#F4F6FB]">{{ data.countries }}</div>
            <div class="text-sm text-[#A6ACB8]">Countries</div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <div class="card-dark p-8">
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-6 flex items-center gap-3">
            <Award class="text-[#1E6EF1]" :size="24" />
            Call for Sponsors
          </h3>
          <div class="space-y-4">
            <div v-if="!data.keynotes?.keynotes">
              TBA
            </div>
            <div v-for="keynote in data.keynotes?.keynotes" class="p-4 rounded-xl bg-[rgba(244,246,251,0.03)]">
              <div class="font-medium text-[#F4F6FB]">{{ keynote.name }}</div>
              <div class="text-sm text-[#A6ACB8]">{{ keynote.affil }}</div>
              <div class="text-sm text-[#1E6EF1] mt-2">{{ keynote.topic }}</div>
            </div>
          </div>
        </div>

        <div class="card-dark p-8">
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-6 flex items-center gap-3">
            <BookOpen class="text-[#1E6EF1]" :size="24" />
            {{ data.status === 'completed' ? 'Best Papers' : 'Call for Papers' }}
          </h3>
          <div v-if="data.status === 'completed'" class="space-y-4">
            <div v-for="paper in data.bestPapers" key={i}
              class="p-4 rounded-xl bg-[rgba(244,246,251,0.03)] flex items-start gap-3">
              <Award class="text-[#F59E0B] flex-shrink-0 mt-0.5" :size="18" />
              <span class="text-[#F4F6FB] text-sm">{{ paper }}</span>
            </div>
            <a href={{data.proceedingsLink}} target="_blank" rel="noopener noreferrer"
              class="btn-secondary w-full flex items-center justify-center gap-2 mt-6">
              <ExternalLink :size="16" /> View All Proceedings
            </a>
          </div>
          <div v-else class="space - y - 4">
            <p class="text-[#A6ACB8]">
              We invite 8-page submissions on digital twin technology in healthcare.
              Topics include organ modeling, AI-driven simulation, clinical translation, and more.
            </p>
            <div class="space-y-2">
              <div v-for="item in ['Max 8 pages + 2 references', 'Springer LNCS format', 'Double-blind review']" key={i}
                class="flex items-center gap-2 text-sm text-[#F4F6FB]">
                <CheckCircle class="text-[#10B981]" :size="14" />
                {{ item }}
              </div>
            </div>
            <a :href="data.cmtLink" target="_blank" rel="noopener noreferrer"
              class="btn-primary w-full flex items-center justify-center gap-2 mt-6">
              <FileText :size="16" /> Submit Paper
            </a>
          </div>
        </div>
      </div>

      <div v-if="data.status === 'completed'" class="max-w-7xl mx-auto mt-8">
        <div class="card-dark p-8">
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-6 flex items-center gap-3">
            <Clock class="text-[#1E6EF1]" :size="24" />
            Program Schedule
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="item in data.timeline?.events" key={i}
              class="flex items-center gap-4 p-3 rounded-xl bg-[rgba(244,246,251,0.03)]">
              <div class="font-mono-label text-[#1E6EF1] w-16">{{ item.time }}</div>
              <div class="text-[#F4F6FB]">{{ item.event }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CallForPapers v-if="data.paperTemplates?.templates" :paper-tempaltes="data.paperTemplates.templates"
      :cmt-link="data.cmtLink" :paper-requirement-link="data.paperRequirementLink" />
    <KeyDates v-if="data.timeline?.events" :dates="data.timeline.events" />
    <Committee v-if="data.committee" :data="data.committee" />
    <Sponsors v-if="data.sponsors" :sponsors="data.sponsors" />
    <Foot />
  </template>
</template>