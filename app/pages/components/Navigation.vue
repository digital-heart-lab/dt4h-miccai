<script setup lang="ts">
import logo from "~~/app/assets/images/logo-icon.png"

interface NavItem {
  label: string,
  id?: string,
  url?: string
}

const props = withDefaults(defineProps<{
  name?: string;
  year?: number;
  logoUrl?: string;
  navs: NavItem[];
}>(), {})

const scrolled = ref(false)
const handleScroll = () =>
  scrolled.value = window.scrollY > 100;

const goHome = () => {
  navigateTo(props.logoUrl || (props.year ? `/workshops/${props.year}` : "/"))
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
})

const navTo = (nav: NavItem) => {
  if (nav.id) {
    scrollTo(nav.id)
  } else {
    navigateTo(nav.url!)
  }
}

function scrollTo(id: string) {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};
</script>

<template>
  <nav :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
    ? 'bg-[#0B0C0F]/90 backdrop-blur-md border-b border-[rgba(244,246,251,0.08)]' : 'bg-transparent'}`">
    <div class="w-full px-[4vw] py-4 flex items-center justify-between">
      <div class="flex items-center w-[200px] cursor-pointer" @click="goHome">
        <div class="h-[30px] w-[30px] bg-no-repeat bg-center bg-contain" :style="{
          'background-image': `url('${logo}')`
        }"></div>
        <span class="font-[Space_Grotesk] text-white font-semibold text-xl ml-2">
          {{ name || `D4TH ${year || ''}` }}
        </span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <button v-for="item in navs" @click="navTo(item)"
          class="text-sm text-[#A6ACB8] hover:text-[#F4F6FB] transition-colors">
          {{ item.label }}
        </button>
      </div>
    </div>
  </nav>
</template>