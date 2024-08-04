<script setup>
import { ref } from 'vue'

import ContestView from '@/views/ContestView.vue'

const showNewFeatures = ref(false);
</script>

<template>
  <header class="flex bg-slate-300 py-2">
    <span class="ml-96 text-3xl font-medium">CF-TRACKER</span>
    <div class="ml-96 flex space-x-12" v-if="showNewFeatures">
      <span class="text-xl py-1">Upcoming contests</span>
      <span class="text-xl py-1">Playground</span>
    </div>
  </header>
  <main class="my-1 ml-32">
      <ContestView />
  </main>
</template>
