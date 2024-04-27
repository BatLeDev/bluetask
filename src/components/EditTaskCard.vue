<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      elevation="8"
      width="100%"
      max-width="500"
      rounded="lg"
      class="mx-auto px-6 pb-6"
    >
      <!-- Title -->
      <v-text-field
        v-model="task.title"
        class="font-weight-black title"
        placeholder="Title"
        variant="plain"
      />

      <!-- Description -->
      <v-textarea
        v-model="task.description"
        auto-grow
        class="my-n6"
        density="compact"
        placeholder="Description"
        rows="1"
        variant="plain"
      />

      <!-- Add new line -->
      <v-text-field
        v-model="newLine"
        density="compact"
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
        class="mt-n6"
        density="compact"
        prepend-icon="mdi-checkbox-blank-outline"
        variant="plain"
        :key="index"
        v-model="task.lines[index]"
        @click:prepend="check(line, true)"
      >
        <template v-slot:append>
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-close"
                density="comfortable"
                size="small"
                variant="flat"
                @click="task.lines.splice(index, 1)"
              />
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-text-field>

      <!-- Lines checked -->
      <v-divider
        v-if="task.linesChecked.length > 0"
        class="mb-6 mt-n4"
      />
      <v-text-field
        v-for="(line, index) in task.linesChecked"
        class="mt-n6 line-through text-disabled font-italic"
        density="compact"
        prepend-icon="mdi-checkbox-outline"
        variant="plain"
        :key="index"
        v-model="task.linesChecked[index]"
        @click:prepend="check(line, false)"
      >
        <template v-slot:append>
          <v-btn
            id="delete-line"
            icon="mdi-close"
            density="comfortable"
            size="small"
            variant="flat"
            @click="task.linesChecked.splice(index, 1)"
          />
          <v-tooltip
            location="bottom"
            activator="#delete-line"
            text="Delete"
          />
        </template>
      </v-text-field>

      <!-- Actions -->
      <v-row>
        <v-col class="pa-0">
          <v-btn
            density="comfortable"
            id="start-date-activator"
            icon="mdi-calendar-start-outline"
            variant="flat"
          />
          <v-btn
            density="comfortable"
            id="end-date-activator"
            icon="mdi-calendar-end-outline"
            variant="flat"
          />
          <v-btn
            class="text-none"
            density="comfortable"
            id="priority-activator"
            icon="mdi-flag-outline"
            variant="flat"
          />
          <v-btn
            density="comfortable"
            id="delete-activator"
            icon="mdi-delete-outline"
            variant="flat"
            @click="create ? task.value = JSON.parse(JSON.stringify(emptyTask)) : null"
          />
        </v-col>

        <v-tooltip
          activator="#start-date-activator"
          location="bottom"
          text="Start date"
        />
        <v-tooltip
          activator="#end-date-activator"
          location="bottom"
          text="End date"
        />
        <v-tooltip
          activator="#priority-activator"
          location="bottom"
          text="Priority"
        />
        <v-tooltip
          activator="#delete-activator"
          location="bottom"
          :text="create ? 'Clear' : 'Delete'"
        />

        <v-menu
          activator="#start-date-activator"
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

        <v-menu
          activator="#end-date-activator"
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

        <v-menu
          location="bottom center"
          activator="#priority-activator"
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
            color="error"
            density="compact"
            rounded="pill"
            text="High"
          />
        </v-menu>

        <!-- Color menu -->
        <!-- Label menu -->

        <!-- Close/Create btn -->
        <v-col class="d-flex align-center justify-end pa-0">
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
import { ref } from 'vue'
import { VConfirmEdit } from 'vuetify/labs/VConfirmEdit'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc } from 'firebase/firestore'

defineProps({
  // If true, the card will be in create mode
  create: {
    type: Boolean,
    default: false
  }
})

const db = getFirestore()
const emptyTask = {
  title: '',
  description: '',
  startDate: undefined,
  endDate: undefined,
  priority: 1,
  lines: [],
  linesChecked: []
}

const newLine = ref('') // Ref to the new line text
const newLineRef = ref() // Ref to the new line text field
const task = ref(JSON.parse(JSON.stringify(emptyTask))) // Deep copy

/**
 * Create the new task in the database and clear the form
 */
const createTask = async () => {
  const user = getAuth().currentUser
  const cleanTask = Object.fromEntries(
    Object.entries(task.value).filter(([, value]) => value !== undefined)
  )
  await addDoc(collection(db, 'tasks'), {
    ...cleanTask,
    userId: user.uid
  })
  task.value = JSON.parse(JSON.stringify(emptyTask)) // Clear the form
}

const addTaskLine = () => {
  if (newLine.value) {
    task.value.lines.unshift(newLine.value)
    newLine.value = ''
    newLineRef.value.focus()
  }
}

const check = (line, checked) => {
  const srcList = checked ? task.value.lines : task.value.linesChecked
  const destList = checked ? task.value.linesChecked : task.value.lines
  srcList.splice(srcList.indexOf(line), 1)
  destList.unshift(line)
}

</script>

<style>
.line-through .v-input__control {
  text-decoration: line-through;
}
</style>
