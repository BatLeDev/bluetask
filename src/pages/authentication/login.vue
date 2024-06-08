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
        Log in to <span class="text-accent">BlueTask</span>
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

      <v-text-field
        v-model="email"
        :rules="[required]"
        class="mb-4"
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
        class="mb-4"
        density="compact"
        label="Password"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        append-icon="mdi-login"
        color="accent"
        rounded="lg"
        variant="elevated"
        @click="login"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="link"
          href="/authentication/register"
        >
          You don't have an account ? Sign up now
        </a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { onBeforeUnmount, ref } from 'vue'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = useFirestore()

const errMsg = ref()
const email = ref('')
const password = ref('')
const visible = ref(false)
const required = (v) => !!v || 'This field is required'

/**
 * Log in user with email and password
 * Start when user click on login button
 */
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.push('/dashboard#all')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
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

/**
 * Log in user with Google
 */
const signInWithGoogle = async () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then(async () => {
      const currentUser = getAuth().currentUser
      const docRef = doc(db, 'users', currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: currentUser.email,
          labels: [],
          createdAt: new Date(),
          theme: 'dark'
        })
      }
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
