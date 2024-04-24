<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="props.rail"
    expand-on-hover
    permanent
  >
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  rail: {
    type: Boolean,
    default: true
  }
})

const drawer = ref(true)

</script>

<style scoped></style>
