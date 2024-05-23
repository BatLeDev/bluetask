<template>
  <v-card>
    <v-card-title>Labels</v-card-title>
    <v-card-text>
      <v-chip
      v-for="label in userDoc.labels.filter(label => !labelsOfTheTask.includes(label.title))"
      :key="label"
      :prepend-icon="label.icon"
      :text="label.title"
      class="ma-1"
      @click="emit('add-label', label)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { collection, doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire'

const emit = defineEmits(['add-label'])

const props = defineProps({
  userId: String, // To get user document
  labelsOfTheTask: Array // To filter labels that are already assigned to the task
})

const db = useFirestore()
const userDoc = useDocument(doc(collection(db, 'users'), props.userId))
</script>

<style scoped></style>
