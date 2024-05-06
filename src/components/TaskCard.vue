<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      elevation="8"
      width="100%"
      max-width="500"
      rounded="lg"
      class="pa-5 pt-3"
    >
      <!-- Title -->
      <v-text-field
        v-if="showFullCard || task.title.trim() !== ''"
        v-model="task.title"
        class="font-weight-black"
        density="compact"
        hide-details
        placeholder="Title"
        variant="plain"
        :readonly="!showFullCard"
      />

      <!-- Description -->
      <v-textarea
        v-if="showFullCard || task.description.trim() !== ''"
        v-model="task.description"
        auto-grow
        density="compact"
        hide-details
        placeholder="Description"
        rows="1"
        variant="plain"
        :readonly="!showFullCard"
      />

      <!-- Add new line -->
      <v-text-field
        v-if="showFullCard"
        v-model="newLine"
        density="compact"
        hide-details
        placeholder="Add a new line"
        ref="newLineRef"
        variant="plain"
        :prepend-icon="newLine ? 'mdi-checkbox-blank-outline' : 'mdi-plus'"
        @keyup.enter="$event.target.blur()"
        @blur="addTaskLine()"
      >
        <template
          v-if="newLine"
          v-slot:append
        >
          <v-btn
            density="comfortable"
            icon="mdi-plus"
            id="add-line"
            size="small"
            variant="flat"
          />
          <v-tooltip
            location="bottom"
            activator="#add-line"
            text="Add"
          />
        </template>
      </v-text-field>

      <!-- Lines not checked -->
      <v-text-field
        v-for="(line, index) in task.lines"
        v-model="task.lines[index]"
        density="compact"
        hide-details
        prepend-icon="mdi-checkbox-blank-outline"
        variant="plain"
        :key="index"
        :readonly="!showFullCard"
        @click:prepend="check(line, true)"
      >
        <template
          v-if="showFullCard"
          v-slot:append
        >
          <v-btn
            id="delete-line"
            icon="mdi-close"
            density="comfortable"
            size="small"
            variant="flat"
            @click="task.lines.splice(index, 1)"
          />
          <v-tooltip
            activator="#delete-line"
            location="bottom"
            text="Delete"
          />
        </template>
      </v-text-field>

      <!-- Lines checked -->
      <v-divider
        v-if="task.linesChecked.length > 0 && task.lines.length > 0"
        class="mt-2"
      />
      <v-text-field
        v-for="(line, index) in task.linesChecked"
        v-model="task.linesChecked[index]"
        class="line-through text-disabled font-italic"
        density="compact"
        hide-details
        prepend-icon="mdi-checkbox-outline"
        variant="plain"
        :key="index"
        :readonly="!showFullCard"
        @click:prepend="check(line, false)"
      >
        <template
          v-if="showFullCard"
          v-slot:append
        >
          <v-btn
            id="delete-lineChecked"
            icon="mdi-close"
            density="comfortable"
            size="small"
            variant="flat"
            @click="task.linesChecked.splice(index, 1)"
          />
          <v-tooltip
            activator="#delete-lineChecked"
            location="bottom"
            text="Delete"
          />
        </template>
      </v-text-field>

      <!-- Actions -->
      <v-row v-if="showFullCard">
        <!-- Groupe d'action de gauche -->
        <v-col>
          <v-btn
            density="comfortable"
            icon
            variant="flat"
          >
            <v-icon>mdi-calendar-start-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Start date"
            />
            <v-menu
              activator="parent"
              :close-on-content-click="false"
            >
              <v-confirm-edit v-model="task.startDate">
                <template v-slot:default="{ model: proxyModel, actions }">
                  <v-date-picker v-model="proxyModel.value">
                    <template v-slot:actions>
                      <component :is="actions"></component>
                    </template>
                  </v-date-picker>
                </template>
              </v-confirm-edit>
            </v-menu>
          </v-btn>

          <v-btn
            density="comfortable"
            icon
            variant="flat"
          >
            <v-icon>mdi-calendar-end-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="End date"
            />
            <v-menu
              activator="parent"
              :close-on-content-click="false"
            >
              <v-confirm-edit v-model="task.endDate">
                <template v-slot:default="{ model: proxyModel, actions }">
                  <v-date-picker v-model="proxyModel.value">
                    <template v-slot:actions>
                      <component :is="actions"></component>
                    </template>
                  </v-date-picker>
                </template>
              </v-confirm-edit>
            </v-menu>
          </v-btn>

          <v-btn
            density="comfortable"
            icon
            variant="flat"
          >
            <v-icon>mdi-flag-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Priority"
            />
            <v-menu
              activator="parent"
              location="bottom center"
            >
              <v-btn
                @click="task.priority = 0"
                class="my-2"
                color="success"
                density="compact"
                rounded="pill"
                text="Low"
              />
              <v-btn
                @click="task.priority = 1"
                class="mb-2"
                color="warning"
                density="compact"
                rounded="pill"
                text="Medium"
              />
              <v-btn
                @click="task.priority = 2"
                class="mb-2"
                color="error"
                density="compact"
                rounded="pill"
                text="High"
              />
              <v-btn
                @click="task.priority = -1"
                color="grey"
                density="compact"
                rounded="pill"
                text="Not Defined"
              />
            </v-menu>
          </v-btn>

          <v-btn
            density="comfortable"
            icon
            variant="flat"
            @click="create ? task = JSON.parse(JSON.stringify(emptyTask)) : deleteTask()"
          >
            <v-icon>mdi-delete-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              :text="create ? 'Clear' : 'Delete'"
            />
          </v-btn>
        </v-col>

        <!-- Color menu -->
        <!-- Label menu -->

        <!-- Close/Create btn -->
        <v-col class="d-flex align-center justify-end">
          <v-btn
            v-if="create"
            color="primary"
            text="Create task"
            @click="createTask"
          />
          <v-btn
            v-else
            color="primary"
            text="Close"
            @click="$emit('close')"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { VConfirmEdit } from 'vuetify/labs/VConfirmEdit'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'
import { useFirestore } from 'vuefire'

const props = defineProps({
  // If true, the card will be in create mode
  create: {
    type: Boolean,
    default: false
  },
  edit: {
    type: Boolean,
    default: false
  },
  // The task to edit
  taskId: {
    type: String,
    default: ''
  }
})

const db = useFirestore()
const emptyTask = {
  title: '',
  description: '',
  startDate: undefined,
  endDate: undefined,
  priority: -1,
  lines: [],
  linesChecked: []
}
const newLine = ref('') // Ref to the new line text
const newLineRef = ref() // Ref to the new line text field
const task = ref(JSON.parse(JSON.stringify(emptyTask))) // Deep copy
const showFullCard = computed(() => props.create || props.edit)

onMounted(async () => {
  if (!props.create) {
    const taskDocument = await getDoc(doc(collection(db, 'tasks'), props.taskId))
    task.value = taskDocument.data()
  }
})

/**
 * Create the new task in the database and clear the form
 */
const createTask = async () => {
  const user = getAuth().currentUser
  if (!user) return
  if (
    task.value.title.trim() === '' &&
    task.value.description.trim() === '' &&
    task.value.lines.length === 0 &&
    task.value.linesChecked.length === 0
  ) return

  const cleanTask = Object.fromEntries(
    Object.entries(task.value).filter(([, value]) => value !== undefined)
  )
  await addDoc(collection(db, 'tasks'), {
    ...cleanTask,
    userId: user.uid
  })
  task.value = JSON.parse(JSON.stringify(emptyTask)) // Clear the form
}

/**
 * Add a new line to the task
 */
const addTaskLine = () => {
  if (newLine.value) {
    task.value.lines.unshift(newLine.value)
    newLine.value = ''
    newLineRef.value.focus()
  }
}

/**
 * Check or uncheck a line
 * @param {string} line - The line to check/uncheck
 * @param {boolean} checked - If the line is checked or not
 */
const check = (line, checked) => {
  const srcList = checked ? task.value.lines : task.value.linesChecked
  const destList = checked ? task.value.linesChecked : task.value.lines
  srcList.splice(srcList.indexOf(line), 1)
  destList.unshift(line)
}

/**
 * Delete the task from the database by its ID
 */
const deleteTask = async () => {
  await deleteDoc(doc(collection(db, 'tasks'), props.taskId))
}

/**
 * Update the task in the database when the task object changes (only if not in create model)
 */
watch(
  task,
  async () => {
    if (!props.create) {
      await updateDoc(doc(collection(db, 'tasks'), props.taskId), task.value)
    }
  },
  { deep: true }
)
</script>

<style>
.line-through .v-input__control {
  text-decoration: line-through;
}
</style>
