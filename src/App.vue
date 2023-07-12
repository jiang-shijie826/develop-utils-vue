<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import Home from '../src/views/Home.vue'
import { ref, provide, nextTick } from 'vue'

const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <TopNavBar />
        <router-link to="/" />
      </nav>
    </div>
    <router-view v-if="isRouterActive" />
  </header>
</template>

<style>
nav {
  width: 200%;
}
</style>
