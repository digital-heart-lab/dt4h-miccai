<script setup lang="ts">
import type { CommitteeMember } from '~~/shared/schemas/workshop';


defineProps<{
  member: CommitteeMember
}>()
</script>

<template>
  <a :href="member.link" target="__blank" class="reveal-scale card-dark p-6 group block">
    <div class="flex items-center gap-5">
      <div
        class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/15 to-[#60A5FA]/5 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer group-hover:from-[#1E6EF1]/25 group-hover:to-[#60A5FA]/10 transition-all duration-500 shadow-[0_4px_20px_rgba(30,110,241,0.1)] group-hover:shadow-[0_8px_30px_rgba(30,110,241,0.2)]">
        <img v-if="member.avatar" :src="member.avatar" class="w-full h-full object-cover">
        <span v-else class="font-['Space_Grotesk'] font-bold text-[#60A5FA] text-lg">
          {{member.name.split(' ').map(n => n[0]).join('')}}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-['Space_Grotesk'] font-semibold text-[#F4F6FB] group-hover:text-[#60A5FA] transition-colors duration-300 truncate">{{ member.name }}</h3>
        <div class="text-sm text-[#60A5FA] mb-1.5 font-medium">{{ member.role }}</div>
        <div class="text-xs text-[#6B7280] truncate">{{ member.institution }}</div>
        <div class="text-xs text-[#4B5563]">{{ member.country }}</div>
      </div>
    </div>
  </a>
</template>