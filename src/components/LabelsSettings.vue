<template>
  <v-dialog
    activator="parent"
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>Labels</v-card-title>
      <v-card-text class="py-0">
        <v-chip
          v-for="label in userDoc.labels"
          :key="label"
          :text="label.title"
          :prepend-icon="label.icon"
          class="ma-1"
          closable
          @click:close="removeLabel(label)"
        />

        <v-divider class="my-4" />

        <v-text-field
          v-model="newLabel"
          label="New label"
          variant="plain"
          hide-details
          prepend-inner-icon="mdi-tag-plus-outline"
          append-icon="mdi-plus"
          @click:append="addLabel"
          @keydown.enter="addLabel"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { collection, doc, updateDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useDocument, useFirestore } from 'vuefire'

const props = defineProps({
  userId: String
})

const db = useFirestore()
const userDoc = useDocument(doc(collection(db, 'users'), props.userId))

const dialog = ref(false)
const newLabel = ref('')

const addLabel = async () => {
  if (newLabel.value) {
    await updateDoc(doc(collection(db, 'users'), props.userId), {
      labels: [...userDoc.value.labels, { title: newLabel.value, icon: 'mdi-tag-outline' }]
    })
    newLabel.value = ''
  }
}

const removeLabel = async (label) => {
  await updateDoc(doc(collection(db, 'users'), props.userId), {
    labels: userDoc.value.labels.filter((l) => l.title !== label.title)
  })
}

</script>

<style scoped></style>
