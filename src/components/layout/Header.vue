<template>
  <v-app-bar color="primary" elevation="1">
    <v-app-bar-nav-icon
      v-if="isLogged"
      @click.stop="rail = !rail"
    />
    <v-img
      :class="isLogged ? 'ml-2' : 'ml-8'"
      src="@/assets/logo.png"
      draggable="false"
      max-width="50"
      contain
      @click="isLogged ? router.push('/dashboard') : router.push('/')"
    />
    <v-app-bar-title
      text="BlueTask"
      class="text-lg-h5 font-weight-bold ml-2"
      style="user-select: none;"
      @click="isLogged ? router.push('/dashboard') : router.push('/')"
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

  <NavigationDrawer
    v-if="isLogged"
    :rail
  />

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let auth
const router = useRouter()
const isLogged = ref(false)
const rail = ref(false)
const showSignUp = router.currentRoute.value.path === '/authentication/login'

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLogged.value = user
  })
})

const logout = () => {
  signOut(auth)
  router.push('/')
}

</script>
