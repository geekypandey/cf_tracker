<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

import ContestView from '@/views/ContestView.vue'

const showNewFeatures = ref(false);
</script>

<template>
  <header class="flex bg-blue-900 py-2 items-center justify-around">
    <div>
      <!-- Change the font of this heading -->
      <span class="text-3xl font-medium text-white">&lt;CF-TRACKER /&gt;</span>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>
