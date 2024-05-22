<template>
  <v-container>
    <!-- Create task card-->
    <TaskCard
      v-if="(filterStatus === 'active' || filterLabel !== null) && user?.uid"
      create
      :label="filterLabel"
    />
    <!-- Empty state -->
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
    <!-- List of tasks -->
    <div class="items">
      <TaskCard
        v-for="taskId in tasksIds"
        class="item"
        :key="taskId"
        :label="filterLabel"
        :taskId="taskId"
        @click="selectedTask = taskId; showDialog = true"
      />
    </div>
    <!-- Task dialog for editing -->
    <v-dialog
      v-model="showDialog"
      width="auto"
    >
      <TaskCard
        dialog
        :taskId="selectedTask"
        @close="selectedTask = null; showDialog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, orderBy, query, where, limit } from 'firebase/firestore'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { useRouter } from 'vue-router'

const user = useCurrentUser()
const router = useRouter()
const db = useFirestore()

// Redirect to login page if user is not authenticated
const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    router.push('/authentication/login')
  }
})

// Unsubscribe from auth listener when component is unmounted
onBeforeUnmount(() => {
  authListener()
})

const selectedTask = ref(null)
const showDialog = ref(false)
const tasksIds = ref([])

// Filters tasks based on the current route
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

// Fetch tasks based on the current user and filters
const tasks = useCollection(() =>
  user.value
    ? query(
      collection(db, 'users', user.value.uid, 'tasks'),
      where('status', '==', filterStatus.value),
      filterLabel.value
        ? where('labels', 'array-contains', filterLabel.value) // Filter tasks by label
        : limit(100), // Useless limit, so null isnt allowed
      router.currentRoute.value.query.priority !== undefined
        ? where('priority', '==', parseInt(router.currentRoute.value.query.priority)) // Filter tasks by priority
        : limit(100), // Useless limit, so null isnt allowed
      orderBy('createAt', 'desc')
    )
    : null,
{ ssrKey: 'task' }
)

// Update tasksIds only of the tasks change
watch(tasks, (newTasks) => {
  const newTasksIds = newTasks.map((task) => task.id)
  tasksIds.value = newTasksIds
}, { deep: true })
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
