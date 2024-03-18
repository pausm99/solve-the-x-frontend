<script setup>
    import Navbar from './components/Navbar.vue'; 
</script>


<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="py-16">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
</style>
