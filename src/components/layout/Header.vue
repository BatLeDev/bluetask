<template>
  <v-app-bar
    color="secondary"
    elevation="1"
    class="pr-4"
  >
    <v-app-bar-nav-icon
      v-if="$route.path == '/dashboard'"
      class="d-none d-lg-block"
      @click.stop="rail = !rail"
    />
    <v-img
      :class="$route.path == '/dashboard' ? 'ml-2' : 'ml-8'"
      src="@/assets/logo.png"
      draggable="false"
      max-width="50"
      contain
      @click="isLogged ? router.push('/dashboard#all') : router.push('/')"
    />
    <v-app-bar-title
      text="BlueTask"
      class="text-lg-h5 font-weight-bold ml-2"
      style="user-select: none;"
      @click="isLogged ? router.push('/dashboard#all') : router.push('/')"
    />

    <v-btn
      v-if="!isLogged && $router.currentRoute.value.path !== '/authentication/login'"
      append-icon="mdi-login"
      variant="elevated"
      color="accent"
      rounded="lg"
      href="/authentication/login"
    >
      Login
    </v-btn>
    <v-btn
      v-if="!isLogged && $router.currentRoute.value.path === '/authentication/login'"
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
    v-if="$route.path == '/dashboard'"
    :rail
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let auth
const router = useRouter()
const display = useDisplay()
const isLogged = ref(false)
const rail = ref(false)

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLogged.value = user
  })
  if (display.mdAndDown) {
    rail.value = true
  }
})

const logout = () => {
  signOut(auth)
  router.push('/')
}

</script>
