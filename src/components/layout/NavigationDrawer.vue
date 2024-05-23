<template>
  <v-navigation-drawer
    :v-model="true"
    :rail="props.rail"
    color="secondary"
    expand-on-hover
    permanent
    touchless
  >
    <v-list
      color="primary"
      mandatory
    >
      <!---- All/Archive/Trash---->
      <v-list-item
        v-for="location in locationData"
        :active="$route.hash === location.hash"
        :key="location.hash"
        :prepend-icon="location.icon"
        :title="location.title"
        rounded="e-pill"
        @click="router.push({ hash: location.hash, query: $route.query })"
      />
      <v-divider />

      <!---- Labels ---->
      <v-list-item
        v-for="label in labels"
        :active="$route.hash === `#label/${label.title}`"
        :key="label.title"
        :prepend-icon="label.icon"
        :title="label.title"
        rounded="e-pill"
        @click="router.push({ hash: `#label/${label.title}`, query: $route.query })"
      />
      <v-list-item
        prepend-icon="mdi-tag-edit-outline"
        title="Edit labels"
        rounded="e-pill"
        @click="null"
      >
        <LabelsSettings :userId="userId" />
      </v-list-item>
      <v-divider />

      <!---- Filters/Order ---->
      <!-- Priority filter -->
      <v-list-group>
        <template v-slot:activator="{ props}">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-flag-outline"
            :title="priorityData[$route.query.priority]?.title || 'Priority'"
            rounded="e-pill"
            :color="priorityData[$route.query.priority]?.color || ''"
            :base-color="priorityData[$route.query.priority]?.color || ''"
          />
        </template>
        <v-list-item
          v-for="priority in priorityData.filter(p => p.value != $route.query.priority)"
          :key="priority"
          :title="priority.title"
          rounded="e-pill"
          @click="router.push({ hash: $route.hash, query: { ...$route.query, priority: priority.value } })"
        />
      </v-list-group>
      <!-- State filter -->
      <v-list-group>
        <template v-slot:activator="{ props}">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-progress-check"
            :title="stateData[$route.query.state]?.title || 'State'"
            rounded="e-pill"
            :color="stateData[$route.query.state]?.color || ''"
            :base-color="stateData[$route.query.state]?.color || ''"
          />
        </template>
        <v-list-item
          v-for="state in stateData.filter(s => s.value != $route.query.state)"
          :key="state"
          :title="state.title"
          rounded="e-pill"
          @click="router.push({ hash: $route.hash, query: { ...$route.query, state: state.value } })"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { getAuth } from 'firebase/auth'
import { collection, doc } from 'firebase/firestore'
import { computed } from 'vue'
import { useDocument, useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = useFirestore()

const props = defineProps({
  rail: Boolean // Show expanded
})

const userId = getAuth().currentUser.uid
const usersDocRef = computed(() => doc(collection(db, 'users'), userId))
const userDoc = useDocument(usersDocRef)
const labels = computed(() => userDoc.value?.labels || [])

const locationData = [
  { hash: '#all', title: 'Tasks', icon: 'mdi-checkbox-marked-circle-outline' },
  { hash: '#archive', title: 'Archive', icon: 'mdi-inbox-arrow-down-outline' },
  { hash: '#trash', title: 'Trash', icon: 'mdi-trash-can-outline' }
]

const priorityData = [
  { color: 'success', title: 'Low', value: 0 },
  { color: 'warning', title: 'Medium', value: 1 },
  { color: 'error', title: 'High', value: 2 },
  { color: '', title: 'Clear', value: undefined }
]

const stateData = [
  { color: 'error', title: 'Not started', value: 0 },
  { color: 'warning', title: 'In progress', value: 1 },
  { color: 'success', title: 'Completed', value: 2 },
  { color: '', title: 'Clear', value: undefined }
]
</script>

<style scoped></style>
