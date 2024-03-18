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
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="player in players" :key="player.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ player.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.age }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.position }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.height }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ player.weight }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="deletePlayer(player.id)" class="bg-red-700">DELETE</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { Player } from '../types/Player';
import { deletePlayerById, getPlayers } from '../services/playersApi';

export default defineComponent({
  setup() {
    const players = reactive<Player[]>([]);

    const fetchPlayers = async () => {
      try {
        const fetchedPlayers = await getPlayers();
        players.push(...fetchedPlayers);
      } catch (error) {
        console.log('Error fetching players', error);
      }
    };

    onMounted(fetchPlayers);

    const deletePlayer = async (id: number) => {
      try {
        const response = await deletePlayerById(id);
        if (response) {
          const index = players.findIndex(player => player.id === id);
          if (index !== -1) {
            players.splice(index, 1);
          }
        }
      } catch (error) {
        console.log('Error deleting player', error);
      }
    };

    return { players, deletePlayer };
  }
});
</script>
