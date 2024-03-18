<template>
  <form @submit.prevent="addPlayer" novalidate>
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
            <button type="button" @click="deletePlayer(player.id!)" class="bg-red-700 w-full">DELETE</button>
          </td>
        </tr>
        <tr>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model="playerData.name" type="text" minlength="1" maxlength="40" placeholder="Name" class="input-field" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.age" type="number" min="1" max="100" placeholder="Age" class="input-field" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model="playerData.position" type="text" placeholder="Position" class="input-field" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.height" type="number" min="100" max="300" placeholder="Height (cm)" class="input-field" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input v-model.number="playerData.weight" type="number" min="20" max="200" placeholder="Weight (kg)" class="input-field" required>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button type="submit" class="bg-green-500 w-full">ADD</button>
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
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { required, minValue, maxValue, minLength, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { Player } from '../types/Player';
import { createPlayer, deletePlayerById, getPlayers } from '../services/playersApi';

export default defineComponent({
  setup() {
    // Reactive data
    const players = reactive<Player[]>([]);
    const playerData = reactive<Player>({
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

    // Clear form data and reset validation state
    function clearForm() {
      Object.assign(playerData, {
        name: '',
        age: NaN,
        position: '',
        height: NaN,
        weight: NaN,
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

    return { players, deletePlayer, addPlayer, playerData, v$ };
  }
});

</script>
