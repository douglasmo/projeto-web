<template>
    <div class="grey lighten-2">
        <v-row justify="center" class="mb-5" >
            
           
           

            <div class="mt-5  radial-gradient" style="width:100%">
                <div class="text-center">
                    <h3 class="display-2 pt-2 white--text" >Melhores produtos</h3>
                    <h4 class="white--text py-3" style="font-weight:50" >Nossos produtos mais populares com base em nossas vendas mais recentes</h4>
                </div>
            </div>
           
        </v-row>
        <v-row>
             <v-btn class="ml-10 green darken-5" dark  @click.stop="filtrosDrawer = !filtrosDrawer"><v-icon>mdi-search-web</v-icon>Filtros</v-btn>
            <v-btn class="ml-2 red darken-5" dark v-if="filtrado" @click="limparFiltros()"><v-icon></v-icon>Limpar filtros</v-btn>
        </v-row>
        <br>
        <v-row  class="ma-3"  >
            <v-col v-for="item in produtos" :key="item.id" cols="12" sm="3" md="3" lg="3" xl="3"  >
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

                        <!-- <v-card-title style="height: 120px; font-size:15px"><p>{{item.nome}}</p></v-card-title> -->
                        <p style="height: 70px; font-size:15px" class="pa-3">{{item.nome}}</p>

                        <v-divider class="indigo" ></v-divider>

                        
                        <v-row justify="center" class="ma-1 pa-3" >
                            R$ <h4 class="display-1"> {{ parseFloat(item.preco).toLocaleString()}}</h4>
                        </v-row>
                        </a>
                        <v-btn class="green" block dark @click="addCarrinho(item)" ><v-icon>mdi-plus</v-icon>add carrinho</v-btn>
                    </v-card>
            </v-col>
        </v-row>






        <v-navigation-drawer :disable-resize-watcher="true"  v-model="filtrosDrawer" app >
     <v-card class="pa-2 ma-2 mt-5 mb-5 text-center grey lighten-3">
    <h2 >Filtros</h2>
     </v-card>
       
       <v-col>
           <v-row >
               <v-spacer></v-spacer>
               <v-btn class="red white--text pa-2 mr-3" icon @click.stop="filtrosDrawer = !filtrosDrawer"><v-icon>mdi-close</v-icon></v-btn>
           </v-row>
           <v-text-field v-model="queryText" label="Nome/descrição" ></v-text-field>
           <v-divider></v-divider>
           <!-- <v-text-field label="Valor mínimo" ></v-text-field>
           <v-text-field label="Valor máximo" ></v-text-field> -->


            <v-btn class="green" block dark @click="pesquisar()" ><v-icon>mdi-magnify</v-icon>Pesquisar</v-btn>

           <v-divider></v-divider>
            <br>
            
            <h3 class="display-1 green darken-4 rounded pa-1 white--text text-center" >Categorias</h3>
            <!-- <div v-for="item in categorias" :key="item">

             <v-checkbox 
            @change="filtrarCategorias()"
            v-model="categoriaEscolhida"
            :label="item"
            :value="item"
            ></v-checkbox>
            </div> -->


            <v-combobox
            v-model="categoriaEscolhida"
            :items="categorias"
            chips
            clearable
            label="Escolha uma categoria"
            prepend-icon="mdi-filter-variant"
            solo
            @change="filtrarCategoria()">
            <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
            >
                <strong v-if="item" >{{ item }}</strong>&nbsp;
                
            </v-chip>
            </template>
        </v-combobox>
        <v-btn class="ml-2 red darken-5" dark v-if="filtrado" @click="limparFiltros()"><v-icon></v-icon>Limpar filtros</v-btn>


       </v-col>

       

      
    </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        // filters:{
        //     textFilter: function(value){
        //         if(!value) return ''
               
        //     }
        // },
        data(){
            return {
                filtrosDrawer: false,
                filtrado: false,
                queryText: '',
                categorias: [],
                produtos: [],
                categoriaEscolhida: '',
                
            }
        },
        created(){
            this.initProdutos();
            
        },
        mounted(){
            this.scroll()
        },
        methods: {
            scroll () {
                window.onscroll = async () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    console.log("bottom");
                    if(this.queryText){
                        await this.$store.dispatch("produtos/carregarProdutosFiltrados", {queryText: this.queryText, lastProduct: this.produtos[this.produtos.length - 1]})
                        setTimeout(() => {
                            let temp = this.$store.getters["produtos/produtos"]
                            console.log("LEEENGTH",temp.length);
                            for(const prod of temp){
                                console.log('PROOOOD',prod);
                                this.produtos.push(prod)
                            }
                        }, 500);

                    }else{

                        await this.$store.dispatch("produtos/carregarProdutos", this.produtos[this.produtos.length - 1])
                           setTimeout(() => {
                               let temp = this.$store.getters["produtos/produtos"]
                               console.log("LEEENGTH",temp.length);
                               for(const prod of temp){
                                   console.log('PROOOOD',prod);
                                   this.produtos.push(prod)
                               }
                           }, 500);
                    }


                        // temp.forEach(prod =>{
                        //     this.produtos.push(prod)
                        // });
                        //   this.produtos = this.$store.getters["produtos/produtos"]

                }
                };
            },
             addCarrinho(produto){
                 this.$store.dispatch("carrinho/addProdutoCarrinho", produto)
                 
            },
            pesquisar(){
                this.$store.dispatch("produtos/carregarProdutosFiltrados", {queryText: this.queryText, lastProduct: null})
                this.produtos = this.$store.getters["produtos/produtos"]
                this.filtrado= true
            },
            filtrarCategoria(){
                console.log(this.categoriaEscolhida);
                this.$store.dispatch("produtos/filtrarProdutosCategoria", this.categoriaEscolhida)
                this.produtos = this.$store.getters["produtos/produtos"]
                this.filtrado= true
            },
            limparFiltros(){
                this.$store.dispatch("produtos/carregarProdutos", null)
                this.produtos = this.$store.getters["produtos/produtos"]

                this.filtrado = !this.filtrado
            },
            async initProdutos(){
                // console.log("this.$store.dispatch");
                // console.log(this.$store.dispatch);
                //carregando produtos
                await this.$store.dispatch("produtos/carregarProdutos", null)
                this.produtos = this.$store.getters["produtos/produtos"]
                
                //carregando categorias
                await this.$store.dispatch("produtos/carregarCategorias")
                   
                    
                setTimeout(() => {
                    this.categorias = this.$store.getters["produtos/categorias"]
                     console.log("CATEGOORIAAAAAAAAAAS");
                    console.log(this.$store.getters["produtos/categorias"]);
                    
                }, 1500);
            },
            ajustarText(value){
                 value = value.toString()
                if (value.length > 30) {
                    return value.slice(0, 30) + "..."
                }else{
                    return value
                }
            }
        }     
    }
</script>

<style lang="css" scoped>
.radial-gradient{
    background: radial-gradient(#0A99AF,#057586);
}
</style>