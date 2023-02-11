<template>
    <div class="pa-5" >
        <v-row>
            <v-col cols="12" sm="7" md="6" lg="6" xl="6" >
                <v-carousel v-if="typeof produto.fotos !== 'undefined'" 
                                    cycle
                                    height="100%"
                                    
                                    show-arrows-on-hover>
                                        <v-carousel-item  
                                        v-for="(slide, i) in produto.fotos"
                                        :key="i"
                                        >
                                        <v-sheet >

                                        <v-img :src="slide.img"   ></v-img>
                                        
                                        </v-sheet>
                                    </v-carousel-item>
                            </v-carousel>
                <!-- <v-img v-if="produto.fotos" :src="produto.fotos[0].img" ></v-img> -->
            </v-col>
            <v-col cols="12" sm="5" md="6" lg="6" xl="6">
                <v-card class="mt-8">
                    <v-card-title class="display-2">{{produto.nome}}</v-card-title>
                    <br>
                    <v-divider></v-divider>
                    <h4 v-if="produto.preco" class="pa-5 display-1 text-center" >R${{produto.preco.toLocaleString()}}</h4>

                    <br>
                    <v-btn block class="py-2 green" dark @click="addCarrinho()" >
                        <v-icon>mdi-cart</v-icon>
                        Adicionar ao carrinho
                    </v-btn>
                </v-card>

            </v-col>
        </v-row>
        <v-divider class="indigo pa-1 mt-3"></v-divider>
        <v-row justify="center" >
             <v-col cols="12" sm="12" md="10" lg="10" xl="8">
                <v-card class="mt-8">
                    <v-card-title class="display-1">Descrição do produto</v-card-title>

                    <p v-if="produto.descricao" class="pa-5 " >{{produto.descricao}}</p>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
import {refProdutos} from "@/plugins/firebase"

    export default {
        props: ["idProduto"],
        data(){
            return {
                produto: {},
            }
        },
        mounted(){
            this.carregarProduto()
        },
        methods: {
            addCarrinho(){
                this.$store.dispatch("carrinho/addProdutoCarrinho", this.produto)

            },
          async carregarProduto(){
        
                console.log("props",this.idProduto);
                  
               let produto = await refProdutos.doc(this.idProduto).get();
               this.produto = produto.data();

              
          }  
        }
        
    }
</script>

<style lang="scss" scoped>

</style>