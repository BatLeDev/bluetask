<template>
  <v-container>
    <TaskCard create />
    <!-- TODO Set an empty state component here-->
    <v-row v-if="tasks.length > 0">
      <v-col
        v-for="taskId in tasks"
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
import { computed, onBeforeUnmount } from 'vue'
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
</script>

<style scoped>
</style>
