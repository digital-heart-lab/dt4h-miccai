<script setup lang="ts">
import type { Sponsor } from '~~/shared/schemas/person';


defineProps<{
  sponsor: Sponsor
}>()
</script>

<template>
  <a :href="sponsor.url" target="__blank">
    <div class="font-['Space_Grotesk'] text-2xl font-semibold text-[#0B0C0F]">
      <img :src="sponsor.logo" class="object-contain max-h-[80px] max-w-[200px]">
    </div>
  </a>
</template>