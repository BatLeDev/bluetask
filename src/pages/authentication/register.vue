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
      <v-card-title class="text-lg-h4 font-weight-bold mb-4">Sign up to <span
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

      <v-form
        v-model="form"
        @submit.prevent="register"
      >
        <v-text-field
          v-model="email"
          :rules="[required]"
          density="compact"
          label="Email"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          class="mb-4 text-left"
        />

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
          class="mb-4 text-left"
          @click:append-inner="visible = !visible"
        />

        <v-text-field
          v-model="confirmPassword"
          :rules="[required, passwordMatch]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          label="Confirm Password"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          class="mb-4 text-left"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          :disabled="!form"
          append-icon="mdi-account-plus"
          variant="elevated"
          color="accent"
          rounded="lg"
          type="submit"
        >
          Sign up
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        <a
          href="/authentication/login"
          class="link"
        >
          You have already an account ? Login now
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref(false)
const errMsg = ref()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const visible = ref(false)
const required = (v) => !!v || 'This field is required'
const passwordMatch = (v) => v === password.value || 'Passwords do not match'

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.push('/dashboard/#all')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'The email address is badly formatted.'
          break
        case 'auth/email-already-in-use':
          errMsg.value = 'The email address is already in use by another account.'
          break
        case 'auth/weak-password':
          errMsg.value = 'The password is too weak.'
          break
        default:
          errMsg.value = 'An error occurred. Please try again.'
      }
    })
}

const signInWithGoogle = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then(() => {
      router.push('/dashboard/#all')
    })
    .catch((error) => {
      console.log(error)
    })
}

// For user who are already logged in
const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    router.push('/dashboard/#all')
  }
})

onBeforeUnmount(() => {
  authListener()
})
</script>

<style scoped></style>
