import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getUserInfo, getUserSubmissions } from '@/services/CodeforcesApiService'

export const useUserStore = defineStore('users', () => {
    const users = ref([])

    _loadFromStorage();

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
        for (const user of userInfo) {
            const userSubmissions = await getUserSubmissions(user.handle)
            user.submissions = userSubmissions;
        }
        users.value.push(...userInfo)

        _saveToStorage();
    }

    function removeUser(userToRemove) {
        users.value = users.value.filter(user => user.handle !== userToRemove)
        _saveToStorage();
    }

    function removeAllUsers() {
        users.value = []
        _saveToStorage();
    }

    function _loadFromStorage() {
        const usernames = localStorage.getItem('cf-users') || '';
        addUser(usernames);
    }

    function _saveToStorage() {
        const usernames = users.value.map(user => user.handle).join(';')
        localStorage.setItem('cf-users', usernames)
    }

    return { users, addUser, removeUser, removeAllUsers }
})
