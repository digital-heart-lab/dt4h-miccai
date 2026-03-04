<script setup lang="ts">
import type { CommitteeMember } from '~~/shared/schemas/workshop';


defineProps<{
  member: CommitteeMember
}>()
</script>

<template>
  <a :href="member.link" target="__blank" class="reveal-scale card-dark p-6 hover:bg-[#1a1c22] transition-colors block">
    <div class="flex items-center gap-4">
      <div
        class="w-20 h-20 rounded-xl bg-[#1E6EF1]/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer">
        <img v-if="member.avatar" :src="member.avatar">
        <span v-else class="font-['Space_Grotesk'] font-bold text-[#1E6EF1]">
          {{member.name.split(' ').map(n => n[0]).join('')}}
        </span>
      </div>
      <div>
        <h3 class="font-['Space_Grotesk'] font-semibold text-[#F4F6FB]">{{ member.name }}</h3>
        <div class="text-sm text-[#1E6EF1] mb-1">{{ member.role }}</div>
        <div class="text-xs text-[#A6ACB8]">{{ member.institution }}</div>
        <div class="text-xs text-[#6B7280]">{{ member.country }}</div>
      </div>
    </div>
  </a>
</template>