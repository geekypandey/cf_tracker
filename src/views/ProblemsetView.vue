<script setup>
import { ref, computed } from 'vue'
import ContestsData from '@/data/contests.json'
import ProblemCard from '@/components/ProblemCard.vue'
import { Search } from 'lucide-vue-next';

const contests = ref(ContestsData.contests)

const problemNameSearch = ref('')
const selectedTags = ref([])

const problemSet = computed(() => {
    const problems = contests.value
        .map(contest => contest.problems)
        .flat()
		.filter(problem => problem != undefined)
		.slice(0, 20)

	return problems
})

const tags = computed(() => {
	// TODO: improve this tags sorting
	const tagList = problemSet.value.map(problem => problem.tags)
							.flat(1)
	return [...new Set(tagList)]
})
</script>

<template>
	<div class="flex gap-2 min-h-screen">
		<div class="flex flex-col gap-2 border-2 bg-white">
			<div class="relative p-2">
			  <input
				v-model="problemNameSearch"
				type="text"
				placeholder="Search problems..."
				class="w-full pl-10 pr-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			  />
			  <Search class="absolute left-3 top-3.5 h-5 w-5 text-gray-400"/>
			</div>
			<div class="p-2 gap-2 flex flex-col">
				<div class="text">Tags</div>
				<ul>
					<li class="text-sm text-zinc-600 flex gap-1" v-for="tag in tags" :key="tag">
						<input type="checkbox" :id="tag" :value="tag" v-model="selectedTags"/>
						<label :for="tag">{{ tag }}</label>
					</li>
				</ul>
			</div>
		</div>
		<div class="flex-1 p-4 overflow-y-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			  <ProblemCard v-for="(problem, index) in problemSet" :key="index" :problem="problem" />
			</div>
		</div>
	</div>

    <div class="p-4 bg-white border-b">
    </div>
</template>
