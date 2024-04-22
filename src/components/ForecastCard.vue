<template>
  <v-card>
    <v-row
      class="fill-height ma-0"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="text-center text-white"
      >
        <v-icon size="xxx-large">{{ weather.icon }}</v-icon>
        <h2>{{ weather.day }}</h2>
      </v-col>
    </v-row>
    <v-card-text>
      <v-list-item>
        <template #prepend>
          <v-icon
            size="large"
            icon="mdi-thermometer"
          />
        </template>
        Température : {{ weather.temperature }}°
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <v-icon
            size="large"
            icon="mdi-information"
          />
        </template>
        Description : {{ weather.description }}
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    default: () => ({})
  }
})
</script>
