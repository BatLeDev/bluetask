<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      elevation="8"
      width="100%"
      max-width="500"
      rounded="lg"
      class="pa-5 pt-3"
      :color="task.color || ''"
    >
      <!-- Title -->
      <v-textarea
        v-if="showFullCard || task.title.trim() !== ''"
        v-model="task.title"
        auto-grow
        class="font-weight-black"
        density="compact"
        hide-details
        placeholder="Title"
        rows="1"
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
      <v-textarea
        v-if="showFullCard"
        v-model="newLine"
        auto-grow
        density="compact"
        hide-details
        placeholder="Add a new line"
        ref="newLineRef"
        rows="1"
        variant="plain"
        :prepend-icon="newLine ? 'mdi-checkbox-blank-outline' : 'mdi-plus'"
        @keydown.enter.exact.prevent="$event.target.blur()"
        @keydown.enter.shift.exact.prevent="newLine += '\n'"
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
            variant="text"
          />
          <v-tooltip
            location="bottom"
            activator="#add-line"
            text="Add"
          />
        </template>
      </v-textarea>

      <!-- Lines not checked -->
      <v-textarea
        v-for="(line, index) in task.lines"
        v-model="task.lines[index]"
        auto-grow
        density="compact"
        hide-details
        prepend-icon="mdi-checkbox-blank-outline"
        rows="1"
        variant="plain"
        :key="index"
        :readonly="!showFullCard"
        @click:prepend.stop="check(line, true)"
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
            variant="text"
            @click="task.lines.splice(index, 1)"
          />
          <v-tooltip
            activator="#delete-line"
            location="bottom"
            text="Delete"
          />
        </template>
      </v-textarea>

      <!-- Lines checked -->
      <v-divider
        v-if="task.linesChecked.length > 0 && task.lines.length > 0"
        class="mt-2"
      />
      <v-textarea
        v-for="(line, index) in task.linesChecked"
        v-model="task.linesChecked[index]"
        auto-grow
        class="line-through text-disabled font-italic"
        density="compact"
        hide-details
        prepend-icon="mdi-checkbox-outline"
        rows="1"
        variant="plain"
        :key="index"
        :readonly="!showFullCard"
        @click:prepend.stop="check(line, false)"
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
            variant="text"
            @click="task.linesChecked.splice(index, 1)"
          />
          <v-tooltip
            activator="#delete-lineChecked"
            location="bottom"
            text="Delete"
          />
        </template>
      </v-textarea>

      <!-- Progress bar -->
      <v-row
        v-if="task.lines.length > 0 || task.linesChecked.length > 0"
        class="mt-2 align-center"
      >
        <v-col>
          <v-progress-linear
            cols="auto"
            color="success"
            height="12"
            min="0"
            rounded
            :max="task.lines.length + task.linesChecked.length"
            :model-value="task.linesChecked.length"
          />
        </v-col>
        <v-col cols="auto">
          {{ Math.round(task.linesChecked.length / (task.lines.length + task.linesChecked.length) * 100) }}%
        </v-col>
      </v-row>

      <!------ Data ------>
      <!-- StartDate -->
      <div
        v-if="task.startDate"
        class="mt-2"
      >
        <v-icon>mdi-calendar-start-outline</v-icon>
        <v-chip
          density="compact"
          class="ml-3"
          closable
          @click:close="task.startDate = null"
        >
          {{ date.format(task.startDate, 'keyboardDate') }}
        </v-chip>
      </div>

      <!-- EndDate -->
      <div
        v-if="task.endDate"
        class="mt-2"
      >
        <v-icon>mdi-calendar-end-outline</v-icon>
        <v-chip
          density="compact"
          class="ml-3"
          closable
          @click:close="task.endDate = null"
        >
          {{ date.format(task.endDate, 'keyboardDate') }}
        </v-chip>
      </div>

      <!-- Priority -->
      <div
        v-if="task.priority > -1"
        class="mt-2"
      >
        <v-icon>mdi-flag-outline</v-icon>
        <v-chip
          :color="['success', 'warning', 'error'][task.priority]"
          density="compact"
          class="ml-3"
          closable
          @click:close="task.priority = -1"
        >
          {{ ['Low', 'Medium', 'High'][task.priority] }}
        </v-chip>
      </div>

      <!-- Labels -->
      <div
        v-if="task.labels.filter(label => label !== '').length > 0"
        class="mt-2"
      >
        <v-icon>mdi-tag-outline</v-icon>
        <v-chip
          v-for="(label, index) in task.labels.filter(label => label !== '')"
          :key="label"
          :text="label"
          class="ml-3"
          :closable="props.label !== label"
          density="compact"
          @click:close="task.labels.splice(index, 1)"
        />
      </div>

      <!-- Actions (set data)-->
      <v-row
        v-if="showFullCard"
        class="mt-1"
      >
        <!-- Groupe d'action de gauche -->
        <v-col
          class="pl-1"
          cols="auto"
        >
          <!-- StartDate -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
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
              <v-date-picker
                v-model="task.startDate"
                show-adjacent-months
              />
            </v-menu>
          </v-btn>

          <!-- EndDate -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
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
              <v-date-picker
                v-model="task.endDate"
                show-adjacent-months
                :min="task.startDate"
              />
            </v-menu>
          </v-btn>

          <!-- Priority -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
          >
            <v-icon>mdi-flag-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Priority"
            />
            <v-menu
              activator="parent"
              location="bottom"
            >
              <v-btn
                v-for="priority in [0, 1, 2]"
                :key="priority"
                class="mb-2"
                density="compact"
                rounded="pill"
                :color="['success', 'warning', 'error'][priority]"
                :text="['Low', 'Medium', 'High'][priority]"
                @click="task.priority = priority"
              />
            </v-menu>
          </v-btn>

          <!-- Label menu -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
          >
            <v-icon>mdi-tag-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Labels"
            />
            <v-menu
              activator="parent"
              :close-on-content-click="false"
            >
              <LabelSelector
                :labels-of-the-task="task.labels"
                :user-id="user.uid"
                @add-label="label => task.labels.push(label.title)"
              />
            </v-menu>
          </v-btn>

          <!-- Color -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
          >
            <v-icon>mdi-palette-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              text="Color"
            />
            <v-menu
              activator="parent"
              :close-on-content-click="false"
            >
              <v-card>
                <v-color-picker
                  v-model="task.color"
                  :swatches="swatches"
                  show-swatches
                  elevation="0"
                  class="mb-n4"
                />
                <v-card-actions>
                  <v-btn
                    color="error"
                    @click="task.color = null"
                  >
                    Clear
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-btn>

          <!-- Archive btn-->
          <v-btn
            v-if="!create"
            density="comfortable"
            icon
            variant="text"
            @click="archiveTask"
          >
            <v-icon v-if="task.status === 'active'">mdi-inbox-arrow-down-outline</v-icon>
            <v-icon v-else>mdi-inbox-arrow-up-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              :text="task.status !== 'archived' ? 'Archive' : 'Unarchive'"
            />
          </v-btn>

          <!-- Delete -->
          <v-btn
            density="comfortable"
            icon
            variant="text"
            @click="create ? clearTask() : deleteTask()"
          >
            <v-icon>mdi-delete-outline</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              :text="create ? 'Clear' : task.status === 'deleted' ? 'Delete permanently' : 'Delete'"
            />
          </v-btn>
        </v-col>

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
import { getAuth } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'
import { useFirestore } from 'vuefire'
import { useDate } from 'vuetify'

const props = defineProps({
  // If true, the card will be in create mode
  create: {
    type: Boolean,
    default: false
  },
  // If true, the card will be in dialog mode
  dialog: {
    type: Boolean,
    default: false
  },
  // The label to filter the tasks
  label: {
    type: String,
    default: undefined
  },
  // The task id
  taskId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const date = useDate()
const db = useFirestore()

const swatches = [
  ['#FFC164', '#E47676'],
  ['#FFFF99', '#7A73F0'],
  ['#CCFFFF', '#CC99FF'],
  ['#99CCFF', '#FFCCFF'],
  ['#8FE96C', '#FFCCCC']
]
const emptyTask = {
  title: '',
  description: '',
  startDate: null,
  endDate: null,
  priority: -1,
  lines: [],
  linesChecked: [],
  labels: [props.label],
  color: null,
  status: 'active'
}

const newLine = ref('') // Ref to the new line text
const newLineRef = ref() // Ref to the new line text field
const task = ref(JSON.parse(JSON.stringify(emptyTask))) // Deep copy
const showFullCard = computed(() => props.create || props.dialog)

const user = getAuth().currentUser
const tasksCollection = collection(db, 'users', user.uid, 'tasks')

onMounted(async () => {
  // Update in real time the task object if it's not in create mode
  if (!props.create) {
    if (props.dialog) {
      const taskDocument = await getDoc(doc(tasksCollection, props.taskId))
      task.value = taskDocument.data()
      task.value.startDate = taskDocument.data().startDate ? taskDocument.data().startDate.toDate() : undefined
      task.value.endDate = taskDocument.data().endDate ? taskDocument.data().endDate.toDate() : undefined
    } else {
      const taskRef = doc(tasksCollection, props.taskId)
      onSnapshot(taskRef, (taskDocument) => {
        if (taskDocument.exists()) {
          task.value = taskDocument.data()
          task.value.startDate = taskDocument.data().startDate ? taskDocument.data().startDate.toDate() : undefined
          task.value.endDate = taskDocument.data().endDate ? taskDocument.data().endDate.toDate() : undefined
        }
      })
    }
  }
})

/**
 * Create the new task in the database and clear the form
 */
const createTask = async () => {
  // Check if it's an empty task
  if (
    task.value.title.trim() === '' &&
    task.value.description.trim() === '' &&
    task.value.lines.length === 0 &&
    task.value.linesChecked.length === 0
  ) return

  const cleanTask = Object.fromEntries(
    Object.entries(task.value).filter(([, value]) => value !== undefined)
  )
  cleanTask.labels.push('')
  await addDoc(tasksCollection, {
    ...cleanTask,
    createAt: new Date()
  })
  clearTask()
}

/**
 * Clear the task form
 */
const clearTask = () => {
  task.value = JSON.parse(JSON.stringify(emptyTask))
  task.value.labels = [props.label] // Add the label to the task (from the route)
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
 * Delete the task
 * - Move the task to the trash if it's not already there
 * - Delete the task permanently if it's in the trash
 */
const deleteTask = async () => {
  if (task.value.status === 'deleted') {
    await deleteDoc(doc(tasksCollection, props.taskId))
  } else {
    await updateDoc(doc(tasksCollection, props.taskId), { status: 'deleted' })
  }
  emit('close')
}

/**
 * Archive or unarchive the task
 */
const archiveTask = async () => {
  await updateDoc(doc(tasksCollection, props.taskId), { status: task.value.status === 'archived' ? 'active' : 'archived' })
  emit('close')
}

/**
 * Update the task in the database when the task object changes (only if not in create mode)
 */
watch(
  task,
  async () => {
    if (!props.create) {
      const cleanTask = Object.fromEntries(
        Object.entries(task.value).filter(([, value]) => value !== undefined)
      )
      await updateDoc(doc(tasksCollection, props.taskId), cleanTask)
    }
  },
  { deep: true }
)

watch(
  props,
  async () => {
    task.value.labels = [props.label]
  }
)
</script>

<style scoped>
.line-through .v-input__control {
  text-decoration: line-through;
}
</style>
