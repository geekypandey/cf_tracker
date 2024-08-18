import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getUserInfo } from '@/services/CodeforcesApiService'

export const useUserStore = defineStore('users', () => {
    const users = ref([])

    function _isUserAlreadyPresent(username) {
        return users.value.find(userInfo => userInfo.handle === username)
    }

    function _extractUsernamesFromString(usernames) {
        return usernames.split(';')
            .map(username => username.trim())
            .filter(username => username.length !== 0)
            .map(username => username.toLowerCase())
            .filter(username => !_isUserAlreadyPresent(username))
    }

    async function addUser(usernames) {
        // TODO: handle the case when you get one or more incorrect usernames
        const usernameList = await _extractUsernamesFromString(usernames)
        if (usernameList.length === 0) return
        const userInfo = await getUserInfo(usernameList);
        users.value.push(...userInfo)
    }

    function removeUser(userToRemove) {
        users.value = users.value.filter(user => user.handle !== userToRemove)
    }

    function removeAllUsers() {
        users.value = []
    }

    return { users, addUser, removeUser, removeAllUsers }
})
