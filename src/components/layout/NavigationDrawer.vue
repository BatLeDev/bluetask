<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="props.rail"
    expand-on-hover
    permanent
    touchless
  >
    <v-list
      color="primary"
      mandatory
    >
      <v-list-item
        prepend-icon="mdi-checkbox-marked-circle-outline"
        title="Tasks"
        value="tasks"
        rounded="e-pill"
        @click="router.push('/dashboard/#all')"
      />
      <v-list-item
        prepend-icon="mdi-inbox-arrow-down-outline"
        title="Archive"
        value="archive"
        rounded="e-pill"
        @click="router.push('/dashboard/#archive')"
      />
      <v-list-item
        prepend-icon="mdi-trash-can-outline"
        title="Trash"
        value="trash"
        rounded="e-pill"
        @click="router.push('/dashboard/#trash')"
      />

      <v-divider></v-divider>
      <!-- <v-list-subheader>Labels</v-list-subheader> -->
      <v-list-item
        v-for="label in labels"
        :key="label.title"
        :prepend-icon="label.icon"
        :title="label.title"
        :value="label.title"
        rounded="e-pill"
        @click="router.push(`/dashboard/#label/${label.title}`)"
      />
      <v-list-item
        prepend-icon="mdi-plus"
        title="Add label"
        value="add-label"
        rounded="e-pill"
      />

      <v-divider v-if="labels.length"></v-divider>

      <v-list-item
        prepend-icon="mdi-cog-outline"
        title="Settings"
        value="settings"
        rounded="e-pill"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  rail: {
    type: Boolean,
    default: true
  }
})

const drawer = ref(true)

// Some randoms labels
const labels = ref([
  { icon: 'mdi-food-apple', title: 'Food' },
  { icon: 'mdi-briefcase', title: 'Work' },
  { icon: 'mdi-account', title: 'Personal' },
  { icon: 'mdi-school', title: 'Study' }
])

</script>

<style scoped></style>
