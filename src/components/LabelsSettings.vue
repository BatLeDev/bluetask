<template>
  <v-dialog
    v-model="dialog"
    activator="parent"
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
          v-model="newLabel.title"
          hide-details
          label="New label"
          prepend-inner-icon="mdi-tag-plus-outline"
          variant="plain"
          @keydown.enter="addLabel"
        />

        <v-text-field
          v-model="newLabel.icon"
          append="mdi-help-circle-outline"
          hide-details
          label="Custom icon"
          placeholder="tag-outline"
          prefix="mdi-"
          prepend-inner-icon="mdi-tag-outline"
          variant="plain"
        >
          <template v-slot:append>
            <v-icon @click="openIconReference">
              mdi-help-circle-outline
            </v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Open Material Design Icons website for icon reference."
            />
          </template>
        </v-text-field>

      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="addLabel"
        >
          Create
        </v-btn>

        <v-btn
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
const newLabel = ref({
  title: '',
  icon: 'tag-outline'
})

const addLabel = async () => {
  if (newLabel.value.title) {
    if (!newLabel.value.icon) {
      newLabel.value.icon = 'mdi-tag-outline'
    } else if (!newLabel.value.icon.startsWith('mdi-')) {
      newLabel.value.icon = `mdi-${newLabel.value.icon}`
    }
    await updateDoc(doc(collection(db, 'users'), props.userId), {
      labels: [...userDoc.value.labels, newLabel.value]
    })
    newLabel.value = {
      title: '',
      icon: 'tag-outline'
    }
  }
}

// TODO remove labels in all tasks
const removeLabel = async (label) => {
  await updateDoc(doc(collection(db, 'users'), props.userId), {
    labels: userDoc.value.labels.filter((l) => l.title !== label.title)
  })
}

const openIconReference = () => {
  window.open('https://materialdesignicons.com/', '_blank');
}
</script>

<style scoped></style>
