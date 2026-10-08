<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const countries: [string, number][] = [
  ['South Korea', 13], ['Germany', 10], ['United States', 9], ['France', 8],
  ['China', 7], ['United Kingdom', 7], ['Singapore', 6], ['Switzerland', 5],
  ['Netherlands', 3], ['Ireland', 2], ['Luxembourg', 2], ['Spain', 2],
  ['Australia', 1], ['Belgium', 1], ['Canada', 1], ['India', 1], ['Israel', 1], ['Italy', 1], ['Poland', 1],
]
const roles = [
  { label: 'PhD students', count: 28, color: '#60A5FA' },
  { label: 'Academic faculty', count: 22, color: '#34D399' },
  { label: 'Research staff', count: 9, color: '#FBBF24' },
  { label: 'Postdocs', count: 5, color: '#A78BFA' },
  { label: 'Master’s / bachelor’s students', count: 5, color: '#22D3EE' },
  { label: 'Industry leads / heads', count: 1, color: '#FB7185' },
]
const donut = computed(() => {
  let offset = 0
  return `conic-gradient(${roles.map(role => {
    const start = offset
    offset += role.count / 70 * 100
    return `${role.color} ${start}% ${offset}%`
  }).join(', ')})`
})
const themes: [string, number][] = [
  ['AI & Machine Learning', 33], ['Digital Twins', 32], ['Imaging & Computer Vision', 27],
  ['Cardiac & Cardiovascular', 17], ['Multimodal Methods & Data', 11],
  ['Generative AI & Foundation Models', 9], ['Physics-Informed & Scientific Computing', 9],
  ['Modeling, Simulation & Inference', 9], ['MRI & MR Spectroscopy', 8],
  ['Neuroimaging & Brain Research', 8], ['Interventions & Treatment Planning', 6], ['Omics & Clinical Data', 4],
]
const groups = [
  { title: 'Talks & shared ideas', description: 'From keynote perspectives to new research presented by the community.', photos: [
    ['IMG_9881', 'Opening the DT4H 2026 workshop'], ['IMG_9936', 'Keynote on cardiac digital twins'],
    ['61471bd07dec9714467f91a0bf669a20', 'Sponsor talk'], ['4a2fbf69b3f4098e9cc70608433ce432', 'Keynote on brain digital twins'],
    ['IMG_9916', 'Research presented at the lectern'], ['IMG_9995', 'Sharing perspectives on digital twins'],
    ['IMG_0002', 'A speaker presenting to the workshop'], ['IMG_9974', 'An oral presentation at DT4H 2026'],
  ] },
  { title: 'Conversations beyond the talks', description: 'Poster sessions created space for questions, feedback, and connections across disciplines.', photos: [
    ['IMG_0036', 'Participants discussing research at the posters'], ['IMG_0032', 'Exchanging ideas during the poster session'],
    ['IMG_0042', 'A presenter discussing a poster with attendees'], ['20f907058836e773d205ed7d9398043a', 'A conversation beside the research posters'],
  ] },
  { title: 'Celebrating the community', description: 'Recognizing contributions and bringing a memorable afternoon to a close.', photos: [
    ['IMG_0080', 'Runner-up award'], ['IMG_0083', 'Runner-up award'],
    ['IMG_0095', 'Best poster award'],
    ['efeaa33a07c3636dbe292c41a3b3e583', 'Best paper award'],
  ] },
]
const audiencePhotos = [
  ['1bb38932401af712adad6f7f20e571c6', 'A packed room at DT4H 2026'],
  ['IMG_9941', 'Attendees following the DT4H 2026 presentations'],
  ['c9329a500c4f61d550a18de7a24d1c1b', 'Participants standing and sitting on the floor when seats ran out'],
]
const photoPath = (name: string) => `/images/recap/2026/${name}.${name === 'IMG_9959' ? 'jpg' : 'webp'}`
</script>

<template>
  <section id="recap" class="section-dark py-28 px-[8vw] relative">
    <div class="max-w-7xl mx-auto">
      <div class="reveal mb-12">
        <p class="font-mono-label text-[#60A5FA] mb-4">Strasbourg · 27 September 2026</p>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#F4F6FB] mb-5">DT4H 2026 Recap</h2>
        <div class="recap-intro-copy text-[#A6ACB8] text-lg leading-relaxed">
          <p>The second Digital Twin for Healthcare workshop brought together more than 80 participants from 19 countries and regions at MICCAI 2026.</p>
          <p>With 32 accepted papers and the support of two sponsors, the afternoon connected medical imaging, computational modeling, and AI through keynote talks, oral presentations, and poster discussions.</p>
        </div>
      </div>

      <figure class="reveal recap-feature">
        <a :href="photoPath('IMG_9959')" target="_blank" rel="noopener noreferrer" aria-label="Open DT4H 2026 workshop photo">
          <img :src="photoPath('IMG_9959')" alt="DT4H 2026 workshop session" width="1800" height="1350" loading="lazy" />
        </a>
        <figcaption>A community brought together by digital twins for healthcare.</figcaption>
      </figure>

      <div class="recap-data-grid mt-12">
        <article class="card-dark p-6 md:p-8 reveal">
          <h3 class="recap-title">A global community</h3>
          <p class="recap-note">81 participants · 19 countries / regions</p>
          <div class="country-grid mt-7">
            <div v-for="[name, count] in countries" :key="name" class="recap-bar-row">
              <div class="recap-bar-label"><span>{{ name }}</span><span>{{ count }}</span></div>
              <div class="recap-bar-track"><div :style="{ width: `${count / 13 * 100}%` }" /></div>
            </div>
          </div>
        </article>
        <article class="card-dark p-6 md:p-8 reveal">
          <h3 class="recap-title">Across career stages</h3>
          <p class="recap-note">Position distribution · 70 responses</p>
          <div class="recap-donut mx-auto my-8" :style="{ background: donut }" role="img" aria-label="Participant roles: 28 PhD students, 22 academic faculty, 9 research staff, 5 postdocs, 5 master's or bachelor's students, and 1 industry lead">
            <div><strong>70</strong><span>responses</span></div>
          </div>
          <ul class="space-y-3">
            <li v-for="role in roles" :key="role.label" class="flex items-center gap-3 text-sm text-[#A6ACB8]">
              <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: role.color }" />
              <span class="flex-1">{{ role.label }}</span><span class="text-[#F4F6FB]">{{ role.count }}</span><span class="w-14 text-right">{{ (role.count / 70 * 100).toFixed(1) }}%</span>
            </li>
          </ul>
        </article>
      </div>

      <article class="card-dark p-6 md:p-8 mt-6 reveal">
        <h3 class="recap-title">Research interests across disciplines</h3>
        <p class="recap-note">Participant research themes · multiple themes per participant · percentages out of 81</p>
        <div class="recap-theme-grid mt-7">
          <div v-for="[name, count] in themes" :key="name" class="recap-bar-row">
            <div class="recap-bar-label"><span>{{ name }}</span><span>{{ count }} · {{ (count / 81 * 100).toFixed(1) }}%</span></div>
            <div class="recap-bar-track recap-bar-track--green"><div :style="{ width: `${count / 33 * 100}%` }" /></div>
          </div>
        </div>
      </article>

      <div v-for="(group, index) in groups" :key="group.title" class="mt-16">
        <div class="reveal mb-7">
          <p class="font-mono-label text-[#60A5FA] mb-3">0{{ index + 1 }} / Highlights</p>
          <h3 class="recap-title text-2xl md:text-3xl">{{ group.title }}</h3>
          <p class="text-[#A6ACB8] mt-3 max-w-2xl leading-relaxed">{{ group.description }}</p>
        </div>
        <div class="recap-gallery" :class="{ 'recap-gallery--talks': index === 0, 'recap-gallery--awards': index === 2 }">
          <figure v-for="([name, caption], photoIndex) in group.photos" :key="name" class="reveal recap-photo" :class="{ 'recap-photo--landscape': index === 0 && photoIndex < 4, 'recap-photo--brain-keynote': index === 0 && photoIndex === 3 }">
            <a :href="photoPath(name)" target="_blank" rel="noopener noreferrer" :aria-label="`Open photo: ${caption}`">
              <img :src="photoPath(name)" :alt="caption" loading="lazy" decoding="async" />
              <span class="recap-expand"><ArrowUpRight :size="18" /></span>
            </a>
            <figcaption v-if="index !== 0 || photoIndex < 4">{{ caption }}</figcaption>
          </figure>
        </div>
      </div>
      <div class="mt-12">
        <div class="reveal mb-6">
          <h3 class="recap-title">A packed room, a growing community</h3>
          <p class="text-[#A6ACB8] mt-3 leading-relaxed">More than 80 participants joined us this year — so many that we ran out of seats! Thank you to everyone who made DT4H 2026 possible.</p>
        </div>
        <div class="recap-gallery recap-gallery--audience">
          <figure v-for="[name, caption] in audiencePhotos" :key="name" class="reveal recap-photo">
            <a :href="photoPath(name)" target="_blank" rel="noopener noreferrer" :aria-label="`Open photo: ${caption}`">
              <img :src="photoPath(name)" :alt="caption" loading="lazy" decoding="async" />
              <span class="recap-expand"><ArrowUpRight :size="18" /></span>
            </a>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.recap-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4F6FB; line-height: 1.3; }
.recap-note { font-size: .8rem; color: #A6ACB8; line-height: 1.6; margin-top: .5rem; }
.recap-feature, .recap-photo { margin-bottom: 0; }
.recap-intro-copy { display: grid; grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr); gap: 48px; max-width: 72rem; }
.recap-feature { width: 100%; }
.recap-feature a, .recap-photo a { display: block; position: relative; overflow: hidden; border-radius: 18px; background: #13151A; }
.recap-feature img { width: 100%; max-height: 680px; aspect-ratio: 16 / 9; object-fit: cover; object-position: center 55%; }
figcaption { font-size: .8rem; color: #A6ACB8; margin-top: .8rem; line-height: 1.6; }
.recap-data-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; }
.country-grid, .recap-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 28px; }
.recap-bar-label { display: flex; justify-content: space-between; gap: 12px; color: #D5DBE7; font-size: .8rem; margin-bottom: 7px; }
.recap-bar-label span:last-child { white-space: nowrap; color: #A6ACB8; }
.recap-bar-track { height: 5px; background: rgba(96,165,250,.09); border-radius: 8px; overflow: hidden; }
.recap-bar-track div { height: 100%; background: #60A5FA; border-radius: 8px; }
.recap-bar-track--green div { background: #34D399; }
.recap-donut { width: 220px; height: 220px; border-radius: 50%; padding: 28px; }
.recap-donut > div { height: 100%; border-radius: 50%; background: #13151A; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #A6ACB8; font-size: .8rem; }
.recap-donut strong { font-size: 2.5rem; color: #F4F6FB; font-family: 'Space Grotesk', sans-serif; }
.recap-gallery { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 22px 18px; }
.recap-gallery--talks { grid-template-columns: repeat(4,minmax(0,1fr)); }
.recap-photo img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; transition: transform .4s; }
.recap-gallery--talks .recap-photo img { aspect-ratio: 3/4; }
.recap-photo--landscape { grid-column: auto; }
.recap-gallery--talks .recap-photo--landscape img { aspect-ratio: 4/3; object-fit: cover; object-position: center bottom; }
.recap-gallery--talks .recap-photo--brain-keynote img { object-fit: cover; object-position: center; }
.recap-gallery--audience { grid-template-columns: repeat(3,minmax(0,1fr)); }
.recap-photo a:hover img { transform: scale(1.025); }
.recap-photo a:focus-visible, .recap-feature a:focus-visible { outline: 2px solid #60A5FA; outline-offset: 5px; }
.recap-expand { position: absolute; bottom: 12px; right: 12px; background: #0B0C0Faa; color: white; border-radius: 50%; padding: 8px; }
@media(max-width: 900px) { .recap-intro-copy { grid-template-columns: 1fr; gap: 12px; } .recap-data-grid { grid-template-columns: 1fr; } .recap-gallery { grid-template-columns: repeat(2,minmax(0,1fr)); } .recap-gallery--audience { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media(max-width: 600px) { .country-grid, .recap-theme-grid { grid-template-columns: 1fr; } .recap-gallery { gap: 22px 14px; } .recap-gallery--talks { grid-template-columns: repeat(2,minmax(0,1fr)); } .recap-gallery--audience { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto; } .recap-feature img { aspect-ratio: 4/3; } }
@media(prefers-reduced-motion: reduce) { .recap-photo img { transition: none; } }
</style>
