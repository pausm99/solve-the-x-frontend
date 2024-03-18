<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="bg-gray-50">
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postion</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (cm)</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(player, index) in players" :key="index">
          <td class="px-6 py-4 whitespace-nowrap">{{ player.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.age }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.position }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.height }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { Player } from '../types/Player';
import { getPlayers } from '../services/playersApi';

export default defineComponent({
  setup() {
    const players = reactive<Player[]>([]);

    onMounted(async () => {
      const fetchedPlayers = await getPlayers();
      players.push(...fetchedPlayers);
    });

    return { players };
  }
});
</script>

<style scoped>
  .player-table {
    width: 100%;
    border-collapse: collapse;
  }

  .player-table th,
  .player-table td {
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
  }

  .player-table th {
    background-color: #f2f2f2;
  }
</style>