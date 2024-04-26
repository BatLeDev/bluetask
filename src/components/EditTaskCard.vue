<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      elevation="8"
      width="100%"
      max-width="500"
      rounded="lg"
      class="mx-auto px-6 pb-6"
    >
      <v-text-field
        v-model="task.title"
        class="font-weight-black title"
        placeholder="Title"
        variant="plain"
      />

      <v-textarea
        v-model="task.description"
        auto-grow
        class="my-n6"
        density="compact"
        placeholder="Description"
        rows="1"
        variant="plain"
      />

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
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                density="comfortable"
                variant="flat"
                icon="mdi-plus"
                size="small"
              />
            </template>
            Add
          </v-tooltip>
        </template>
      </v-text-field>

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
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-close"
                density="comfortable"
                size="small"
                variant="flat"
                @click="task.linesChecked.splice(index, 1)"
              />
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-text-field>

      <v-row class="mt-0">
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
            id="priority-activator"
            icon="mdi-flag-outline"
            variant="flat"
          />
          <v-btn
            density="comfortable"
            id="delete-activator"
            icon="mdi-delete-outline"
            variant="flat"
            @click="create ? clearTask() : null"
          />
        </v-col>

        <v-tooltip
          activator="#start-date-activator"
          location="bottom"
        >
          Start date
        </v-tooltip>

        <v-tooltip
          activator="#end-date-activator"
          location="bottom"
        >
          End date
        </v-tooltip>

        <v-tooltip
          activator="#delete-activator"
          location="bottom"
        >
          {{ create ? 'Clear' : 'Delete'}}
        </v-tooltip>

        <v-tooltip
          activator="#priority-activator"
          location="bottom"
        >
          Priority
        </v-tooltip>

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

        <v-speed-dial
          location="bottom center"
          transition="scale-transition"
          activator="#priority-activator"
        >
          <v-btn
            @click="task.priority = 0"
            color="success"
            rounded="pill"
          >
            Low
          </v-btn>
          <v-btn
            @click="task.priority = 1"
            color="warning"
            rounded="pill"
          >
            Medium
          </v-btn>
          <v-btn
            @click="task.priority = 2"
            color="error"
            rounded="pill"
          >
            High
          </v-btn>
        </v-speed-dial>
        <!-- Color menu -->
        <!-- Label menu -->

        <v-col class="text-right pa-0">
          <v-btn
            v-if="create"
            color="primary"
            class="justify-end"
            @click="createTask"
          >
            Create task
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { VConfirmEdit } from 'vuetify/labs/VConfirmEdit'
import { VSpeedDial } from 'vuetify/labs/VSpeedDial'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, addDoc } from 'firebase/firestore'

defineProps({
  create: {
    type: Boolean,
    default: false
  }
})

const db = getFirestore()
const newLine = ref('')
const newLineRef = ref()
const task = ref({
  title: '',
  description: '',
  startDate: undefined,
  endDate: undefined,
  priority: 1,
  lines: [],
  linesChecked: []
})

const createTask = async () => {
  const user = getAuth().currentUser
  const cleanTask = Object.fromEntries(
    Object.entries(task.value).filter(([, value]) => value !== undefined)
  );
  await addDoc(collection(db, 'tasks'), {
    ...cleanTask,
    userId: user.uid
  })
  clearTask()
}

const addTaskLine = () => {
  if (newLine.value) {
    task.value.lines.unshift(newLine.value)
    newLine.value = ''
    newLineRef.value.focus()
  }
}

const check = (line, checked) => {
  if (checked) {
    task.value.lines.splice(task.value.lines.indexOf(line), 1)
    task.value.linesChecked.unshift(line)
  } else {
    task.value.linesChecked.splice(task.value.linesChecked.indexOf(line), 1)
    task.value.lines.unshift(line)
  }
}

const clearTask = () => {
  task.value = {
    title: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    priority: 1,
    lines: [],
    linesChecked: []
  }
}
</script>

<style>
.line-through .v-input__control {
  text-decoration: line-through;
}
</style>
