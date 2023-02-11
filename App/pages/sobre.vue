<template>
  <div class="sobre grey lighten-3">
    
    <!-- Logotipo -->
    <v-row class="" justify="center" >
      
        <img :src="sobre_header" width="100%" class="d-none d-sm-flex" >
        <img :src="sobre_header_mob" width="100%" class="d-flex d-sm-none" >
      
      
      
    </v-row>

    <!-- Sobre a história -->
 
      
    <v-card> 
      <v-row justify="center" class="mt-7" v-for="sessao in sessoes" :key="sessao.id">
                  <v-col cols="10" sm="10" md="10" lg="10" xl="10"  class="text-center">
                    <v-row justify="center" class="ma-1 pb-7">
                        <v-col cols="12" class="pa-5">
                              <div class="mt-5  radial-gradient" style="width:100%">
                              <div class="text-center">
                                  <h3 class="display-2 pa-3 white--text" >{{sessao.descricao}}</h3>
                                  <!-- <h4 class="white--text py-3" style="font-weight:50" >Nossos produtos mais populares com base em nossas vendas mais recentes</h4> -->
                              </div>
                          </div>
                            <!-- <h1 class="display-3"></h1> -->
                        </v-col>
                        
                        <v-col cols="10" sm="10" md="4" lg="3" xl="3" class="mb-2" v-for="img in sessao.fotos" :key="img.id">
    
                            
                            <a :href="img.imageUrl" target="_blank"><v-img width="" class="rounded-lg ma-2" aspect-ratio="1.0" :src="img.imageUrl" >
                            </v-img></a>
                            
                        </v-col>

                    
                    </v-row>

                
                </v-col>
        </v-row>
</v-card>

    <!-- <v-layout row justify-center class="mt-2">
         <v-flex xs10 sm10 md10  class="grey darken-4 white--text text-center">
          <v-layout row justify-center class="ma-1 pb-7">
            <v-flex xs12 class="pa-5">
              <h1 class="display-3">Veja nossos cortes KIDS</h1>
            </v-flex>
            <v-flex xs10 sm10 md4 lg3 class="mb-2" v-for="img in cortesKids" :key="img">
              <a  :href="img" target="_blank" >
                <v-img width="" class="rounded-lg ma-2" aspect-ratio="1.0" :src="img" >
              </v-img>
                </a>
            </v-flex>

           
        </v-layout>

     
      </v-flex>
      </v-layout>
    <v-layout row justify-center class="mt-2">
         <v-flex xs10 sm10 md10  class="grey darken-4 white--text text-center">
          <v-layout row justify-center class="ma-1 pb-7">
            <v-flex xs12 class="pa-5">
              <h1 class="display-3">Veja nossos cortes</h1>
            </v-flex>
            <v-flex xs10 sm10 md4 lg3 class="mb-2" v-for="img in cortes" :key="img">
              <a  :href="img" target="_blank" >
                <v-img width="" class="rounded-lg ma-2" aspect-ratio="1.0" :src="img" >
              </v-img>
                </a>
            </v-flex>

           
        </v-layout>

     
      </v-flex>
      </v-layout> -->


      <v-layout row justify-center>
        <v-flex xs12 sm12 class="text-center" >
            <img position="center"  width="60%" :src="logo"/>

        </v-flex>
      </v-layout>
  </div>
</template>

<script>

// import 'viewerjs/dist/viewer.css';
// import Viewer from "v-viewer/src/component.vue";
  import { refFotos, refSessoes } from '@/plugins/firebase' 


export default {
    components: {
      // Viewer
    },

    data(){
      return {
        
        logo: '/imgs/logo.PNG',
        logo_1: '/imgs/logo_1.PNG',
        sobre_header: '/imgs/sobre_1.png',
        sobre_header_mob: '/imgs/sobre_2_mobile.png',
        sobre_1_2: '/imgs/sobre_1_feat.PNG',
        sobre: '/imgs/sobre.PNG',
        sessoes: []
        
      }
    },
    created(){
      this.carregarSessoes()
    },
    methods: {
      async carregarSessoes(){
            this.sessoes = []
            return refSessoes.orderBy("ordem", "asc").get().then(ref => {
                return ref.forEach(async sessao => {
                    // this.sessoes.push(sessao.data())
                    let sessaoRef = {...sessao.data(), fotos: []}
                    await refFotos.where("sessao.id", "==", sessaoRef.id ).get().then(ref => {
                        return ref.forEach(foto => {
                            // this.fotos.push(foto.data());
                            sessaoRef.fotos.push(foto.data())
                        });
                    });
                    this.sessoes.push(sessaoRef);
                })
            });

        },
    }
  }
</script>
<style lang="css" scoped>
.radial-gradient{
    background: radial-gradient(#0A99AF,#057586);
}
</style>