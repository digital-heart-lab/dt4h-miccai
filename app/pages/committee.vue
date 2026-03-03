<script setup lang="ts">
import type { Committee } from '~/models/workshop';
import useAnimation from './composables/useAnimation';

useAnimation()

const [standing, annual] = await Promise.all([
  $fetch(`/api/comittee/standing`),
  $fetch(`/api/comittee`)
])

const standingCommittee = standing.find(c => c.type === 'standing')! as Committee
const pastStandingCommittee = standing.find(c => c.type === 'history') as Committee
const annualCommittee = annual as Committee[]

</script>

<template>
  <div class="pt-24 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <h2 class="font-['Space_Grotesk'] text-[clamp(3rem,8vw,6rem)] font-bold text-[#F4F6FB] mb-4">
        COMMITTEE
      </h2>
    </div>
  </div>
  <section class="section-dark py-12 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <div class="reveal mb-8">
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F4F6FB]">
          Standing Committee
        </h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
        <a :href="org.link" target="__blank" v-for="org in standingCommittee.member"
          class="reveal-scale card-dark p-6 hover:bg-[#1a1c22] transition-colors block">
          <div class="flex items-center gap-4">
            <div
              class="w-20 h-20 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer">
              <img v-if="org.avatar" :src="org.avatar">
              <span v-else class="font-['Space_Grotesk'] font-bold text-[#1E6EF1]">
                {{org.name.split(' ').map(n => n[0]).join('')}}
              </span>
            </div>
            <div>
              <h3 class="font-['Space_Grotesk'] font-semibold text-[#F4F6FB]">{{ org.name }}</h3>
              <div class="text-sm text-[#1E6EF1] mb-1">{{ org.role }}</div>
              <div class="text-xs text-[#A6ACB8]">{{ org.institution }}</div>
              <div class="text-xs text-[#6B7280]">{{ org.country }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="max-w-7xl mx-auto pt-20" id="annual">
      <div class="reveal mb-8">
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F4F6FB]">
          Annual Committee
        </h2>
      </div>
      <div v-for="committee in annualCommittee">
        <h3 class="font-['Space_Grotesk'] text-[clamp(1.2rem,2vw,2.4rem)] text-[#F4F6FB] mb-2 ml-1">{{
          committee.year }}
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-10">
          <a :href="org.link" target="__blank" v-for="org in committee.member"
            class="reveal-scale card-dark p-6 hover:bg-[#1a1c22] transition-colors block">
            <div class="flex items-center gap-4">
              <div
                class="w-20 h-20 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer">
                <img v-if="org.avatar" :src="org.avatar">
                <span v-else class="font-['Space_Grotesk'] font-bold text-[#1E6EF1]">
                  {{org.name.split(' ').map(n => n[0]).join('')}}
                </span>
              </div>
              <div>
                <h3 class="font-['Space_Grotesk'] font-semibold text-[#F4F6FB]">{{ org.name }}</h3>
                <div class="text-sm text-[#1E6EF1] mb-1">{{ org.role }}</div>
                <div class="text-xs text-[#A6ACB8]">{{ org.institution }}</div>
                <div class="text-xs text-[#6B7280]">{{ org.country }}</div>
              </div>
            </div>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>