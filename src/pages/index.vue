<template>
  <Header
    :showSearchBar="true"
    :loading="isLoading"
    @searched="onSearch"
  />

  <v-container>
    <h1 class="text-center my-4">Bienvenue sur <span class="text-primary">Météo</span></h1>
    <h3 class="text-center my-4">
      En 2024, il n'y a rien de plus simple que de connaître la météo de sa ville !<br>
      Il suffit simplement de renseigner son nom dans le champ ci-dessus.
    </h3>

    <div v-if="weather && !isLoading">
      <h2 class="text-center my-4">{{ weather.city }}</h2>
      <WeatherCard :weather="weather" />

      <h1 class="text-center my-4">Prévisions à 5 jours</h1>
      <v-row>
        <v-col
          v-for="day in forecast"
          :key="day"
          cols="12"
          md="4"
        >
          <ForecastCard :weather="day" />
        </v-col>
      </v-row>
    </div>
    <div v-else-if="weather !== undefined">
      <v-alert
        text="Erreur : Ville non trouvée"
        type="error"
        closable
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isLoading = ref(false)
const weather = ref(undefined)
const forecast = ref([])

onMounted(() => {
  if (route.query.cityName) {
    onSearch(route.query.cityName)
  }
})

const onSearch = async (city) => {
  isLoading.value = true
  if (!city) {
    weather.value = undefined
  } else {
    await Promise.all([
      getWeather(city),
      getForecast(city)
    ])
  }
  isLoading.value = false
}

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee07e2bf337034f905cde0bdedae3db8`;
  const response = await fetch(url).then((response) => response.json());

  if (response.cod != 200) {
    weather.value = null
  } else {
    weather.value = {
      city: response.name,
      temperature: (response.main.temp - 273.15).toFixed(2),
      description: codeDescription[response.weather[0].id].text,
      icon: codeDescription[response.weather[0].id].icon,
      background: response.weather[0].icon,
      wind: response.wind.speed,
      humid: response.main.humidity,
      temperatureFeel: (response.main.feels_like - 273.15).toFixed(2),
    }
  }
}

const getForecast = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&appid=ee07e2bf337034f905cde0bdedae3db8`;
  const response = await fetch(url).then((response) => response.json());

  forecast.value = []
  if (response.cod != 200) {
    forecast.value = null
  } else {
    for (let i = 1; i < 6; i++) {
      const day = response.list[i]
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
      const dayNameFormated = dayName.charAt(0).toUpperCase() + dayName.slice(1);

      forecast.value.push({
        day: dayNameFormated,
        temperature: day.temp.day,
        description: codeDescription[day.weather[0].id].text,
        icon: codeDescription[day.weather[0].id].icon,
      })
    }
  }
}

const codeDescription = {
  '200': { text: 'Orages avec pluie légère', icon: 'mdi-weather-lightning-rainy' },
  '201': { text: 'Orages avec pluie', icon: 'mdi-weather-lightning-rainy' },
  '202': { text: 'Orages avec pluie forte', icon: 'mdi-weather-lightning-rainy' },
  '210': { text: 'Orages légers', icon: 'mdi-weather-lightning' },
  '211': { text: 'Orages', icon: 'mdi-weather-lightning' },
  '212': { text: 'Orages forts', icon: 'mdi-weather-lightning' },
  '221': { text: 'Orages variables', icon: 'mdi-weather-lightning' },
  '230': { text: 'Orages avec bruine légère', icon: 'mdi-weather-lightning-rainy' },
  '231': { text: 'Orages avec bruine', icon: 'mdi-weather-lightning-rainy' },
  '232': { text: 'Orages avec bruine forte', icon: 'mdi-weather-lightning-rainy' },
  '300': { text: 'Bruine légère', icon: 'mdi-weather-rainy' },
  '301': { text: 'Bruine', icon: 'mdi-weather-rainy' },
  '302': { text: 'Bruine forte', icon: 'mdi-weather-rainy' },
  '310': { text: 'Bruine légère avec pluie', icon: 'mdi-weather-rainy' },
  '311': { text: 'Bruine avec pluie', icon: 'mdi-weather-rainy' },
  '312': { text: 'Bruine forte avec pluie', icon: 'mdi-weather-rainy' },
  '313': { text: 'Bruine et pluie', icon: 'mdi-weather-rainy' },
  '314': { text: 'Bruine et pluie forte', icon: 'mdi-weather-rainy' },
  '321': { text: 'Bruine et pluie variable', icon: 'mdi-weather-rainy' },
  '500': { text: 'Pluie légère', icon: 'mdi-weather-rainy' },
  '501': { text: 'Pluie modérée', icon: 'mdi-weather-rainy' },
  '502': { text: 'Pluie forte', icon: 'mdi-weather-rainy' },
  '503': { text: 'Pluie très forte', icon: 'mdi-weather-rainy' },
  '504': { text: 'Pluie extrême', icon: 'mdi-weather-rainy' },
  '511': { text: 'Pluie verglaçante', icon: 'mdi-weather-rainy' },
  '520': { text: 'Averses de pluie légères', icon: 'mdi-weather-pouring' },
  '521': { text: 'Averses de pluie', icon: 'mdi-weather-pouring' },
  '522': { text: 'Averses de pluie fortes', icon: 'mdi-weather-pouring' },
  '531': { text: 'Averses de pluie variables', icon: 'mdi-weather-pouring' },
  '600': { text: 'Neige légère', icon: 'mdi-weather-snowy' },
  '601': { text: 'Neige', icon: 'mdi-weather-snowy' },
  '602': { text: 'Neige forte', icon: 'mdi-weather-snowy' },
  '611': { text: 'Neige fondue', icon: 'mdi-weather-snowy-rainy' },
  '612': { text: 'Neige fondue légère', icon: 'mdi-weather-snowy-rainy' },
  '613': { text: 'Neige fondue forte', icon: 'mdi-weather-snowy-rainy' },
  '615': { text: 'Averses de neige légères', icon: 'mdi-weather-snowy' },
  '616': { text: 'Averses de neige', icon: 'mdi-weather-snowy' },
  '620': { text: 'Averses de neige légères', icon: 'mdi-weather-snowy' },
  '621': { text: 'Averses de neige', icon: 'mdi-weather-snowy' },
  '622': { text: 'Averses de neige fortes', icon: 'mdi-weather-snowy' },
  '701': { text: 'Brume', icon: 'mdi-weather-fog' },
  '711': { text: 'Fumée', icon: 'mdi-weather-fog' },
  '721': { text: 'Brume', icon: 'mdi-weather-fog' },
  '731': { text: 'Sable / poussière', icon: 'mdi-weather-fog' },
  '741': { text: 'Brouillard', icon: 'mdi-weather-fog' },
  '751': { text: 'Sable', icon: 'mdi-weather-fog' },
  '761': { text: 'Poussière', icon: 'mdi-weather-fog' },
  '762': { text: 'Cendres volcaniques', icon: 'mdi-weather-fog' },
  '771': { text: 'Rafales', icon: 'mdi-weather-windy' },
  '781': { text: 'Tornade', icon: 'mdi-weather-tornado' },
  '800': { text: 'Ciel dégagé', icon: 'mdi-weather-sunny' },
  '801': { text: 'Quelques nuages', icon: 'mdi-weather-partly-cloudy' },
  '802': { text: 'Nuages dispersés', icon: 'mdi-weather-partly-cloudy' },
  '803': { text: 'Nuages brisés', icon: 'mdi-weather-cloudy' },
  '804': { text: 'Ciel couvert', icon: 'mdi-weather-cloudy' },
}
</script>

<style scoped></style>
