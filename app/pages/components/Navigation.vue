<script setup lang="ts">
import logo from "~~/app/assets/images/logo.png"

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
  <nav
    :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-[#0B0C0F]/85 backdrop-blur-xl border-b border-[rgba(244,246,251,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'}`">
    <div class="w-full px-[4vw] py-4 flex items-center justify-between">
      <div class="flex items-center cursor-pointer group" @click="goHome">
        <img class="h-[40px] object-contain" :src="logo" />
        <span class="font-[Space_Grotesk] text-white font-semibold text-xl ml-2.5 tracking-tight">
          {{ name || `${year || ''}` }}
        </span>
      </div>

      <div class="hidden md:flex items-center gap-1">
        <button v-for="item in navs" @click="navTo(item)"
          class="text-sm text-[#A6ACB8] hover:text-[#F4F6FB] transition-all duration-300 px-4 py-2 rounded-full hover:bg-[rgba(244,246,251,0.05)]">
          {{ item.label }}
        </button>
      </div>

      <button @click="toggleMobileMenu"
        class="md:hidden relative z-[60] w-[40px] h-[40px] flex flex-col justify-center items-center rounded-full hover:bg-[rgba(244,246,251,0.05)] transition-colors duration-300">
        <span
          :class="`block w-5 h-[2px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`"></span>
        <span
          :class="`block w-5 h-[2px] bg-white my-[4px] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`"></span>
        <span
          :class="`block w-5 h-[2px] bg-white transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`"></span>
      </button>
    </div>

    <div
      :class="`fixed inset-0 top-[62px] z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`">
      <div class="absolute inset-0 bg-[#0B0C0F]/98 backdrop-blur-xl" @click="closeMobileMenu"></div>
      <div
        :class="`absolute top-0 left-0 right-0 bg-[#0B0C0F] border-b border-[rgba(244,246,251,0.08)] transform transition-transform duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`">
        <div class="px-[4vw] py-8 flex flex-col gap-2">
          <button v-for="(item, index) in navs" @click="navTo(item)"
            class="text-center text-lg text-[#A6ACB8] hover:text-[#F4F6FB] transition-all duration-300 py-3 px-4 rounded-xl hover:bg-[rgba(244,246,251,0.05)] hover:pl-6"
            :style="{ transitionDelay: `${index * 0.05}s` }">
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>