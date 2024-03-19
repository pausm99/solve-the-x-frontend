<template>
    <h1 class="text-center text-5xl mb-8">Players Statistics</h1>
    <div class="bg-gray-100 p-20 flex items-center justify-center">
      <div class="p-6 max-w-lg bg-white shadow-md rounded-md">
        <div v-if="loading" class="text-center">
          <p>Loading Statistics...</p>
        </div>
        <div v-if="errorLoading" class="text-center">
          <p>No data</p>
        </div>
        <div v-else>
          <table id="stats-table" class="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th class="text-center py-3 px-6 bg-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="text-center py-3 px-6 bg-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-200 px-6 py-4">Total Players</td>
                <td class="border border-gray-200 px-6 py-4">{{ statistics.totalPlayers }}</td>
              </tr>
              <tr>
                <td class="border border-gray-200 px-6 py-4">Average Height</td>
                <td class="border border-gray-200 px-6 py-4">{{ statistics.avgHeight.toFixed(1) }} cm</td>
              </tr>
              <tr>
                <td class="border border-gray-200 px-6 py-4">Average Weight</td>
                <td class="border border-gray-200 px-6 py-4">{{ statistics.avgWeight.toFixed(1) }} kg</td>
              </tr>
              <tr>
                <td class="border border-gray-200 px-6 py-4">Top Position</td>
                <td class="border border-gray-200 px-6 py-4">{{ statistics.topPosition }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { getStatistics } from '../services/statsApi';

    export default {
        setup() {
            const statistics = reactive({
            totalPlayers: 0,
            avgHeight: 0,
            avgWeight: 0,
            topPosition: '',
            });
            const loading = ref(true);
            const errorLoading = ref(false);

            // Fetch statistics from API
            async function fetchStatistics() {
            try {
                const fetchedStatistics = await getStatistics();
                if (fetchedStatistics) {
                  Object.assign(statistics, fetchedStatistics);
                  loading.value = false;
                }
            } catch (error) {
                loading.value = false;
                errorLoading.value = true;
                console.error('Error fetching statistics', error);
            }
            }

            // Fetch statistics on component mount
            onMounted(fetchStatistics);

            return { statistics, loading, errorLoading };
        },
    };
</script>
  
<style>
    #stats-table tr td:last-of-type {
        text-align: center;
    }

    #stats-table tr:nth-child(even) {
        background-color: #f3f3f3;
    }
</style>
  