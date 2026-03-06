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
const mobileMenuOpen = ref(false)
const handleScroll = () =>
  scrolled.value = window.scrollY > 100;

const goHome = () => {
  navigateTo(props.logoUrl || (props.year ? `/workshops/${props.year}` : "/"))
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const navTo = (nav: NavItem) => {
  closeMobileMenu()
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
      <div class="flex items-center cursor-pointer" @click="goHome">
        <div class="h-[30px] w-[30px] bg-no-repeat bg-center bg-contain" :style="{
          'background-image': `url('${logo}')`
        }"></div>
        <span class="font-[Space_Grotesk] text-white font-semibold text-xl ml-2">
          {{ name || `DT4H ${year || ''}` }}
        </span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <button v-for="item in navs" @click="navTo(item)"
          class="text-sm text-[#A6ACB8] hover:text-[#F4F6FB] transition-colors">
          {{ item.label }}
        </button>
      </div>

      <button @click="toggleMobileMenu"
        class="md:hidden relative z-[60] w-[32px] h-[32px] flex flex-col justify-center items-center">
        <span
          :class="`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`"></span>
        <span
          :class="`block w-6 h-[2px] bg-white my-[4px] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`"></span>
        <span
          :class="`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`"></span>
      </button>
    </div>

    <div
      :class="`fixed inset-0 top-[62px] z-40 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`">
      <div class="absolute inset-0 bg-[#0B0C0F]/95 backdrop-blur-lg" @click="closeMobileMenu"></div>
      <div
        :class="`absolute top-0 left-0 right-0 bg-[#0B0C0F] border-b border-[rgba(244,246,251,0.08)] transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`">
        <div class="px-[4vw] py-6 flex flex-col gap-4">
          <button v-for="item in navs" @click="navTo(item)"
            class="text-center text-lg text-[#A6ACB8] hover:text-[#F4F6FB] transition-colors py-2">
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>