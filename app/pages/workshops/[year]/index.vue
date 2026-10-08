<script setup lang="ts">
import { ArrowRight, Award, Handshake, BookOpen, Calendar, CalendarDays, CheckCircle, ChevronRight, Clock, DiamondPlus, ExternalLink, FileText, Gem, Globe, Hammer, Mail, MapPin, Rocket, Users } from 'lucide-vue-next'
import Navigation from '../../components/Navigation.vue'
import KeyDates from '../../components/KeyDates.vue'
import Keynotes from '../../components/Keynotes/Index.vue'
import AcceptedPapers from '../../components/AcceptedPapers/Index.vue'
import Program from '../../components/Program/Index.vue'
import Recap from '../../components/Recap.vue'
import Committee from '../../components/Committee/Index.vue'
import useAnimation from '~/pages/composables/useAnimation'
import StatusBar from '~/pages/components/StatusBar.vue'
import Sponsors from '~/pages/components/Sponsors/Index.vue'
import Foot from '~/layouts/components/foot.vue'
import CallForPapers from '../../components/CallForPapers.vue'
import heroBg from "~/assets/images/digital-hand.png"

definePageMeta({
  layout: false,
})

const route = useRoute()
const year = Number(route.params.year)


if (!Number.isInteger(year)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
if (year === 2025) {
  await navigateTo('/workshops/2025/', { external: true, redirectCode: 301 })
}

const { data: workshops } = await useAsyncData('edition-navigation', getWorkshops)
const { data } = await useAsyncData(route.path, async () => {
  return getWorkshopDetail(year)
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const navs = [{
  label: 'Papers',
  id: data.value?.status === 'completed' ? 'accepted-papers' : 'call-for-papers'
}, {
  label: 'Timeline',
  id: 'timeline'
}, {
  label: 'Keynotes',
  id: 'keynotes'
}, {
  label: 'Program',
  id: 'program'
}, {
  label: 'Recap',
  id: 'recap'
}, {
  label: 'Committee',
  id: 'committee'
}, {
  label: 'Sponsors',
  id: 'sponsors'
}, {
  label: 'Announcements',
  url: '/blog'
}, ...(workshops.value ?? []).filter(workshop => workshop.year !== year).map(workshop => ({
  label: `DT4H ${workshop.year}`,
  url: `/workshops/${workshop.year}/`
})), {
  label: 'Home',
  url: '/'
}]
useHead({ title: `DT4H ${year} | Digital Twin for Healthcare` })
useAnimation()


</script>
<template>
  <template v-if="data">
    <Navigation :year="year" :navs="navs" />
    <div class="absolute inset-0 overflow-hidden">
      <img :src="heroBg" alt="Clinical Laboratory" class="w-full h-full object-cover animate-pulse-subtle" />
      <div
        class="absolute inset-0 bg-gradient-to-br from-[rgba(11,12,15,0.92)] via-[rgba(11,12,15,0.75)] to-[rgba(11,12,15,0.85)]" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-transparent to-transparent opacity-60" />
    </div>

    <div class="min-h-screen pt-[80px] pb-20 px-[8vw] relative overflow-hidden flex flex-col justify-center">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1E6EF1]/[0.03] rounded-full blur-[150px]" />
        <div class="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#1E6EF1]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div class="mb-16 relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <span class="text-gradient text-sm font-medium tracking-wide">DT4H Workshop {{ year }}</span>
          <StatusBar :status="data.status" />
        </div>

        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-7">
            <h1 class="font-['Space_Grotesk'] text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#F4F6FB] leading-[1.1]">
              Digital Twin <br />
              for Healthcare
            </h1>

          </div>

          <div class="lg:col-span-5 self-end">
            <div class="flex flex-col gap-4 justify-end">
              <div class="flex items-center gap-4 group">
                <div
                  class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/20 to-[#60A5FA]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#1E6EF1]/30 group-hover:to-[#60A5FA]/20 transition-all duration-300">
                  <MapPin class="text-[#60A5FA]" :size="22" />
                </div>
                <div>
                  <div class="text-xs text-[#6B7280] uppercase tracking-wider mb-0.5">Location</div>
                  <div class="text-[#F4F6FB] font-medium">{{ data.location }}</div>
                </div>
              </div>

              <div class="h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,246,251,0.1)] to-transparent"></div>

              <div class="flex items-center gap-4 group">
                <div
                  class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/20 to-[#60A5FA]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#1E6EF1]/30 group-hover:to-[#60A5FA]/20 transition-all duration-300">
                  <Calendar class="text-[#60A5FA]" :size="22" />
                </div>
                <div>
                  <div class="text-xs text-[#6B7280] uppercase tracking-wider mb-0.5">Date</div>
                  <div class="text-[#F4F6FB] font-medium">{{ formatDate(data.date) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-[#6B7280] text-lg leading-relaxed">
          2nd International Workshop on Digital Twin for Healthcare (DT4H) in
          <a class="text-[#60A5FA] hover:text-[#93C5FD] transition-colors duration-300 border-b border-[#60A5FA]/30 hover:border-[#93C5FD]"
            :href="data.miccaiLink" target="_blank">MICCAI {{ year }}</a>
        </p>
      </div>

      <div v-if="data.status === 'completed'" class="mb-16 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="card-dark workshop-stat-card p-6 text-center group">
            <div
              class="w-12 h-12 rounded-2xl bg-[#1E6EF1]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
              <Handshake class="text-[#60A5FA]" :size="24" />
            </div>
            <div class="text-3xl font-bold text-[#F4F6FB] group-hover:scale-105 transition-transform duration-300">{{
              data.sponsorCount }}</div>
            <div class="text-sm text-[#6B7280] mt-1">Sponsors</div>
          </div>
          <div class="card-dark workshop-stat-card p-6 text-center group">
            <div
              class="w-12 h-12 rounded-2xl bg-[#1E6EF1]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
              <FileText class="text-[#60A5FA]" :size="24" />
            </div>
            <div class="text-3xl font-bold text-[#F4F6FB] group-hover:scale-105 transition-transform duration-300">{{
              data.accepted }}</div>
            <div class="text-sm text-[#6B7280] mt-1">Accepted Papers</div>
          </div>
          <div class="card-dark workshop-stat-card p-6 text-center group">
            <div
              class="w-12 h-12 rounded-2xl bg-[#1E6EF1]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E6EF1]/20 transition-colors duration-300">
              <Users class="text-[#60A5FA]" :size="24" />
            </div>
            <div class="text-3xl font-bold text-[#F4F6FB] group-hover:scale-105 transition-transform duration-300">{{ data.participantQualifier }} {{ data.participants }}</div>
            <div class="text-sm text-[#6B7280] mt-1">Participants</div>
          </div>

        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 relative z-10">
        <div class="card-dark bg-transparent backdrop-blur-xs p-8">
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center">
              <BookOpen class="text-[#60A5FA]" :size="20" />
            </div>
            {{ data.status === 'completed' ? 'Workshop Completed' : 'Call for Papers' }}
          </h3>
          <div v-if="data.status === 'completed'" class="space-y-4">
            <p class="text-[#A6ACB8] leading-relaxed">Thank you to our speakers, authors, participants, and sponsors for making DT4H 2026 in Strasbourg a success. Explore the accepted papers, program, and highlights below.</p>
            <a href="#recap" class="btn-primary w-full flex items-center justify-center gap-2 mt-6">View the Recap <ArrowRight :size="16" /></a>
          </div>
          <div v-else class="space-y-4">
            <p class="text-[#6B7280] leading-relaxed">
              We invite 8-page submissions on digital twin technology in healthcare.
              <a class="text-[#60A5FA] hover:text-[#93C5FD] inline-flex items-center gap-1 transition-colors duration-300 group"
                :href="data.paperRequirementLink" target="__blank">Learn More
                <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </p>
            <div class="space-y-3 mt-4">
              <div v-for="item in ['Max 8 pages + 2 references', 'Springer LNCS format', 'Double-blind review']"
                :key="item" class="flex items-center gap-3 text-sm text-[#F4F6FB]">
                <div class="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <CheckCircle class="text-[#34D399]" :size="12" />
                </div>
                {{ item }}
              </div>
            </div>
            <a :href="data.cmtLink" target="_blank" rel="noopener noreferrer"
              class="btn-primary w-full flex items-center justify-center gap-2 mt-6">
              <FileText :size="16" /> Submit Paper
            </a>
          </div>
        </div>

        <div class="card-dark p-8 bg-transparent backdrop-blur-xs">
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center">
              <Gem class="text-[#60A5FA]" :size="20" />
            </div>
            {{ data.status === 'completed' ? 'Thank You to Our Sponsors' : 'Call for Sponsors' }}
          </h3>
          <div class="space-y-4">
            <p v-if="data.status === 'completed'" class="text-[#A6ACB8] leading-relaxed">Our two sponsors supported a lively afternoon of research exchange and collaboration. Thank you for supporting the DT4H community.</p>
            <a v-if="data.status === 'completed'" href="#sponsors" class="btn-secondary w-full flex items-center justify-center gap-2 mt-6">View Sponsors</a>
            <p v-else class="text-[#6B7280] leading-relaxed">
              Support the future of precision healthcare by sponsoring our workshop exploring cutting-edge digital
              twin technology for patient simulation and clinical decision support.
            </p>
            <a v-if="data.status !== 'completed'" href="mailto:lei.li@nus.edu.sg?subject=Sponsorship%20Interest:%20DT4H%202026" target="_blank"
              rel="noopener noreferrer" class="btn-secondary w-full flex items-center justify-center gap-2 mt-6">
              <Mail :size="16" /> Contact Us
            </a>
          </div>
        </div>
      </div>


    </div>
    <CallForPapers v-if="data.status !== 'completed' && data.paperTemplates?.templates" :paper-tempaltes="data.paperTemplates.templates"
      :cmt-link="data.cmtLink" :paper-requirement-link="data.paperRequirementLink" />
    <AcceptedPapers v-if="data.acceptedPapers?.papers?.length" :papers="data.acceptedPapers.papers"
      :year="data.acceptedPapers.year" />
    <KeyDates v-if="data.timeline?.events" :dates="data.timeline.events" />
    <Keynotes v-if="data.keynotes?.keynotes?.length" :keynotes="data.keynotes.keynotes" :year="data.keynotes.year" />
    <Program v-if="data.program" :data="data.program" />
    <Recap v-if="year === 2026 && data.status === 'completed'" />
    <Committee v-if="data.committee" :data="data.committee" />
    <Sponsors v-if="data.sponsors" :sponsors="data.sponsors" />
    <Foot />
  </template>
</template>

<style scoped>
.workshop-stat-card { background: rgba(19, 21, 26, .45); }
</style>
