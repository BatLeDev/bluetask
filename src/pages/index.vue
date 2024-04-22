<template>
  <Header />

  <v-container>
    <h1 class="my-4">Do your tasks <span class="text-accent">quickly</span> and <span class="text-accent">easy</span>
    </h1>
    <p>Your tasks, your rules, our support.</p>

    <v-btn
      class="mt-8"
      color="accent"
      href="/register"
      large
    >
      Get started
    </v-btn>
    <v-img src="@/assets/home1.png" />

    <v-row justify="center">
      <v-card
        max-width="300"
        class="mx-4"
      >
        <v-card-title>Easy to use</v-card-title>
        <v-card-text>
          Simplified chore lists with intuitive layout for seamless daily planning
        </v-card-text>
      </v-card>

      <v-card
        max-width="300"
        class="mx-4"
      >
        <v-card-title class="headline">Full Support</v-card-title>
        <v-card-text>
          Empower your productivity with personalized task management guided by your rules
        </v-card-text>
      </v-card>

      <v-card
        max-width="300"
        class="mx-4"
      >
        <v-card-title class="headline">Never feel lost</v-card-title>
        <v-card-text>
          Stay seamlessly connected to your tasks anytime, anywhere with our synced mobile app
        </v-card-text>
      </v-card>
    </v-row>  
  </v-container>
</template>

<script setup>
</script>

<style scoped></style>
