<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      max-height="200"
      :src="'/weather/' + weather.background + '.webp'"
      cover
    >
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-col
          cols="10"
          class="text-center text-white"
        >
          <v-icon size="xxx-large">{{ weather.icon }}</v-icon>
          <h2>{{ weather.description }}</h2>
          <v-btn
            append-icon="mdi-chevron-right"
            :text="isExpanded ? 'Réduire' : 'Voir plus'"
            variant="text"
            @click="isExpanded = !isExpanded"
          />
        </v-col>
      </v-row>
    </v-img>
    <v-card-text v-if="isExpanded">
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
            icon="mdi-thermometer"
          />
        </template>
        Ressenti : {{ weather.temperatureFeel }}°
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <v-icon
            size="large"
            icon="mdi-water-percent"
          />
        </template>
        Humidité : {{ weather.humid }}%
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <v-icon
            size="large"
            icon="mdi-weather-windy"
          />
        </template>
        Vent : {{ weather.wind }} m/s
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  weather: {
    type: Object,
    default: () => ({})
  }
})

const isExpanded = ref(false)

</script>
