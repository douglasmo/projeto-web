<template>
    <div class="mx-2 grey lighten-1">
       <div class="mt-5  radial-gradient" style="width:100%">
                <div class="text-center">
                    <h3 class="display-2 pt-2 white--text" >Destaques</h3>
                    <h4 class="white--text py-3" style="font-weight:50" >Nossos produtos com maior destaque</h4>
                </div>
        </div>
        <br>
        <v-row class="ma-3"  >
            <v-col v-for="item in produtos" :key="item.id" cols="12" sm="4" md="3" lg="3" xl="2"  >
                    <v-card>

                        <v-divider class="mt-2 pa-1 indigo" ></v-divider>
                            <v-carousel v-if="typeof item.fotos !== 'undefined'" 
                                    cycle
                                    height="100%"
                                    
                                    show-arrows-on-hover>
                                        <v-carousel-item  
                                        v-for="(slide, i) in item.fotos"
                                        :key="i"
                                        >
                                        <v-sheet height="100%">

                                        <v-img :src="slide.img" height="200"  ></v-img>
                                        
                                        </v-sheet>
                                    </v-carousel-item>
                            </v-carousel>
                        <a  :href="'/produto/'+item.id" style="text-decoration: none;" class="black--text">

                        <!-- <v-card-title style="height: 170px">{{item.nome}}</v-card-title> -->
                            <p style="height: 70px; font-size:15px" class="pa-3">{{item.nome}}</p>

                        <v-divider class="indigo" ></v-divider>

                        </a>
                        <v-row justify="center" class="ma-1 pa-3" >
                            R$ <h4 class="display-1"> {{ parseFloat(item.preco).toLocaleString()}}</h4>
                        </v-row>
                        <v-btn class="green" block dark @click="addCarrinho(item)" ><v-icon>mdi-plus</v-icon>add carrinho</v-btn>
                    </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                produtos: []
            }
        },
        created(){
            this.initProdutos();
        }   ,
        methods: {
            addCarrinho(produto){
                this.$store.dispatch("carrinho/addProdutoCarrinho", produto)

            },
            initProdutos(){
                console.log("this.$store.dispatch");
                console.log(this.$store.dispatch);
                this.$store.dispatch("produtos/carregarProdutosDestaques")
                this.produtos = this.$store.getters["produtos/produtosDestaque"]
            }
        }     
    }
</script>

<style lang="css" scoped>
.radial-gradient{
    background: radial-gradient(#0A99AF,#057586);
}
</style>