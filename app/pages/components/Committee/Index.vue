<script setup lang="ts">
import CommitteeMember from './CommitteeMember.vue';
import type { Committee } from "~~/shared/schemas/workshop"
const props = withDefaults(defineProps<{
  title?: string
  data?: Committee
}>(), {
  title: 'Organizer'
})
const { data: standingCommittee } = await useAsyncData(() =>
  queryCollection('committee').where('type', '=', 'standing').first()
)

</script>

<template>
  <section id="committee" class="section-dark py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#1E6EF1]/[0.03] rounded-full blur-[120px]" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="reveal mb-14">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <div class="font-mono-label text-[#60A5FA]">Organization</div>
        </div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#F4F6FB] leading-tight">
          {{ title }}
        </h2>
      </div>
      <div v-if="data" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
        <CommitteeMember v-for="member in data.members" :member="member" />
      </div>

      <template v-else-if="standingCommittee">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
          <CommitteeMember v-for="member in standingCommittee.members" :member="member" />
        </div>
      </template>
    </div>
  </section>
</template>
