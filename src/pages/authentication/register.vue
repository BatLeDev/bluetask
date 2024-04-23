<template>
  <Header />
  <v-container>
    <h1>Sign up to BlueTask</h1>
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
    <p><button @click="register">Sign up</button></p>
    <p><button @click="signInWithGoogle">Sign in with Google</button></p>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithRedirect, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully created user')
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithRedirect(getAuth(), provider)
}

</script>

<style scoped></style>
