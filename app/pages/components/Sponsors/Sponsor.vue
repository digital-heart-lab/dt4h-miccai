<script setup lang="ts">
import type { Sponsor } from '~~/shared/schemas/person';

defineProps<{
  sponsor: Sponsor
}>()
</script>

<template>
  <a :href="sponsor.url" target="__blank" class="group">
    <div class="p-6 rounded-2xl bg-white border border-[rgba(11,12,15,0.06)] 
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                group-hover:shadow-[0_12px_40px_rgba(30,110,241,0.12)]
                group-hover:border-[rgba(30,110,241,0.2)]
                transition-all duration-500">
      <img :src="sponsor.logo"
        class="h-[80px] object-contain transition-transform duration-500 group-hover:scale-105">
    </div>
  </a>
</template>
