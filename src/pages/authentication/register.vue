<template>
  <!-- container used to show card at the center -->
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
      <v-card-title class="text-lg-h4 font-weight-bold mb-4">
        Sign up to <span class="text-accent">BlueTask</span>
      </v-card-title>

      <v-btn
      class="mb-4"
        icon="mdi-google"
        variant="outlined"
        @click="signInWithGoogle"
      />

      <p class="font-italic text-h6 font-weight-light mb-4">Or</p>

      <v-alert
        v-if="errMsg"
        :text=errMsg
        class="mb-4"
        density="compact"
        type="error"
        variant="outlined"
      />
      <v-form
        v-model="form"
        @submit.prevent="register"
      >
        <v-text-field
          v-model="email"
          :rules="[required]"
          class="mb-4 text-left"
          density="compact"
          label="Email"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[required]"
          :type="visible ? 'text' : 'password'"
          class="mb-4 text-left"
          density="compact"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-text-field
          v-model="confirmPassword"
          :rules="[required, passwordMatch]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          class="mb-4 text-left"
          density="compact"
          label="Confirm Password"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          :disabled="!form"
          append-icon="mdi-account-plus"
          color="accent"
          rounded="lg"
          type="submit"
          variant="elevated"
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
import { doc, setDoc } from 'firebase/firestore'
import { onBeforeUnmount, ref } from 'vue'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = useFirestore()

const form = ref(false)
const errMsg = ref()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const visible = ref(false)
const required = (v) => !!v || 'This field is required'
const passwordMatch = (v) => v === password.value || 'Passwords do not match'

/**
 * Register user with email and password
 * Start when user click on register button
 */
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async () => {
      const currentUser = getAuth().currentUser
      await setDoc(doc(db, 'users', currentUser.uid), {
        email: currentUser.email,
        labels: [],
        createdAt: new Date()
      })
      router.push('/dashboard#all')
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

/**
 * Log in user with Google
 */
const signInWithGoogle = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then(async () => {
      const currentUser = getAuth().currentUser
      await setDoc(doc(db, 'users', currentUser.uid), {
        email: currentUser.email,
        labels: [],
        createdAt: new Date()
      })
      router.push('/dashboard#all')
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * Redirect to dashboard if user is authenticated
 */
const authListener = onAuthStateChanged(getAuth(), (user) => {
  if (user) router.push('/dashboard#all')
})

/**
 * Remove auth listener when component is unmounted
 */
onBeforeUnmount(() => authListener())
</script>

<style scoped></style>
