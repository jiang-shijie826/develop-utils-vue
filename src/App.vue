<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import Home from '../src/views/Home.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <TopNavBar />
        <router-link to="/"/>
      </nav>
    </div>
    <router-view />
  </header>
</template>

<style>
nav {
  text-align: center;
  width: 200%;
}
</style>
