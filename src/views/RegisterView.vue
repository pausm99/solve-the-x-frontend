<template>
    <h1 v-if="mode === 'register'" class="text-center text-5xl mb-8">Register</h1>
    <h1 v-else class="text-center text-5xl mb-8">Login</h1>
    <div class="register-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" minlength="4" maxlength="20" v-model="user.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" minlength="4" maxlength="15" v-model="user.password" required>
        </div>
        <button type="submit" :disabled="v$.$invalid">Register</button>
      </form>
    </div>
</template>
  
<script lang="ts">
import { reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { register, login } from '../services/userApi';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    let mode = ref(route.path === '/login' ? 'login' : 'register');
    
    watch(() => route.path, (newPath) => {
        mode.value = newPath === '/login' ? 'login' : 'register';
    });

    const user = reactive({
      username: '',
      password: ''
    });

    const rules = {
      user: {
        username: { required, minLength: minLength(4), maxLength: maxLength(20) },
        password: { required, minLength: minLength(4), maxLength: maxLength(15) }
      }
    };

    const v$ = useVuelidate(rules, { user });

    const registerUser = async () => {
      try {
        if (v$.value.$invalid) return;

        const response = await register(user.username, user.password);

        if (response && response.status === 201) {
          v$.value.$reset();
          loginUser();
        }
      } catch (error) {
        console.error('Error during register process', error);
      }
    };

    const loginUser = async () => {
      try {
        if (v$.value.$invalid) return;

        const response = await login(user.username, user.password);

        if (response && response.status === 200) {
          v$.value.$reset();
          user.username = user.password = '';
          router.push({ path: '/' });
        }
      } catch (error) {
        console.error('Error during login process', error);
      }
    };

    function handleSubmit() {
        mode.value === 'login' ? loginUser() : registerUser();
    }

    return {
      user,
      v$,
      registerUser,
      loginUser,
      mode,
      handleSubmit
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
  