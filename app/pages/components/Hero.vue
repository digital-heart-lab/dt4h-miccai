<script setup lang="ts">
import heroBg from '~/assets/images/digital-hand.png'
import { ArrowRight, Calendar, History, MapPin } from 'lucide-vue-next'
import StatusBar from './StatusBar.vue'
const { data: workshops } = await useAsyncData('edition-navigation', getWorkshops)
const { data: latest } = await useAsyncData('latest-workshop-highlight', async () => {
  const year = workshops.value?.[0]?.year
  return year ? getWorkshopDetail(year) : null
})
const editionUrl = computed(() => `/workshops/${latest.value?.year}/`)
</script>

<template>
  <section class="series-hero">
    <div class="series-hero__background" aria-hidden="true">
      <img :src="heroBg" alt="" />
    </div>
    <div class="series-hero__grid">
      <div class="series-hero__intro">
        <p class="font-mono-label text-[#60A5FA] mb-6">The international MICCAI workshop series</p>
        <h1>Digital Twin<br />for Healthcare</h1>
        <p class="series-hero__description">
          Connecting researchers, clinicians, and industry experts across medical imaging,
          computational modeling, and AI to advance digital twins for personalized healthcare.
          Explore our latest workshop and the editions that built this community.
        </p>
        <div class="series-hero__actions">
          <a v-if="latest" :href="editionUrl" class="btn-primary inline-flex items-center gap-2">Latest Workshop <ArrowRight :size="18" /></a>
          <a href="#archive" class="btn-secondary inline-flex items-center gap-2"><History :size="18" /> All Editions</a>
        </div>
      </div>

      <article v-if="latest" id="latest" class="latest-edition" aria-labelledby="latest-edition-title">
        <a v-if="latest.year === 2026 && latest.status === 'completed'" :href="`${editionUrl}#recap`" class="latest-edition__photo">
          <img src="/images/recap/2026/IMG_9959.jpg" alt="The DT4H 2026 workshop community gathered in Strasbourg" width="1800" height="1350" />
        </a>
        <div class="latest-edition__body">
          <div class="latest-edition__label">
            <p class="font-mono-label text-[#60A5FA]">Latest edition / {{ latest.year }}</p>
            <StatusBar :status="latest.status" />
          </div>
          <h2 id="latest-edition-title">DT4H {{ latest.year }}</h2>
          <div class="latest-edition__meta">
            <span><Calendar :size="16" />{{ formatDate(latest.date) }}</span>
            <span><MapPin :size="16" />{{ latest.location }}</span>
          </div>
          <p v-if="latest.status !== 'completed'" class="latest-edition__description">Discover the latest workshop’s submission information, key dates, speakers, and program.</p>
          <dl v-if="latest.status === 'completed'" class="latest-edition__stats">
            <div v-if="latest.participants"><dt>Participants</dt><dd>{{ latest.participantQualifier }} {{ latest.participants }}</dd></div>
            <div v-if="latest.accepted"><dt>Accepted papers</dt><dd>{{ latest.accepted }}</dd></div>
            <div v-if="latest.countries"><dt>Countries / regions</dt><dd>{{ latest.countries }}</dd></div>
          </dl>
          <div class="series-hero__actions latest-edition__actions">
            <a :href="editionUrl" class="btn-primary inline-flex items-center gap-2">Explore DT4H {{ latest.year }} <ArrowRight :size="16" /></a>
            <a v-if="latest.year === 2026 && latest.status === 'completed'" :href="`${editionUrl}#recap`" class="btn-secondary inline-flex items-center gap-2">Photos &amp; Recap</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.series-hero { position: relative; overflow: hidden; padding: 120px 6vw 64px; }
.series-hero__background { position: absolute; inset: 0; pointer-events: none; }
.series-hero__background img { width: 100%; height: 100%; object-fit: cover; opacity: .2; }
.series-hero__background::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg,rgba(11,12,15,.3),rgba(11,12,15,.65) 75%,#0B0C0F); }
.series-hero__grid { position: relative; max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: clamp(32px,5vw,80px); }
.series-hero__intro h1 { font-family: 'Space Grotesk',sans-serif; font-size: clamp(2.8rem,4.8vw,4.7rem); font-weight: 600; line-height: 1.08; letter-spacing: -.035em; color: #F4F6FB; margin-bottom: 24px; }
.series-hero__description { font-size: 17px; line-height: 1.8; color: #A6ACB8; max-width: 580px; margin-bottom: 30px; }
.series-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
.latest-edition { min-width: 0; scroll-margin-top: 100px; border: 1px solid rgba(244,246,251,.12); border-radius: 24px; background: rgba(19,21,26,.45); overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,.2); }
.latest-edition__photo { display: block; overflow: hidden; }
.latest-edition__photo img { display: block; width: 100%; aspect-ratio: 3.8/1; object-fit: cover; object-position: center 72%; transition: transform .3s; }
.latest-edition__photo:hover img { transform: scale(1.025); }
.latest-edition__body { padding: 18px 24px 20px; }
.latest-edition__label { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 10px; }
.latest-edition__label .font-mono-label { font-size: 11px; }
.latest-edition h2 { font-family: 'Space Grotesk',sans-serif; font-size: 34px; font-weight: 600; line-height: 1.2; color: #F4F6FB; margin-bottom: 10px; }
.latest-edition__meta { display: flex; flex-wrap: wrap; gap: 8px 18px; color: #A6ACB8; font-size: 13px; }
.latest-edition__meta span { display: inline-flex; align-items: center; gap: 7px; }
.latest-edition__meta svg { color: #60A5FA; flex-shrink: 0; }
.latest-edition__description { font-size: 14px; line-height: 1.7; color: #A6ACB8; margin: 18px 0; }
.latest-edition__stats { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; padding: 14px 0; margin-top: 16px; margin-bottom: 4px; border-top: 1px solid rgba(244,246,251,.08); }
.latest-edition__stats dt { font-size: 11px; line-height: 1.5; color: #A6ACB8; margin-bottom: 4px; }
.latest-edition__stats dd { font-size: 28px; font-weight: 600; line-height: 1.3; color: #60A5FA; }
.latest-edition__actions a { padding: 11px 16px; font-size: 13px; }
@media(max-width: 900px) {
  .series-hero { padding: 112px 6vw 48px; }
  .series-hero__grid { grid-template-columns: 1fr; gap: 36px; max-width: 680px; }
  .series-hero__intro h1 { font-size: clamp(2.8rem,7.5vw,4.5rem); }
  .series-hero__description { margin-bottom: 24px; }
}
@media(max-width: 480px) {
  .series-hero { padding: 104px 24px 40px; }
  .series-hero__description { font-size: 15px; line-height: 1.7; }
  .series-hero__intro > p:first-child { font-size: 10px; }
  .series-hero__actions > a { padding: 12px 16px; font-size: 13px; }
  .latest-edition__body { padding: 22px; }
  .latest-edition__photo img { aspect-ratio: 2/1; }
  .latest-edition__stats dd { font-size: 25px; }
  .latest-edition__actions > a { padding: 10px 12px; font-size: 12px; }
}
@media(prefers-reduced-motion: reduce) { .latest-edition__photo img { transition: none; } }
</style>
