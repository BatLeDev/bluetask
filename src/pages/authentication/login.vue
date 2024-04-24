<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 80%;"
  >
    <v-card
      class="pa-12 pb-8 text-center"
      elevation="8"
      max-width="500"
      rounded="lg"
    >
      <v-card-title class="text-lg-h4 font-weight-bold mb-4">Log in to <span
          class="text-accent">BlueTask</span></v-card-title>

      <v-alert
        v-if="errMsg"
        :text=errMsg
        type="error"
        variant="outlined"
        density="compact"
        class="mb-4"
      />

      <v-btn
        icon="mdi-google"
        variant="outlined"
        class="mb-4"
        @click="signInWithGoogle"
      />

      <p class="font-italic text-h6 font-weight-light mb-4">Or</p>

      <v-text-field
        v-model="email"
        :rules="[required]"
        density="compact"
        label="Email"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        class="mb-4"
      />

      <!-- <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div> -->

      <v-text-field
        v-model="password"
        :rules="[required]"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        label="Password"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        class="mb-4"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        append-icon="mdi-login"
        variant="elevated"
        color="accent"
        rounded="lg"
        @click="login"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          href="/authentication/register"
          class="link"
        >
          You don't have an account ? Sign up now
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const errMsg = ref()
const email = ref('')
const password = ref('')
const visible = ref(false)
const required = (v) => !!v || 'This field is required'

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email"
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Wrong password'
          break
        case 'auth/invalid-credential':
          errMsg.value = 'Invalid email or password'
          break
        default:
          errMsg.value = error.message
      }

    })
}

const signInWithGoogle = async () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then((data) => {
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error)
    })
}

// For user who are already logged in
const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    router.push('/dashboard')
  }
})

onBeforeUnmount(() => {
  authListener()
})
</script>

<style scoped></style>
