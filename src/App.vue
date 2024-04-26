<template>
  <v-app>
    <v-main>
      <Header />
      <router-view />
      <Footer v-if="!$route.path.startsWith('/dashboard')" />
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style>
  /* Add global styles here */
  /* It's not the best place to put global styles, but it's the only way to do it with Vite */

  /* v-icon has an opacity when it is prepended in a list of items.
    ref: https://github.com/vuetifyjs/vuetify/issues/18760
  */
  .v-theme--light {
    --v-medium-emphasis-opacity: 1 !important;
  }

  .v-theme--dark {
    --v-medium-emphasis-opacity: 1 !important;
  }

  /* Remove unnecessary scrollbar */
  html {
    overflow-y: auto !important;
  }

  /* Custom link style */
  .link {
    color: rgb(var(--v-theme-on-background));
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .link:hover {
    color: rgb(var(--v-theme-secondary));
    text-decoration: underline;
  }
</style>
