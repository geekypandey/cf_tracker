<template>
  <header class="flex flex-col bg-blue-900 items-center justify-around">
    <div class="flex justify-around items-center py-2 w-full">
      <div>
        <!-- Change the font of this heading -->
        <span class="text-3xl font-medium text-white">&lt;CF-TRACKER /&gt;</span>
      </div>
      <div class="hidden md:flex justify-around gap-16">
        <div class="flex divide-x-2 font-semibold text-lg text-white">
          <div>
            <RouterLink to="/problemset" class="px-2 hover:text-gray-800 hover:bg-white hover:rounded mx-2">Problemset</RouterLink>
          </div>
          <div>
            <RouterLink to="/contests" class="px-2 hover:text-gray-800 hover:bg-white hover:rounded mx-2">Contests</RouterLink>
          </div>
        </div>
        <UpcomingContestsDropdown />
      </div>
      <div class="hover:cursor-pointer items-center">
          <div>
              <Sun class="text-white h-6 w-6" fill="white" @click="toggleDarkMode()" v-if="isDarkMode"/>
              <MoonStar class="text-black h-6 w-6" fill="black" @click="toggleDarkMode()" v-else/>
          </div>
      </div>
      <div class="md:hidden block text-white">
        <Menu class="text-white h-6 w-6 hover:cursor-pointer"  @click="showMenu = !showMenu"/>
      </div>
    </div>
    <div v-if="showMenu" class="flex flex-col md:hidden justify-center items-center w-full text-white px-4 border-t-2 border-gray-800">
      <div class="hover:cursor-pointer w-full font-semibold text-lg text-center">Contests</div>
      <div class="hover:cursor-pointer w-full font-semibold text-lg text-center">Problemset</div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MoonStar, Sun, Menu } from 'lucide-vue-next';
import UpcomingContestsDropdown from '@/components/UpcomingContestsDropdown.vue'

const isDarkMode = ref(document.documentElement.classList.contains('dark'));
const showMenu = ref(false);

const setUserPreferredTheme = () => {
    const userPreference = localStorage.getItem('theme')
    if (userPreference === 'dark') {
        isDarkMode.value = true;
        document.documentElement.classList.add('dark');
    } else if (userPreference === 'light') {
        isDarkMode.value = false;
        document.documentElement.classList.remove('dark');
    }
}

const toggleDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.toggle('dark');
    if (isDarkMode.value) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
}

onMounted(() => {
  setUserPreferredTheme();
})
</script>
