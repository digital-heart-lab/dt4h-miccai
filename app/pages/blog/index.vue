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
definePageMeta({
  layout: false,
})

const { data: articles } = await useAsyncData('blog-list', () => {
  return queryCollection('blog').where('path', 'LIKE', '/blog/%').all()
})
</script>

<template>
  <div class="min-h-[100vh] flex flex-col">
    <Navigation name="DT4H BLOG" logo-url="/blog" :navs="blogNavs" />
    <div class="bg-[#0B0C0F] pt-24 pb-16 px-[8vw]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] font-bold text-[#F4F6FB] leading-none">
          BLOG
        </h1>
      </div>
    </div>
    <div class="flex-1 max-w-[900px]" style="margin: 0 8vw">
      <ul>
        <li v-for="article in articles" :key="article.path">
          <NuxtLink :to="`${article.path}`" class="my-8 block">
            <div class="font-['Space_Grotesk'] text-3xl font-semibold">
              {{ article.title }}
            </div>
            <div class="line-clamp-[3] text-justify text-gray-300">
              {{ article.description }}
            </div>
            <div class="my-2 text-gray-400">{{ article.date }}</div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <Foot />
  </div>
</template>