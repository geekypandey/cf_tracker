<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/users'
import { useFilterStore } from '@/stores/filters'

const selected = ref([])
const picked = ref('any')

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const filterStore = useFilterStore()
const { selectedDivisions, participantType } = storeToRefs(filterStore)

const divisionFilters = [
    { name: 'Div. 1', value: '1', id: 'div1'},
    { name: 'Div. 2', value: '2', id: 'div2'},
    { name: 'Div. 3', value: '3', id: 'div3'},
    { name: 'Div. 4', value: '4', id: 'div4'},
    { name: 'Div. 1 + Div. 2', value: '1&2', id: 'div1And2'},
    { name: 'Educational Round', value: 'E', id: 'educational'},
    { name: 'Kotlin', value: 'kotlin', id: 'kotlin'},
    { name: 'CodeTON', value: 'codeton', id: 'codeton'},
    { name: 'Global', value: 'global', id: 'global'},
    { name: 'VK Cup', value: 'vk-cup', id: 'vk-cup'},
    { name: 'April Fools', value: 'april-fools', id: 'april-fools'},
]
</script>

<template>
    <div class="flex flex-wrap">
        <div class="flex space-x-1 px-1" v-for="divFilter in divisionFilters">
            <input type="checkbox" :id="divFilter.id" :value="divFilter.value" v-model="selectedDivisions" />
            <label :for="divFilter.id">{{ divFilter.name }}</label>
        </div>
    </div>

    <div v-show="users.length" class="flex space-x-2">
        <div class="flex space-x-1">
            <input type="radio" name="whichContests" value="any" v-model="participantType" />
            <label for="all">All</label>
        </div>
        <div class="flex space-x-1">
            <input type="radio" name="whichContests" value="contestant" v-model="participantType" />
            <label for="participated">Contests Participated</label>
        </div>
        <div class="flex space-x-1">
            <input type="radio" name="whichContests" value="participant" v-model="participantType" />
            <label for="attempted">Attempted Any</label>
        </div>
    </div>
</template>
