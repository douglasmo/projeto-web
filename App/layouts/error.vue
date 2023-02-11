<template>
  <v-app dark>
   <v-row justify="center" >
    <v-col cols="12">
      <h1 class="display-3" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    </v-col>
    <v-col cols="12">
      <NuxtLink to="/">
      Volte para a tela inicial
      </NuxtLink>
    </v-col>
   </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Não encontrado',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
