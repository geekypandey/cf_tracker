<template>
  <header class="flex bg-blue-900 py-2 items-center justify-around">
    <div>
      <!-- Change the font of this heading -->
      <span class="text-3xl font-medium text-white">&lt;CF-TRACKER /&gt;</span>
    </div>
    <div class="flex text-white text-lg font-semibold divide-x-2">
      <div>
        <RouterLink to="/problemset" class="px-2 hover:text-gray-800 hover:bg-white hover:rounded mx-2">Problemset</RouterLink>
      </div>
      <div>
        <RouterLink to="/contests" class="px-2 hover:text-gray-800 hover:bg-white hover:rounded mx-2">Contests</RouterLink>
      </div>
    </div>
    <div class="hover:cursor-pointer items-center">
        <Sun class="text-white h-6 w-6" fill="white" @click="toggleDarkMode()" v-if="isDarkMode"/>
        <MoonStar class="text-black h-6 w-6" fill="black" @click="toggleDarkMode()" v-else/>
    </div>
  </header>
</template>

<script setup>
import { MoonStar, Sun } from 'lucide-vue-next';
import { ref } from 'vue'

const isDarkMode = ref(document.documentElement.classList.contains('dark'));

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

setUserPreferredTheme();
</script>
