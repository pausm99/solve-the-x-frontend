<template>
  <h1 class="text-center text-5xl mb-8">CRUD Football players</h1>
  <div class="flex justify-center">
    <router-link to="/statistics" class="mb-4 w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      SHOW STATS
    </router-link>
  </div>
  <form @submit.prevent="addPlayer" novalidate>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="bg-gray-50">
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (cm)</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="player in players" :key="player.id">
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">{{ player.name }}</td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
            <input v-model="playerData.name" type="text" minlength="1" maxlength="40" placeholder="Name" class="ps-2 w-full" required>
          </td>
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">{{ player.age }}</td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.age" type="number" min="1" max="100" placeholder="Age" class="ps-2 w-full" required>
          </td>
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">{{ player.position }}</td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
              <select v-model="playerData.position" class="ps-2 w-full" required>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
              </select>
          </td>
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">{{ player.height }}</td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.height" type="number" min="100" max="300" placeholder="Height (cm)" class="ps-2 w-full" required>
          </td>
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">{{ player.weight }}</td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.weight" type="number" min="20" max="200" placeholder="Weight (kg)" class="ps-2 w-full" required>
          </td>
          <td v-if="!player.editing" class="px-6 py-4 whitespace-nowrap">
            <button type="button" @click="deletePlayer(player.id!)" class="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full">DELETE</button>
            <button v-if="!playerEditing()" type="button" @click="startEditing(player.id!)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">EDIT</button>
          </td>
          <td v-else class="px-6 py-4 whitespace-nowrap">
            <button  type="button" @click="updatePlayer(player.id!)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">UPDATE</button>
            <button type="button" @click="cancelEditing(player.id!)" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">CANCEL</button>
          </td>
        </tr>
        <tr v-if="!playerEditing()">
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model="playerData.name" type="text" minlength="1" maxlength="40" placeholder="Name" class="ps-2 w-full" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.age" type="number" min="1" max="100" placeholder="Age" class="ps-2 w-full" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <select v-model="playerData.position" class="ps-2 w-full" required>
                <option value="" disabled>Position</option>
                <hr />
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.height" type="number" min="100" max="300" placeholder="Height (cm)" class="ps-2 w-full" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input :class="{ 'outline-red-500': v$.weight.$error }" v-model.number="playerData.weight" type="number" min="20" max="200" placeholder="Weight (kg)" class="ps-2 w-full" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">ADD</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-red-500 flex flex-col">
      <span v-for="error in v$.$errors" :key="error.$uid">
        {{ error.$property }} - {{ error.$message }}
      </span>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { required, minValue, maxValue, minLength, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { Player } from '../types/Player';
import { createPlayer, deletePlayerById, getPlayers, updatePlayerById } from '../services/playersApi';

export default defineComponent({
  setup() {
    // Reactive data
    const players = reactive<Player[]>([]);
    let playerData = reactive<Player>({
      name: '',
      age: NaN,
      position: '',
      height: NaN,
      weight: NaN,
    });

    // Fetch players on component mount
    onMounted(fetchPlayers);

    // Fetch players from API
    async function fetchPlayers() {
      try {
        const fetchedPlayers = await getPlayers();
        players.push(...fetchedPlayers);
      } catch (error) {
        console.error('Error fetching players', error);
      }
    }

    // Delete player by ID
    async function deletePlayer(id: number) {
      try {
        const response = await deletePlayerById(id);
        if (response) {
          const index = players.findIndex(player => player.id === id);
          if (index !== -1) {
            players.splice(index, 1);
          }
        }
      } catch (error) {
        console.error('Error deleting player', error);
      }
    }

    // Add new player
    async function addPlayer() {
      const isValid = await v$.value.$validate();
      if (isValid) {
        try {
          const createdPlayer = await createPlayer(playerData);
          if (createdPlayer) {
            players.push(createdPlayer);
            clearForm();
          } else {
            console.error('Failed to create player');
          }
        } catch (error) {
          console.error('Error adding player:', error);
        }
      }
    }

    // Update player
    async function updatePlayer(id: number) {
      try {
        const updatedPlayer: Player = await updatePlayerById(id, playerData);

        clearForm();
        
        const index = players.findIndex(player => player.id === id);
        if (index !== -1) {
          players[index] = updatedPlayer;
        }
      } catch (error) {
        console.error('Error updating player:', error);
      }
    }

    function playerEditing(): boolean {
      return players.some(player => player.editing);
    }

    function startEditing(id: number) {
      const player = findPlayerById(id);
      if (player) {
        player.editing = true;
        updatePlayerData(player);
      }
    }

    function cancelEditing(id: number) {
      const player = findPlayerById(id);
      if (player) {
        player.editing = false;
        resetPlayerData();
      }
    }

    function findPlayerById(id: number): Player | undefined {
      return players.find(player => player.id === id);
    }

    function updatePlayerData(player: Player) {
      playerData.name = player.name;
      playerData.age = player.age;
      playerData.position = player.position;
      playerData.height = player.height;
      playerData.weight = player.weight;
    }

    function resetPlayerData() {
      const emptyPlayer: Player = {
        name: '',
        age: NaN,
        position: '',
        height: NaN,
        weight: NaN
      };
      Object.assign(playerData, emptyPlayer);
    }


    // Clear form data and reset validation state
    function clearForm() {
      Object.assign(playerData, {
        name: '',
        age: 0,
        position: '',
        height: 0,
        weight: 0,
      });
      v$.value.$reset();
    }

    // Validation rules
    const rules = {
      name: { required, minLength: minLength(1), maxLength: maxLength(40) },
      age: { required, minValue: minValue(1), maxValue: maxValue(100) },
      position: { required },
      height: { required, minValue: minValue(100), maxValue: maxValue(300) },
      weight: { required, minValue: minValue(40), maxValue: maxValue(200) },
    };

    // Vuelidate instance
    const v$ = useVuelidate(rules, playerData);

    return { players, deletePlayer, addPlayer, playerData, updatePlayer, startEditing, playerEditing, cancelEditing, v$ };
  }
});

</script>

<style scoped>
    input, select {
      outline: 1px solid rgba(87, 87, 207, 0.885);
      border-radius: 5px;
    }

    tr {
      display: flex;
      flex-wrap: nowrap;
    }

    th, td {
      flex: 1;
    }

    tr:nth-child(even) {
        background-color: #f3f3f3;
    }

    tbody tr td:last-of-type {
      display: flex;
      gap: 1rem;
    }
</style>
