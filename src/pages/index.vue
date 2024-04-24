<template>
  <v-container>
    <v-row
      class="mx-2"
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

    <v-row justify="center">
      <v-card
        max-width="250"
        class="mx-8 my-4 pa-2"
        elevation="4"
        rounded="lg"
      >
        <v-card-title class="text-h5 mb-2">Easy to use</v-card-title>
        <v-card-text class="text-h6 font-weight-light">
          Simplified chore lists with intuitive layout for seamless daily planning
        </v-card-text>
      </v-card>

      <v-card
        max-width="250"
        class="mx-8 my-4 pa-2"
        elevation="4"
        rounded="lg"
      >
        <v-card-title class="text-h5 mb-2">Full Support</v-card-title>
        <v-card-text class="text-h6 font-weight-light">
          Empower your productivity with personalized task management guided by your rules
        </v-card-text>
      </v-card>

      <v-card
        max-width="250"
        class="mx-8 my-4 pa-2"
        elevation="4"
        rounded="lg"
      >
        <v-card-title class="text-h5 mb-2">Never feel lost</v-card-title>
        <v-card-text class="text-h6 font-weight-light">
          Stay seamlessly connected to your tasks anytime, anywhere with our synced mobile app
        </v-card-text>
      </v-card>
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
    router.push('/dashboard')
  }
})

onBeforeUnmount(() => {
  authListener()
})
</script>

<style scoped>
</style>
