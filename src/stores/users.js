import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
    const users = ref(new Set())

    const addUser = (userInput) => {
        userInput.split(';')
            .map(user => user.trim())
            .filter(user => user.length !== 0)
            .forEach(user => users.value.add(user))
    }

    const removeUser = (user) => {
        users.value.delete(user)
    }

    const removeAllUsers = () => {
        users.value.clear()
    }

    return { users, addUser, removeUser, removeAllUsers }
})
