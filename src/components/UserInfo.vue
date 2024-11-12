<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/users'
import { CircleX } from 'lucide-vue-next';

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
</script>

<template>
    <div v-if="users">
        <div class="flex flex-wrap space-x-4">
            <div v-for="user in users" class="flex items-center justify-center space-x-1 bg-white border border-black rounded-full dark:border-white">
                <img :src="user.avatar" class="h-6 w-6 rounded-full object-cover"/>
                <div class="px-1" :class="user.rank.split(' ').join('-')">{{ user.handle }}</div>
                <CircleX class="text-gray-800 hover:cursor-pointer hover:text-red-600" @click="userStore.removeUser(user.handle)"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.newbie {
  color: gray;
}

.pupil {
  color: rgb(136, 204, 34);
}

.apprentice {
  color: green;
}

.specialist {
  color: rgb(3, 168, 158);
}

.expert {
  color: blue;
}

.candidate-master {
  color: rgb(170, 0, 170);
}

.master,
.international-master {
  color: rgb(255, 140, 0);
}

.international-master::first-letter {
    color: red;
}

.grandmaster,
.international-grandmaster,
.legendary-grandmaster {
  color: red;
}

.legendary-grandmaster::first-letter {
    color: black;
}

.tourist {
    color: black;
}

.tourist::first-letter {
    color: red;
}
</style>
