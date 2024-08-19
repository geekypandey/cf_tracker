<script setup>
import { ref, onMounted } from 'vue'
import { getSavedUsernames } from '@/services/LocalStorageService.js'
import { useUserStore } from '@/stores/users'

onMounted(() => {
    document.querySelector('#userInput').focus()
})

const userInput = ref(null)
const ranks = ref([])
const errors = ref([])
const rememberMe = ref(true)

const userStore = useUserStore()

const addUsernamesAndClear = async (usernames) => {
    userStore.addUser(usernames)
    userInput.value = ''
}

</script>

<template>
  <div class="flex">

    <form class="flex space-x-4" @submit.prevent="addUsernamesAndClear(userInput)">
      <input id="userInput" class="px-1 py-1 border border-black rounded-md" type="text" v-model="userInput" placeholder="Enter usernames separated by semicolon (;)" size="45" />
      <button class="px-2 border-2 rounded-lg bg-slate-200 py-1">Add users</button>
      <button class="px-2 border-2 rounded-lg bg-slate-200 py-1" type="button" @click="userStore.removeAllUsers">Remove all users</button>
      <div class="flex justify-center space-x-2">
          <input type="checkbox" id="remember_me" value="true" v-model="rememberMe" />
          <!-- Is there any alternative for adding flex to label? -->
          <label for="remember_me" class="flex items-center">Remember Me?</label>
      </div>
    </form>

    <p v-show="errors.length">
      <ul v-for="error in errors" :key="error">
        <li style="color: red">{{ error }}</li>
      </ul>
    </p>
  </div>
</template>


<style scoped>
input {
  margin-left: 5px;
}
</style>
