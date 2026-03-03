<script setup lang="ts">
import { CalendarDays, CheckCircle, Rocket } from 'lucide-vue-next';

const props = defineProps<{
  status: 'completed' | 'ongoing' | 'upcoming'
}>()

const statusColor = computed(() => {
  switch (props.status) {
    case 'completed':
      return '#10B981'
    case 'ongoing':
      return '#ff4242'
    case 'upcoming':
      return '#e7803a'
  }
})

const statusLabel = computed(() => `${props.status[0]!.toLocaleUpperCase()}${props.status.slice(1)}`)
</script>

<template>
  <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
    :style="{ color: statusColor, background: `${statusColor}34` }">
    <CheckCircle v-if="status === 'completed'" :size="12" />
    <CalendarDays v-else-if="status === 'upcoming'" :size="12" />
    <Rocket v-else-if="status === 'ongoing'" :size="12" />
    {{ statusLabel }}
  </div>
</template>