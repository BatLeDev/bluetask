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
      <v-divider/>
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
        prepend-icon="mdi-tag-edit-outline"
        title="Edit labels"
        value="edit-labels"
        rounded="e-pill"
      >
        <LabelsSettings :userId="userId" />
      </v-list-item>

      <!-- <v-divider v-if="labels.length"></v-divider>

      <v-list-item
        prepend-icon="mdi-cog-outline"
        title="Settings"
        value="settings"
        rounded="e-pill"
      /> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { getAuth } from 'firebase/auth'
import { collection, doc } from 'firebase/firestore'
import { computed, ref } from 'vue'
import { useDocument, useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = useFirestore()

const props = defineProps({
  rail: {
    type: Boolean,
    default: true
  }
})

const userId = getAuth().currentUser.uid
const usersDocRef = computed(() => doc(collection(db, 'users'), userId))
const userDoc = useDocument(usersDocRef)
const labels = computed(() => userDoc.value?.labels || [])
const drawer = ref(true)

</script>

<style scoped></style>
