<template>
  <v-app-bar color="primary">

    <v-img
      class="mx-2"
      src="@/assets/logo.png"
      draggable="false"
      max-width="50"
      contain
      @click="$router.push('/')"
    />
    <v-app-bar-title
      text="BlueTask"
      style="user-select: none;"
      @click="$router.push('/')"
    />

    <v-btn
      icon
      href="/login"
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<script setup>
</script>
