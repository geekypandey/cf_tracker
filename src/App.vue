<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

import ContestView from '@/views/ContestView.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const showNewFeatures = ref(false);
</script>

<template>
  <NavigationBar />
  <main>
    <RouterView />
  </main>
</template>
