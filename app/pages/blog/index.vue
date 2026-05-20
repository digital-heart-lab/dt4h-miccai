<script lang="ts">
export const blogNavs = [
  {
    label: 'DT4H 2026',
    url: '/workshops/2026'
  },
  {
    label: 'DT4H 2025',
    url: '/workshops/2025'
  },
  {
    label: 'Home',
    url: '/'
  },
]
</script>
<script setup lang="ts">
import Foot from '~/layouts/components/foot.vue';
import Navigation from '../components/Navigation.vue';
import useAnimation from '../composables/useAnimation';
import { ArrowRight, CalendarDays, Sparkles, UserPen } from 'lucide-vue-next';
definePageMeta({
  layout: false,
})

useAnimation()

const { data: rawArticles } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
    .where('path', 'LIKE', '/blog/%')
    .order('date', 'DESC')
    .all()
})

const articles = computed(() => {
  const list = rawArticles.value ?? []
  return [...list].sort((a, b) => {
    const da = a.date ?? ''
    const db = b.date ?? ''
    if (!da && !db) return 0
    if (!da) return 1
    if (!db) return -1
    return db.localeCompare(da)
  })
})

const shortMonth = (value: string | undefined) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
}

const dayOf = (value: string | undefined) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return String(d.getDate())
}

const yearOf = (value: string | undefined) => {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return String(d.getFullYear())
}
</script>

<template>
  <div class="min-h-[100vh] flex flex-col bg-[#0B0C0F]">
    <Navigation name="ANNOUNCEMENT" logo-url="/blog" :navs="blogNavs" />

    <div class="relative pt-32 pb-16 px-[8vw] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1E6EF1]/[0.04] rounded-full blur-[150px]" />
        <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#60A5FA]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <div class="font-mono-label text-[#60A5FA]">Updates</div>
        </div>
        <h1 class="font-['Space_Grotesk'] text-[clamp(3rem,8vw,5rem)] font-bold text-[#F4F6FB] leading-none">
          Announcements
        </h1>
        <p class="text-[#6B7280] mt-6 max-w-2xl text-lg">
          Stay updated with the latest news, call for papers, and workshop information.
        </p>
      </div>
    </div>

    <div class="flex-1 px-[8vw] pb-24">
      <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
          <article v-for="(article, index) in articles" :key="article.path" class="reveal">
            <NuxtLink :to="article.path"
              class="group relative block overflow-hidden card-dark p-6 md:p-8 min-h-[10rem] hover:border-[rgba(30,110,241,0.25)] hover:shadow-[0_18px_50px_rgba(30,110,241,0.12)] transition-[box-shadow,border-color] duration-300">

              <div
                class="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-[#1E6EF1] via-[#3B82F6] to-[#60A5FA] opacity-70 group-hover:opacity-100 group-hover:w-[4px] transition-[width,opacity] duration-300" />

              <span v-if="index === 0"
                class="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#1E6EF1]/20 to-[#60A5FA]/15 border border-[#1E6EF1]/30 font-mono-label text-[#60A5FA]">
                <Sparkles :size="11" /> Latest
              </span>

              <div class="flex items-start gap-5 md:gap-6">
                <div class="flex-shrink-0">
                  <div
                    class="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-gradient-to-br from-[#1E6EF1]/20 via-[#60A5FA]/10 to-[#1E6EF1]/5 flex items-center justify-center shadow-[0_4px_18px_rgba(30,110,241,0.18)]">
                    <span class="font-['Space_Grotesk'] font-bold text-[#60A5FA] text-2xl tracking-tight">
                      {{ dayOf(article.date) }}
                    </span>
                  </div>
                  <div class="text-center mt-2 leading-tight">
                    <div class="font-mono-label text-[#60A5FA]">{{ shortMonth(article.date) }}</div>
                    <div class="font-mono-label text-[#6B7280] mt-0.5">{{ yearOf(article.date) }}</div>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h2
                    class="font-['Space_Grotesk'] text-xl md:text-2xl font-semibold text-[#F4F6FB] group-hover:text-[#93C5FD] transition-colors duration-300 mb-3 line-clamp-2">
                    {{ article.title }}
                  </h2>
                  <p v-if="article.description" class="text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                    {{ article.description }}
                  </p>

                  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6B7280] mb-4">
                    <span class="flex items-center gap-1.5">
                      <CalendarDays :size="13" class="text-[#60A5FA]" />
                      <time :datetime="article.date">{{ formatBlogDate(article.date) }}</time>
                    </span>
                    <span v-if="article.author" class="flex items-center gap-1.5">
                      <UserPen :size="13" class="text-[#60A5FA]" />
                      {{ article.author }}
                    </span>
                  </div>

                  <span
                    class="inline-flex items-center gap-1 text-[#60A5FA] text-sm font-medium group-hover:text-[#93C5FD] transition-colors duration-300">
                    <span>Read more</span>
                    <ArrowRight :size="16" class="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <div v-if="!articles?.length" class="text-center py-20">
          <div class="w-20 h-20 rounded-2xl bg-[#1E6EF1]/10 flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 class="font-['Space_Grotesk'] text-xl font-semibold text-[#F4F6FB] mb-2">No announcements yet</h3>
          <p class="text-[#6B7280]">Check back later for updates.</p>
        </div>
      </div>
    </div>

    <Foot />
  </div>
</template>
