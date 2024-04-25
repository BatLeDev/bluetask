<template>
  <v-container class="d-flex align-center justify-center">
    <v-card
      elevation="8"
      max-width="500"
      rounded="lg"
    >
      <v-card-text>
        <v-text-field
          v-model="task.title"
          placeholder="Title"
          variant="plain"
        />

        <v-textarea
          v-model="task.description"
          placeholder="Description"
          variant="plain"
        />

        <v-text-field
          v-model="newLine"
          placeholder="Add a new line"
          variant="plain"
          :prepend-icon="newLine ? 'mdi-checkbox-blank-outline' : 'mdi-plus'"
          ref="newLineRef"
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
                  icon="mdi-plus"
                  density="comfortable"
                  size="small"
                  elevation="0"
                />
              </template>
              Add
            </v-tooltip>
          </template>
        </v-text-field>

        <v-text-field
          v-for="line in task.lines"
          :key="line"
          :model-value="line.text"
          :prepend-icon="line.checked ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'"
          variant="plain"
          @keyup.enter="$event.target.blur()"
          @blur="console.log('blur')"
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
                  @click="task.lines.splice(task.lines.indexOf(line), 1)"
                />
              </template>
              Delete
            </v-tooltip>
          </template>
        </v-text-field>


        <!-- Ajout de plusieurs lignes -->

      </v-card-text>

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

// const expanded = ref(false)
const newLine = ref('')
const newLineRef = ref()
const task = ref({
  title: '',
  description: '',
  lines: []
})

const createTask = () => {
  console.log(task.value)
}

const addTaskLine = () => {
  if (newLine.value) {
    task.value.lines.unshift({
      checked: false,
      text: newLine.value
    })
    newLine.value = ''
    newLineRef.value.focus()
  }
}

</script>

<style scoped></style>
