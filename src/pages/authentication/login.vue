<template>
  <Header :showSignUp="true" />
  <v-container>
    <h1>Log in to BlueTask</h1>
    <p><input
        type="text"
        placeholder="Email"
        v-model="email"
      /></p>
    <p><input
        type="password"
        placeholder="Password"
        v-model="password"
      /></p>
      <p v-if="errMsg">{{  errMsg }}</p>
    <p><button @click="login">Login</button></p>
    <p><button @click="signInWithGoogle">Login with Google</button></p>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errMsg = ref()

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

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithRedirect(getAuth(), provider)
}

</script>

<style scoped></style>
