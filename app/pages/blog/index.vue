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
import { ArrowRight } from 'lucide-vue-next';
definePageMeta({
  layout: false,
})

useAnimation()

const { data: articles } = await useAsyncData('blog-list', () => {
  return queryCollection('blog').where('path', 'LIKE', '/blog/%').all()
})
console.log(articles.value)
</script>

<template>
  <div class="min-h-[100vh] flex flex-col bg-[#0B0C0F]">
    <Navigation name="ANNOUNCEMENT" logo-url="/blog" :navs="blogNavs" />

    <div class="relative pt-32 pb-20 px-[8vw] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1E6EF1]/[0.03] rounded-full blur-[150px]" />
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

    <div class="flex-1 px-[8vw] pb-20">
      <div class="max-w-4xl">
        <div class="space-y-6">
          <article v-for="(article, index) in articles" :key="article.path" class="reveal">
            <div class="group block card-dark p-8  transition-all duration-500">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0">
                  <div
                    class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/15 to-[#60A5FA]/5 flex items-center justify-center transition-all duration-500">
                    <span class="font-['Space_Grotesk'] font-bold text-[#60A5FA] text-lg">
                      {{ new Date(article.date).getDate() }}
                    </span>
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-xs text-[#6B7280] font-mono-label">
                      {{ new Date(article.date).toLocaleString('default', { month: 'short' }).toUpperCase() }}
                    </span>
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h2
                    class="font-['Space_Grotesk'] text-2xl font-semibold text-[#F4F6FB]  transition-colors duration-300 mb-3 line-clamp-2">
                    {{ article.title }}
                  </h2>
                  <p class="text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                    {{ article.description }}
                  </p>
                  <NuxtLink :to="`${article.path}`"
                    class="flex items-center gap-1 text-[#60A5FA] text-sm font-medium hover:text-[#1E6EF1] transition-colors duration-300">
                    <span>Read more</span>
                    <ArrowRight :size="16" />
                  </NuxtLink>
                </div>
              </div>
            </div>
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