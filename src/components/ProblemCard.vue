<script setup>
import { ref } from 'vue'

defineProps({problem: Object})
</script>

<template>
    <div class="p-4 bg-white rounded-lg shadow" v-if="problem">
      <h3 class="text-lg font-semibold mb-2">{{ problem.name }}</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in problem.tags"
          :key="tag"
          class="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
</template>
