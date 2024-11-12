<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/users.js'
import { getSavedUsernames } from '@/services/LocalStorageService.js'
import { Trash2, UserPlus } from 'lucide-vue-next';

onMounted(() => {
    document.querySelector('#userInput').focus()
})

const userInput = ref(null)
const ranks = ref([])
const errors = ref([])

const userStore = useUserStore()

const addUsernamesAndClearInput = async (usernames) => {
    userStore.addUser(usernames)
    userInput.value = ''
}

</script>

<template>
    <div>
        <form class="flex w-full gap-2 flex-col sm:flex-row" @submit.prevent="addUsernamesAndClearInput(userInput)">
            <input id="userInput" class="px-2 border border-gray-600 rounded-md w-full py-1 dark:bg-blue-100 text-gray-900 focus:outline-none" type="text" v-model="userInput" placeholder="Enter usernames separated by semicolon (;)" />
            <button class="flex items-center justify-center px-4 rounded-lg bg-blue-800 py-1 hover:bg-blue-700 shrink-0">
              <div class="flex gap-2 items-center text-white">
                  <UserPlus class="h-4 w-4"/>
                  <span class="text-white">Add users</span>
              </div>
            </button>
            <button class="flex items-center justify-center px-4 rounded-lg bg-slate-200 py-1 hover:bg-slate-300 dark:text-black shrink-0" type="button" @click="userStore.removeAllUsers">
              <div class="flex items-center gap-2">
                  <Trash2 class="h-4 w-4"/>
                  <span>Remove all users</span>
              </div>
            </button>
        </form>

        <p v-if="errors.length">
          <ul v-for="error in errors" :key="error">
            <li style="color: red">{{ error }}</li>
          </ul>
        </p>
    </div>
</template>
