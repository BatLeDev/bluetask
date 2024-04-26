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
                elevation="0"
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
                elevation="0"
                @click="task.lines.splice(index, 1)"
              />
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-text-field>

      <v-divider v-if="task.linesChecked.length > 0"
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
                elevation="0"
                @click="task.linesChecked.splice(index, 1)"
              />
            </template>
            Delete
          </v-tooltip>
        </template>
      </v-text-field>

      <!-- Footer card -->
      <!-- v-date-picker -->
      <!-- Color picker -->
      <v-btn
        @click="createTask"
        color="primary"
      >
        Create task
      </v-btn>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const newLine = ref('')
const newLineRef = ref()
const task = ref({
  title: '',
  description: '',
  lines: [],
  linesChecked: []
})

const createTask = () => {
  console.log(task.value)
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
</script>

<style>
.line-through .v-input__control {
  text-decoration: line-through;
}
</style>
