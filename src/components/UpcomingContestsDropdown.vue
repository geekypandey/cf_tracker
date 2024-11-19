<template>
    <div class="relative" @mouseover="isOpen = true" @mouseleave="isOpen = false">
      <div class="flex items-center gap-1 hover:cursor-pointer">
          <div class="text-white font-semibold">Upcoming Contests</div>
          <ChevronDown class="h-4 w-4 text-white" />
      </div>
      <div class="absolute right-0 border border-gray-800 bg-white rounded px-2 mt-2 shadow-xl" v-if="isOpen" @mouseover="isOpen = true">
        <div v-for="contest in upcomingContests" :key="contest.id" class="group w-56 border-b border-gray-400 px-2 py-1 hover:bg-gray-200 cursor-default">
          <span>{{  contest.name }}</span>
          <div class="text-gray-500 text-xs">{{ contest.startDate }}</div>
          <a :href="contest.link" target="_blank" class="text-white text-sm underline bg-red-700 rounded px-1" v-if="contest.link !== ''">Register</a>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useContestStore } from '@/stores/contests'
import { storeToRefs } from 'pinia'
import { ChevronDown } from 'lucide-vue-next'

const contestStore = useContestStore()
const { upcomingContests } = storeToRefs(contestStore)
const isOpen = ref(false)

const handleEscape = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    isOpen.value = false
  }
}

document.addEventListener('keydown', handleEscape)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>
