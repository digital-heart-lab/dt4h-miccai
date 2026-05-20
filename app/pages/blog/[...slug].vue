<script lang="ts" setup>
import Foot from '~/layouts/components/foot.vue';
import Navigation from '../components/Navigation.vue';
import { ArrowLeft, CalendarDays, Clock, UserPen } from 'lucide-vue-next';
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

type BodyNode = { type?: string; tag?: string; value?: string; children?: BodyNode[] }

function collectText(node: BodyNode | undefined, skip = false): string {
  if (!node) return ''
  const tag = node.tag?.toLowerCase()
  if (tag === 'code' || tag === 'pre') skip = true
  let out = ''
  if (!skip && typeof node.value === 'string') out += ' ' + node.value
  if (node.children) {
    for (const child of node.children) out += collectText(child, skip)
  }
  return out
}

const readingMinutes = computed(() => {
  try {
    const body = (page.value as any)?.body as BodyNode | undefined
    if (!body) return 1
    const text = collectText(body).trim()
    if (!text) return 1
    const words = text.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
  } catch {
    return 1
  }
})
</script>

<template>
  <div v-if="page" class="min-h-screen flex flex-col bg-[#0B0C0F]">
    <Navigation name="ANNOUNCEMENT" logo-url="/blog" :navs="blogNavs" />

    <div class="relative pt-24 pb-16 px-[8vw] overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1E6EF1]/[0.05] rounded-full blur-[150px]" />
        <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#60A5FA]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <NuxtLink to="/blog"
          class="inline-flex items-center gap-2 text-sm text-[#60A5FA] hover:text-[#93C5FD] transition-colors duration-300 mb-8 group">
          <ArrowLeft :size="16" class="group-hover:-translate-x-0.5 transition-transform duration-300" />
          <span>Back to announcements</span>
        </NuxtLink>

        <h1
          class="font-['Space_Grotesk'] text-[clamp(2.5rem,7vw,5rem)] font-bold text-[#F4F6FB] leading-[1.05] tracking-tight">
          {{ page.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-[#A6ACB8] mt-8">
          <div class="flex items-center gap-2">
            <UserPen :size="16" class="text-[#60A5FA]" />
            <span>{{ page.author }}</span>
          </div>
          <div class="h-4 w-px bg-[rgba(244,246,251,0.12)] hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <CalendarDays :size="16" class="text-[#60A5FA]" />
            <time :datetime="page.date">{{ formatBlogDate(page.date) }}</time>
          </div>
          <div class="h-4 w-px bg-[rgba(244,246,251,0.12)] hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <Clock :size="16" class="text-[#60A5FA]" />
            <span>{{ readingMinutes }} min read</span>
          </div>
        </div>
      </div>
    </div>

    <div class="markdown-body max-w-[900px] prose prose-invert lg:prose-xl flex-1"
      style="margin: 0 8vw; background: transparent">
      <ContentRenderer v-if="page" :value="page" />
    </div>

    <Foot />
  </div>
</template>
