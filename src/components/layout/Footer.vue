<template>
  <v-footer app>
    <div class="text-center w-100">
      <a
        href="https://github.com/batledev"
        class="link"
      >
        <strong>Baptiste GUERNY</strong>
      </a> — <a
        href="https://matthieu495.gitlab.io/r4.a.10/section/tp3/"
        class="link"
      >
        R4.A.10 - Complément Web - TP3
      </a>
    </div>
  </v-footer>
</template>

<script setup>
</script>

<style scoped>
  /* Custom link style */
  .link {
    color: rgb(var(--v-theme-on-background));
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .link:hover {
    color: rgb(var(--v-theme-secondary));
    text-decoration: underline;
  }
</style>
