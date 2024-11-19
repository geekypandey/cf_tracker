<template>
    <div class="relative z-10">
      <div class="relative flex items-center gap-1 hover:cursor-pointer z-10" @click="isOpen = !isOpen">
          <div class="text-white font-semibold">Upcoming Contests</div>
          <ChevronDown class="h-4 w-4 text-white" />
      </div>
      <button @click="isOpen = false" v-if="isOpen" class="fixed inset-0 w-full h-full cursor-default bg-black opacity-20"></button>
      <div class="absolute right-0 border border-gray-800 bg-white rounded px-2 mt-2 z-10 shadow-xl" v-if="isOpen">
        <div v-for="contest in upcomingContests" :key="contest.id" class="group w-56 border-b border-gray-400 px-2 py-1 hover:bg-gray-200 hover:cursor-pointer">
          <a :href="contest.link" target="_blank">{{  contest.name }}</a>
          <div class="text-gray-500 text-xs">{{ contest.startDate }}</div>
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
