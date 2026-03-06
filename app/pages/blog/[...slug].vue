<script lang="ts" setup>
import Foot from '~/layouts/components/foot.vue';
import Navigation from '../components/Navigation.vue';
import { CalendarDays, UserPen } from 'lucide-vue-next';
import 'github-markdown-css/github-markdown-dark.css'
import { blogNavs } from './index.vue';

definePageMeta({
  layout: false,
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
if (!page.value) {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
}
</script>

<template>
  <div v-if="page">
    <Navigation name="DT4H ANNOUNCEMENT" logo-url="/blog" :navs="blogNavs" />
    <div class="bg-[#0B0C0F] pt-24 pb-16 px-[8vw]">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-4 mb-6">
        </div>
        <h1 class="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] font-bold text-[#F4F6FB] leading-none">
          {{ page.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-6 text-[#A6ACB8] mt-6">
          <div class="flex items-center gap-2">
            <UserPen :size="18" /> {{ page.author }}
          </div>
          <div class="flex items-center gap-2">
            <CalendarDays :size="18" /> {{ page.date }}
          </div>
        </div>
      </div>
    </div>
    <div class="markdown-body max-w-[900px] prose lg:prose-xl" style="margin: 0 8vw">
      <ContentRenderer v-if="page" :value="page" />
    </div>
    <Foot />
  </div>
</template>
