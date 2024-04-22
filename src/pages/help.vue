<template>
  <Header />
  <v-container>
    <h1 class="display-2 text-center my-4">Bienvenue sur notre page d'aide</h1>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <p class="text-center mb-1">
          Ici, vous pourrez découvrir la météo en temps réel de n'importe quelle ville à travers le monde.
        </p>
        <p class="text-center mb-4">
          Les informations météorologiques sont fournies en temps réel par l'organisme
          <a
            class="link"
            href="https://openweathermap.org/"
          >OpenWeatherMap</a>.
        </p>

        <v-divider class="my-4"></v-divider>

        <h2 class="text-center mb-4">Comment ça marche ?</h2>
        <p>
          Pour obtenir les informations météorologiques d'une ville, entrez simplement son nom dans le champ de
          recherche. Les informations s'afficheront automatiquement.
        </p>
        <v-img
          class="mx-auto"
          src="@/assets/help1.png"
        />
        <p>
          Vous souhaitez plus de détails ? Cliquez sur le bouton "Afficher plus de détails" pour accéder à des
          informations plus complètes sur la météo de la ville sélectionnée.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
</style>
