<script setup lang="ts">
import { ArrowRight, History } from 'lucide-vue-next';
import CommitteeMember from './CommitteeMember.vue';
import type { Committee } from '~/models/workshop';
const props = withDefaults(defineProps<{
  title?: string
  data?: Committee
}>(), {
  title: 'Committee'
})
const { data: committee } = await useFetch<Committee[]>(`/api/comittee/standing`)
const standingCommittee = computed(() => committee.value!.find(c => c.type === 'standing')!)

</script>

<template>
  <section id="committee" class="section-dark py-24 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <div class="reveal mb-8">
        <div class="font-mono-label text-[#1E6EF1] mb-4">Organization</div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F4F6FB]">
          {{ title }}
        </h2>
      </div>
      <div v-if="data" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
        <CommitteeMember v-for="member in data.member" :member="member" />
      </div>

      <template v-else>
        <h3 class="mb-4 ml-1">Standing Member</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
          <CommitteeMember v-for="member in standingCommittee.member" :member="member" />
        </div>
      </template>
    </div>
  </section>
</template>
