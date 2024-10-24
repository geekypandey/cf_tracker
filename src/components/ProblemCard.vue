<script setup>
import { ref } from 'vue'

defineProps({problem: Object})
</script>

<template>
    <div class="flex bg-white flex-col space-y-2 p-6 rounded-lg shadow" v-if="problem">
        <span class="font-semibold hover:underline hover:cursor-pointer"> {{ problem.name }} </span>
        <div class="flex flex-col space-y-1" v-if="problem.tags.length > 0">
            <h4>Tags:</h4>
            <ul class="list-disc pl-6">
                <li v-for="tag in problem.tags" class="text-sm text-gray-500">{{ tag }}</li>
            </ul>
        </div>
    </div>
</template>
