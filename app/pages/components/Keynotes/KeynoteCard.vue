<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import type { Keynote } from '~~/shared/schemas/workshop'
import { hostnameOf, iconForUrl, keynoteSlug } from '~/utils/linkIcons'

const props = defineProps<{
  keynote: Keynote
  index: number
  year: number
}>()

const initials = computed(() => {
  const cleaned = props.keynote.name.replace(/(Prof\.?|Dr\.?|Mr\.?|Mrs\.?|Ms\.?)\s+/gi, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (!parts.length) return '·'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
})

const indexLabel = computed(() => `Keynote ${String(props.index + 1).padStart(2, '0')}`)

const hasTalk = computed(() => Boolean(props.keynote.talkTitle))
const hasAbstract = computed(() => {
  const a = props.keynote.talkAbstract
  return Boolean(a && a.trim().toLowerCase() !== 'tbc')
})

const iconLinks = computed(() => {
  const seen = new Set<string>()
  if (props.keynote.website) seen.add(props.keynote.website)
  const list: { href: string; icon: any; label: string }[] = []
  for (const href of props.keynote.links ?? []) {
    if (seen.has(href)) continue
    seen.add(href)
    const meta = iconForUrl(href)
    list.push({ href, icon: meta.icon, label: meta.label || hostnameOf(href) })
  }
  return list
})

const hasBlogPost = computed(() => hasAbstract.value || Boolean(props.keynote.bio))
const blogHref = computed(() => `/blog/keynote-${props.year}-${keynoteSlug(props.keynote.name)}`)
</script>

<template>
  <article
    class="reveal group relative overflow-hidden rounded-[28px] bg-white border border-[rgba(11,12,15,0.06)] shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_14px_44px_rgba(30,110,241,0.10),0_4px_12px_rgba(0,0,0,0.04)] hover:border-[rgba(30,110,241,0.18)] transition-[box-shadow,border-color] duration-300 ease-out">

    <!-- Left accent rail -->
    <div
      class="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-[#1E6EF1] via-[#3B82F6] to-[#60A5FA] opacity-80 group-hover:opacity-100 group-hover:w-[4px] transition-[width,opacity] duration-300" />

    <div class="grid md:grid-cols-[minmax(220px,28%)_1fr]">
      <!-- ───────── Speaker pane ───────── -->
      <aside
        class="relative p-6 md:p-8 md:border-r md:border-[rgba(11,12,15,0.06)] md:bg-gradient-to-br md:from-[#F7F9FD] md:to-white">
        <div class="md:hidden absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#1E6EF1]/15 to-transparent" />

        <div class="flex md:flex-col items-center md:items-start gap-5 md:gap-6">
          <div
            class="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/20 via-[#60A5FA]/10 to-[#1E6EF1]/5 flex items-center justify-center flex-shrink-0 shadow-[0_4px_18px_rgba(30,110,241,0.18)]">
            <img v-if="keynote.avatar" :src="keynote.avatar" :alt="`${keynote.name} portrait`"
              class="absolute inset-0 w-full h-full object-cover rounded-2xl" />
            <span v-else class="font-['Space_Grotesk'] font-bold text-[#1E6EF1] text-xl md:text-2xl tracking-tight">
              {{ initials }}
            </span>
          </div>

          <div class="min-w-0 flex-1 md:flex-none">
            <h3 class="font-['Space_Grotesk'] text-lg md:text-xl font-semibold text-[#0B0C0F] leading-tight">
              <a v-if="keynote.website" :href="keynote.website" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 hover:text-[#1E6EF1] transition-colors duration-200">
                {{ keynote.name }}
                <ArrowUpRight class="text-[#6B7280] group-hover:text-[#1E6EF1] transition-colors duration-200" :size="16" />
              </a>
              <template v-else>{{ keynote.name }}</template>
            </h3>
            <div class="text-sm text-[#4B5563] mt-1.5 leading-snug">{{ keynote.affil }}</div>
          </div>
        </div>

        <div v-if="iconLinks.length" class="mt-5 md:mt-6 flex flex-wrap gap-2">
          <a v-for="link in iconLinks" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer"
            :title="link.label" :aria-label="link.label"
            class="w-9 h-9 rounded-xl bg-[#1E6EF1]/[0.06] border border-[#1E6EF1]/10 flex items-center justify-center text-[#1E6EF1] hover:bg-[#1E6EF1]/[0.14] hover:border-[#1E6EF1]/30 transition-colors duration-200">
            <component :is="link.icon" :size="16" />
          </a>
        </div>
      </aside>

      <!-- ───────── Keynote pane ───────── -->
      <section class="p-6 md:p-8">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="inline-flex items-center gap-1.5 font-mono-label text-[#1E6EF1] bg-[#1E6EF1]/[0.08] border border-[#1E6EF1]/15 px-2.5 py-1 rounded-full">
            {{ indexLabel }}
          </span>
          <span class="font-mono-label text-[#6B7280]">{{ keynote.topic }}</span>
        </div>

        <h4
          v-if="hasTalk"
          class="font-['Space_Grotesk'] text-xl md:text-2xl font-semibold text-[#0B0C0F] leading-snug mb-5">
          {{ keynote.talkTitle }}
        </h4>

        <p v-if="hasAbstract" class="text-[15px] text-[#374151] leading-relaxed line-clamp-4 mb-5">
          {{ keynote.talkAbstract }}
        </p>

        <NuxtLink v-if="hasBlogPost" :to="blogHref"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E6EF1] hover:text-[#1E40AF] transition-colors duration-200 group/cta">
          Read more
          <ArrowRight :size="15" class="group-hover/cta:translate-x-0.5 transition-transform duration-200" />
        </NuxtLink>
      </section>
    </div>
  </article>
</template>
