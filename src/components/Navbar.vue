<template>
    <nav class="navbar flex justify-between content-center">
      <div class="navbar-logo">
        <router-link to="/">/</router-link>
      </div>
      <ul class="navbar-links flex gap-10">
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/">Home</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  }
  </script>
  
  <style scoped>
  .navbar {
    padding: 20px 30px;
    border: 1px solid black;
    border-top: none;
    border-radius: 0 0 10px 10px;
  }
  
  .navbar-links {
    list-style: none;
  }
  
  .navbar-links li a {
    text-decoration: none;
  }
  
  </style>
  