<template>
  <v-container>
    <v-row
      class="mx-10"
      align="center"
    >
      <v-col>
        <h1 class="mb-4 text-h2 text-xl-h1">
          Do your tasks <span class="text-accent font-weight-medium">quickly</span> and <span
            class="text-accent font-weight-medium"
          >easy</span>
        </h1>
        <p class="text-h4 font-weight-thin">Your tasks, your rules, our support.</p>
        <v-btn
          class="mt-4"
          color="accent"
          size="x-large"
          elevation="4"
          rounded="lg"
          href="/authentication/register"
        >
          Get started
        </v-btn>
      </v-col>

      <v-col class="d-none d-lg-block">
        <v-img src="@/assets/task-amico.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// For user who are already logged in
const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    router.push('/dashboard/#all')
  }
})

onBeforeUnmount(() => {
  authListener()
})
</script>

<style scoped></style>
