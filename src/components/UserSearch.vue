<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/users.js'
import { getSavedUsernames } from '@/services/LocalStorageService.js'

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white">Add users</span>
              </div>
            </button>
            <button class="flex items-center justify-center px-4 rounded-lg bg-slate-200 py-1 hover:bg-slate-300 dark:text-black shrink-0" type="button" @click="userStore.removeAllUsers">
              <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
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
