<template>
  <v-app-bar color="primary">

    <v-img
      class="ml-8"
      src="@/assets/logo.png"
      draggable="false"
      max-width="50"
      contain
      @click="$router.push('/')"
    />
    <v-app-bar-title
      text="BlueTask"
      class="text-lg-h5 font-weight-bold ml-2"
      style="user-select: none;"
      @click="$router.push('/')"
    />

    <v-btn
      v-if="!isLogged && !showSignUp"
      append-icon="mdi-login"
      variant="elevated"
      color="accent"
      rounded="lg"
      href="/authentication/login"
    >
      Login
    </v-btn>
    <v-btn
      v-if="!isLogged && showSignUp"
      append-icon="mdi-account-plus"
      variant="elevated"
      color="accent"
      rounded="lg"
      href="/authentication/register"
    >
      Sign Up
    </v-btn>
    <v-btn
      v-if="isLogged"
      append-icon="mdi-logout"
      variant="elevated"
      color="accent"
      rounded="lg"
      @click="logout"
    >
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let auth
const router = useRouter()
const isLogged = ref(false)

defineProps({
  showSignUp: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLogged.value = user ? true : false
  })
})

const logout = () => {
  signOut(auth)
    .then(() => {
      router.push('/')
    })
}

</script>
