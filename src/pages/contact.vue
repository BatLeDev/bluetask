<template>
  <Header />
  <v-container>
    <h1 class="display-2 text-center my-4">Contactez-nous</h1>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <p class="lead text-center mb-10">
          Vous avez une question, un problème ou une suggestion ? N'hésitez pas à nous contacter !
        </p>

        <v-row class="mx-2">
          <v-col>
            <h2 class="text-center mb-4">Signaler une erreur</h2>
            <p class="mb-2">
              Vous avez rencontré une erreur ou un problème avec notre service ? Consultez le
              <a
                class="link"
                href="https://www.saashub.com/openweathermap-status"
              >statut des serveurs OpenWeatherMap</a>
              pour vérifier si ils sont disponibles.
            </p>
            <p>
              Si les serveurs sont en ligne et que vous constatez toujours un problème, n'hésitez pas à nous le
              signaler
              en nous envoyant un e-mail à l'adresse suivante :
              <a
                class="link"
                href="mailto:baptiste.guerny@gmail.com?subject=[Site web Météo] J'ai trouvé une erreur&body=Bonjour M.GUERNY,%0D%0A"
              >
                baptiste.guerny@gmail.com
              </a>
            </p>
          </v-col>

          <v-col>
            <h2 class="text-center mb-4">Questions et suggestions</h2>
            <p class="mb-2">
              Pour toute question, suggestion ou autres demandes, n'hésitez pas à nous contacter
              par e-mail. Nous seront ravi de vous lire et apprécions toujours vos retours !
            </p>
            <p class="text-center">
              <strong>Mail de contact :</strong>
              <a
                class="link"
                href="mailto:baptiste.guerny@gmail.com"
              >
                baptiste.guerny@gmail.com
              </a>.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped></style>
