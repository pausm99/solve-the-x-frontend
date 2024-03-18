<template>
    <h1 class="text-center text-5xl mb-8">Register</h1>
    <div class="register-form">
      <form @submit.prevent="registerUser" novalidate>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <button type="submit" :disabled="v$.$invalid">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { maxLength, minLength, required } from '@vuelidate/validators';
  import { register } from '../services/userApi';
  
  export default {
    setup() {

      const user = reactive({
        username: '',
        password: ''
      });
  
      const rules = {
        username: { required, minLength: minLength(4), maxLength: maxLength(20) },
        password: { required, minLength: minLength(6), maxLength: maxLength(15) }
      };
  
      const v$ = useVuelidate(rules, user);
  
      const registerUser = async () => {
        try {
          if (v$.value.$invalid) return;
  
          const response = await register(user.username, user.password);
  
          if (response && response.status === 201) {

            v$.value.$reset();
          }
        } catch (error) {
          console.error('Error during register process', error);
        }
      };
  
      return {
        registerUser,
        user,
        v$
      };
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  </style>
  