<script setup lang="ts">
import Navigation from '~/pages/components/Navigation.vue';
import useAnimation from '~/pages/composables/useAnimation';
import Foot from './components/foot.vue';

useAnimation()
</script>

<template>
  <div>
    <Navigation :navs="[
      {
        label: 'Workshop 2026',
        url: '/workshops/2026'
      },
      {
        label: 'Workshop 2025',
        url: '/workshops/2025'
      }, {
        label: 'Blog',
        url: '/blog'
      }
    ]" />
    <slot></slot>
    <Foot />
  </div>
</template>