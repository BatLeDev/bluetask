<template>
  <v-container>
    <TaskCard
      v-if="filterStatus === 'active' || filterLabel !== null"
      create
      :label="filterLabel"
    />
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
    <div class="items">
      <TaskCard
        v-for="task in tasks"
        class="item"
        :key="task"
        :taskId="task.id"
        @click="selectedTask = task.id"
      />
    </div>
    <v-dialog
      v-model="selectedTask"
      max-width="500px"
    >
      <TaskCard
        :taskId="selectedTask"
        :edit=true
        @close="selectedTask = null"
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where } from 'firebase/firestore'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { useRouter } from 'vue-router'

const user = useCurrentUser()
const router = useRouter()
const db = useFirestore()

const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    router.push('/authentication/login')
  }
})

onBeforeUnmount(() => {
  authListener()
})

const selectedTask = ref(null)
const filterStatus = computed(() => {
  switch (router.currentRoute.value.hash.slice(1)) {
    case 'all':
      return 'active'
    case 'archive':
      return 'archived'
    case 'trash':
      return 'deleted'
    default:
      return 'active'
  }
})
const filterLabel = computed(() => {
  return router.currentRoute.value.hash.startsWith('#label/')
    ? router.currentRoute.value.hash.replace('#label/', '')
    : null
})

const tasks = useCollection(() =>
  user.value
    ? query(
      collection(db, 'users', user.value.uid, 'tasks'),
      where('status', '==', filterStatus.value),
      where('labels', 'array-contains', filterLabel.value || '')
    )
    : null,
{ ssrKey: 'task' }
)

</script>

<style scoped>
.items {
  column-count: 4;
}

/* TODO: Use vuetify for responsiveness */
@media only screen and (max-width: 1100px) {
  .items {
    column-count: 3;
  }
}

@media only screen and (max-width: 800px) {
  .items {
    column-count: 2;
  }
}

@media only screen and (max-width: 600px) {
  .items {
    column-count: 1;
  }
}
</style>
