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
    <div class="items">
      <TaskCard
        v-for="task in tasks"
        class="item"
        :key="task"
        :taskId="task.id"
      />
    </div>
  </v-container>
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where } from 'firebase/firestore'
import { onBeforeUnmount } from 'vue'
import { VEmptyState } from 'vuetify/labs/VEmptyState'
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

const tasks = useCollection(() =>
  user.value
    ? query(
      collection(db, 'tasks'),
      where('userId', '==', user.value.uid)
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
@media only screen and (max-width: 1200px) {
  .items {
    column-count: 3;
  }
}

@media only screen and (max-width: 992px) {
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
