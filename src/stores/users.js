import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
    const users = ref([])

    function isUserAlreadyPresent(username) {
        return users.value.includes(username)
    }

    function addUser(usernames) {
        usernames.split(';')
            .map(username => username.trim())
            .filter(username => username.length !== 0)
            .map(username => username.toLowerCase())
            .filter(username => !isUserAlreadyPresent(username))
            .forEach(username => users.value.push(username))
    }

    function removeUser(userToRemove) {
        users.value = users.value.filter(user => user !== userToRemove)
    }

    function removeAllUsers() {
        users.value = []
    }

    return { users, addUser, removeUser, removeAllUsers }
})
