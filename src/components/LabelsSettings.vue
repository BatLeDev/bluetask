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
          v-model="newLabel.title"
          label="New label"
          variant="plain"
          hide-details
          append-icon="mdi-plus"
          @click:append="addLabel"
          @keydown.enter="addLabel"
        >
          <template v-slot:prepend-inner>
            <v-icon
              class="cursor-pointer"
              :icon="newLabel.icon === 'mdi-tag-outline' ? 'mdi-tag-plus-outline' : newLabel.icon"
            />
            <v-menu
              v-model="iconSelector"
              activator="parent"
              location="center"
              max-height="400"
              max-width="400"
              :close-on-content-click="false"
            >
              <v-infinite-scroll
                @load="load"
                height="400"
              >
                <v-list>
                  <v-icon
                    v-for="mdi in mdiList"
                    :key="mdi"
                    @click="newLabel.icon = mdi"
                    :icon="mdi"
                  />
                </v-list>
              </v-infinite-scroll>
            </v-menu>
          </template>
        </v-text-field>
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
import mdiFullList from '@/assets/mdiList.json'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useDocument, useFirestore } from 'vuefire'

const props = defineProps({
  userId: String
})

const db = useFirestore()
const userDoc = useDocument(doc(collection(db, 'users'), props.userId))

const dialog = ref(false)
const iconSelector = ref(false)
const mdiList = ref(mdiFullList.slice(0, 200))
const newLabel = ref({
  title: '',
  icon: 'mdi-tag-outline'
})

const addLabel = async () => {
  if (newLabel.value) {
    await updateDoc(doc(collection(db, 'users'), props.userId), {
      labels: [...userDoc.value.labels, newLabel.value]
    })
    newLabel.value = {
      title: '',
      icon: 'mdi-tag-outline'
    }
  }
}

const removeLabel = async (label) => {
  await updateDoc(doc(collection(db, 'users'), props.userId), {
    labels: userDoc.value.labels.filter((l) => l.title !== label.title)
  })
}

const load = ({ done }) => {
  mdiList.value.push(...mdiFullList.slice(mdiList.value.length, mdiList.value.length + 200))
  done('ok')
}

</script>

<style scoped></style>
