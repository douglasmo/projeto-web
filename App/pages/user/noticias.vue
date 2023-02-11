<template>
  <div>
    <v-container class="my-2">
      <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl">
        Notícias
      </h1>

      <v-row justify="center">
        <v-col cols="8">
          <v-text-field
            label="Pesquisar"
            type="text"
            prepend-icon="mdi-magnify"
            v-model="filtro"
          ></v-text-field>

          <v-row justify="center">
            <v-btn
              v-if="filtroBool"
              class="red white--text"
              @click="limparFiltro()"
              >Limpar filtros<v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn class="green white--text mr-1" @click="filtrar()"
              >Pesquisar<v-icon small>mdi-magnify</v-icon></v-btn
            >
          </v-row>
        </v-col>
      </v-row>
      <v-row>
                
        <h3 v-if="articles.length < 1"> Sem resultados</h3>
        <v-col cols="4" v-for="item in articles">
          <v-card :href="item.url" target="_blank" elevation="0">
            <v-divider class="pt-3 indigo"></v-divider>
            <p class="pa-5">
              {{
                item.publishedAt.split("T")[0].split("-")[2] +
                  "/" +
                  item.publishedAt.split("T")[0].split("-")[1]
              }}
              -
              {{ item.publishedAt.split("T")[1].replace("Z", "") }}
            </p>

            <!-- <div><p>{{ item.title }}</p></div> -->
            <div class="pa-3">
              <p>{{ item.title }}</p>
            </div>
            <v-img :src="item.urlToImage"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "user",
  meta: {
    auth: { authority: 1 }
  },
  // middleware: 'auth',
  // auth: false,
  // middleware: false,
  data() {
    return {
      api: "c8b8f548c7be4ab9be084b007a266d70",
      articles: [],
      filtroBool: false,
        filtro: ''
    };
  },
  mounted() {
    this.carregarNoticias();
  },
  methods: {
    carregarNoticias() {
        let baseUrl = ''
        if(this.filtroBool){

            baseUrl = `https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=${this.api}`;
        }else{

            baseUrl = `https://newsapi.org/v2/top-headlines?country=br&category=business&q=${this.filtro}&apiKey=${this.api}`;
        }

      this.$axios.get(baseUrl).then(val => {
        this.articles = val.data.articles;
        
        console.log(val.data.articles);
      });
    },
    filtrar(){
        this.carregarNoticias();
        this.filtroBool = true
    },
    limparFiltro(){
        this.filtroBool = false
        this.filtro = ''
        this.carregarNoticias();

    }
  },
  
};
</script>

<style lang="scss" scoped></style>
