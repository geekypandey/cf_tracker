<script setup>
import { ref } from 'vue'

import ContestView from '@/views/ContestView.vue'

const showNewFeatures = ref(false);
</script>

<template>
  <header class="flex bg-blue-900 py-2 items-center justify-around">
    <div>
      <!-- Change the font of this heading -->
      <span class="text-3xl font-medium text-white">&lt;CF-TRACKER /&gt;</span>
    </div>
    <div class="flex justify-between ml-64 items-center space-x-5">
      <span class="text-xl text-white">Contests</span>
      <span class="text-xl text-white">|</span>
      <span class="text-xl text-white">Problemsets</span>
    </div>
    <div class="flex">
      <div class="flex items-center space-x-2">
          <span class="text-xl text-white">Upcoming Contests</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-white">
            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
          </svg>
      </div>
    </div>
  </header>
  <main>
      <ContestView />
  </main>
</template>
