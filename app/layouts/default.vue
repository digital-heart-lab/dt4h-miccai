<script setup lang="ts">
import Navigation from '~/pages/components/Navigation.vue';
import useAnimation from '~/pages/composables/useAnimation';
import Foot from './components/foot.vue';

const { data: workshops } = await useAsyncData('edition-navigation', getWorkshops)
const route = useRoute()
const navs = computed(() => [
  { label: 'Home', url: '/' },
  ...(workshops.value ?? []).map(workshop => ({ label: `DT4H ${workshop.year}`, url: `/workshops/${workshop.year}/` })),
  ...(route.path === '/' ? [] : [{ label: 'Announcements', url: '/blog' }]),
])
useAnimation()
</script>

<template>
  <div>
    <Navigation :navs="navs" />
    <slot></slot>
    <Foot />
  </div>
</template>