<template>
  <v-container>
    <TaskCard create />

    <v-empty-state
      v-if="tasks.length === 0"
      title="No tasks"
      text="You don't have any tasks yet. Create one now!"
    >
      <template v-slot:media>
        <img
          src="@/assets/task-amico.svg"
          style="max-height: 20rem;"
        />
      </template>
    </v-empty-state>

    <v-row
      v-else
      no-gutters
    >
      <v-col
        v-for="taskId in tasks"
        cols="12"
        md="6"
        lg="4"
        xl="3"
        :key="taskId"
      >
        <TaskCard :taskId="taskId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { computed, onBeforeUnmount, ref } from 'vue'
import { VEmptyState } from 'vuetify/labs/VEmptyState'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = useFirestore()
const user = useCurrentUser()

const tasksCollection = useCollection(collection(db, 'tasks'))
const tasks = computed(() => {
  return tasksCollection.value
    .filter(task => task.userId === user.value.uid)
    .map(task => task.id)
})

const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    router.push('/authentication/login')
  }
})

onBeforeUnmount(() => {
  authListener()
})

const selectedTaskId = ref(undefined)
</script>

<style scoped>
</style>
