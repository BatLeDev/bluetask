<template>
  <Header />

  <v-container>
    <h1>Dashboard</h1>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'

const router = useRouter()

const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    alert('you must be logged in to view this. redirecting to the home page')
    router.push('/')
  }
})

onBeforeUnmount(() => {
  authListener()
})
</script>

<style scoped>
</style>
