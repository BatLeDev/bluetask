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
import { computed, onBeforeUnmount } from 'vue'
import { VEmptyState } from 'vuetify/labs/VEmptyState'
import { useFirestore, useCollection, useCurrentUser } from 'vuefire'
import { useRouter } from 'vue-router'

const currentUser = useCurrentUser()
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

const queryRef = computed(() => {
  if (!currentUser.value) {
    return query(
      collection(db, 'tasks'),
      where('userId', '==', '')
    )
  } else {
    return query(
      collection(db, 'tasks'),
      where('userId', '==', currentUser.value.uid)
    )
  }
})

const tasks = useCollection(queryRef, { ssrKey: 'tasks' })

</script>

<style scoped>
.items {
  column-count: 4;
}

/* Make it responsive */
@media only screen and (max-width: 1200px) {
  .items {
    column-count: 3;
  }
}
</style>
