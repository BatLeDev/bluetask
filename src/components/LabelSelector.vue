<template>
  <v-card>
    <v-card-title>Labels</v-card-title>
    <v-card-text>

      <v-chip
      v-for="label in userDoc.labels.filter(label => !labelsOfTheTask.includes(label.title))"
      :key="label"
      :text="label.title"
      :prepend-icon="label.icon"
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
  userId: String,
  labelsOfTheTask: Array
})

const db = useFirestore()
const userDoc = useDocument(doc(collection(db, 'users'), props.userId))
</script>

<style scoped></style>
