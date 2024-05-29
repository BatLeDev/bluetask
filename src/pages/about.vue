<template>
  <v-container>
    <h1 class="display-2 text-center my-4">À Propos de BlueTask</h1>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <!-- Logo BlueTask -->
        <v-img
          src="https://github.com/BatLeDev/bluetask/blob/master/src/assets/logo.png"
          alt="BlueTask Logo"
          class="my-4 mx-auto d-block"
          max-width="200"
        ></v-img>

        <!-- Présentation du Projet -->
        <p class="lead text-center mb-10">
          Bienvenue sur <strong>BlueTask</strong>, votre application de gestion de tâches puissante et intuitive, conçue
          pour vous aider à organiser et suivre vos tâches efficacement. Avec son interface conviviale, BlueTask vous
          assure de ne jamais oublier une tâche importante.
        </p>

        <!-- Origine et Évolution du Projet -->
        <v-row class="mx-2 my-4">
          <v-col cols="12">
            <h2 class="text-center mb-4">Origine et Évolution du Projet</h2>
            <v-img
              src="https://storyset.com/illustration/startup/startup"
              alt="Projet Initial"
              class="mb-4 mx-auto d-block"
              max-width="400"
            ></v-img>
            <p>
              BlueTask a commencé comme un projet pour un cours de développement web. Les exigences initiales étaient de
              créer une application TODO avec diverses fonctionnalités telles que la description des tâches, les dates
              de début et de fin, la gestion des statuts et des priorités.
            </p>
            <p>
              J'ai décidé d'élargir ce projet pour acquérir plus d'expérience en développement web, y compris
              l'hébergement, le déploiement, et la gestion de base de données. Le choix de <strong>Vuetify</strong> pour
              le framework CSS a été une décision stratégique en raison de mon expérience antérieure chez <a
                href="http://https://koumoul.com/"
                target="_blank"
              >Koumoul</a>.
            </p>
          </v-col>
        </v-row>

        <!-- Qui suis-je ? -->
        <v-row class="mx-2 my-4">
          <v-col cols="12">
            <h2 class="text-center mb-4">Qui suis-je ?</h2>
            <v-img
              src="https://storyset.com/illustration/profile/profile"
              alt="Mon Profil"
              class="mb-4 mx-auto d-block"
              max-width="400"
            ></v-img>
            <p>
              Je suis Baptiste Guerny, un développeur web passionné avec une expérience dans le développement
              d'applications intuitives et efficaces. J'ai utilisé des technologies comme Vue.js, Vuetify et Firebase
              pour créer BlueTask, en appliquant les compétences acquises lors de mes études et expériences
              professionnelles.
            </p>
          </v-col>
        </v-row>

        <!-- Contactez-nous -->
        <v-row class="mx-2 my-4">
          <v-col cols="12">
            <h2 class="text-center mb-4">Contactez-moi</h2>
            <v-img
              src="https://storyset.com/illustration/communication/communication"
              alt="Contactez-nous"
              class="mb-4 mx-auto d-block"
              max-width="400"
            ></v-img>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <h3 class="text-center mb-4">Signaler une Erreur</h3>
                <p>
                  Vous avez rencontré une erreur ou un problème avec notre service ? N'hésitez pas à nous le signaler en
                  nous envoyant un e-mail à l'adresse suivante :
                  <a
                    href="mailto:baptiste.guerny@gmail.com?subject=[BlueTask] J'ai trouvé une erreur !&body=Bonjour M.GUERNY,%0D%0A">baptiste.guerny@gmail.com</a>.
                </p>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <h3 class="text-center mb-4">Questions et Suggestions</h3>
                <p>
                  Pour toute question, suggestion ou autre demande, n'hésitez pas à me contacter par e-mail. Je serai
                  ravi de vous lire !
                </p>
                <p class="text-center">
                  <strong>Mail de contact :</strong>
                  <a href="mailto:baptiste.guerny@gmail.com">baptiste.guerny@gmail.com</a>.
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- Crédits -->
        <v-row class="mx-2 my-4">
          <v-col cols="12">
            <h2 class="text-center mb-4">Crédits</h2>
            <p>
              <strong>Design:</strong> Inspiré par ce <a
                href="https://www.figma.com/community/file/1336799126437101680"
                target="_blank"
              >design Figma</a> et <a
                href="https://keep.google.com/u/0/#home"
                target="_blank"
              >Google Keep</a>.<br>
              <strong>Illustrations:</strong> Fournies par <a
                href="https://storyset.com"
                target="_blank"
              >Storyset</a>.
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
