<script setup>
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/users'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

/* ["newbie", "gray"],
["pupil", "rgb(136, 204, 34)"],
["apprentice", "green"],
["specialist", "rgb(3, 168, 158)"],
["expert", "blue"],
["canditate_master", "rgb(170, 0, 170)"],
["master", "rgb(255, 140, 0)"], */
</script>

<template>
    <div v-if="users">
        <div class="flex flex-wrap space-x-4">
            <div v-for="user in users" class="flex items-center justify-center space-x-1 bg-gray-600 rounded-full pr-2 text-gray-300">
                <img :src="user.avatar" class="h-8 w-8 rounded-full object-cover"/>
                <div class="px-1">{{ user.handle }}</div>
                <button class="text-xl flex justify-center text-black" @click="userStore.removeUser(user.handle)">x</button>
            </div>
        </div>
    </div>
</template>
