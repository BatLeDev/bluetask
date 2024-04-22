<template>
  <v-app-bar color="primary">

    <v-img
      class="mx-2"
      src="@/assets/logo.png"
      draggable="false"
      max-width="50"
      contain
      @click="$router.push('/')"
    />
    <v-app-bar-title
      text="Météo"
      style="user-select: none;"
      @click="$router.push('/')"
    />

    <v-text-field
      v-if="showSearchBar"
      v-model="search"
      :loading=loading
      autofocus
      clearable
      density="compact"
      hide-details
      placeholder="Rechercher une ville"
      max-width="100"
      prepend-inner-icon="mdi-magnify"
      single-line
      variant="solo"
      @update:model-value="debounce"
    />

    <v-spacer></v-spacer>

    <v-btn
      icon
      href="/contact"
    >
      <v-icon>mdi-email</v-icon>
    </v-btn>
    <v-btn
      icon
      href="/help"
    >
      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['searched'])
const search = ref('')

defineProps({
  showSearchBar: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  if (router.currentRoute.value.query.cityName) {
    search.value = router.currentRoute.value.query.cityName
  }
})

let timeoutId;
const debounce = () => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    if (!search.value || search.value.trim() === '') {
      router.push({ path: '/' });
      emit('searched', undefined)
    } else {
      router.push({ path: '/', query: { cityName: search.value } })
      emit('searched', search.value)
    }
  }, 300);
}

</script>
