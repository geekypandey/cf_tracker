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
</script>

<template>
    <div class="flex space-x-2">
        <div class="flex space-x-1">
            <input type="checkbox" id="div1" value="1" v-model="selectedDivisions" />
            <label for="div1">Div 1</label>
        </div>
        <div class="flex space-x-1">
            <input type="checkbox" id="div2" value="2" v-model="selectedDivisions" />
            <label for="div2">Div 2</label>
        </div>
        <div class="flex space-x-1">
            <input type="checkbox" id="div3" value="3" v-model="selectedDivisions" />
            <label for="div3">Div 3</label>
        </div>
        <div class="flex space-x-1">
            <input type="checkbox" id="div4" value="4" v-model="selectedDivisions" />
            <label for="div4">Div 4</label>
        </div>
        <div class="flex space-x-1">
            <input type="checkbox" id="educational" value="E" v-model="selectedDivisions" />
            <label for="educational">Educational Rounds</label>
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
