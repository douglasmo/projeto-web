<template>
    <div>
        <v-card>

            <v-card-title>Seu carrinho</v-card-title>

            <fieldset class="ma-5 pa-5">
                <div class="red pa-3 white--text" block >Resumo</div>
                <v-row>
                    <v-col>  <span>Total:</span> <span>R$ {{totalCarrinho.toLocaleString()}}</span></v-col>
                </v-row>
                
                <v-form ref="form" v-model="valid" class="pa-5" >

                <fieldset class="pa-2">
                    <legend class="pa-3 red white--text">Informe seus dados</legend>
                    <v-row class="pa-3" justify="center" >
                        <v-col cols="12" sm="4" lg="4" xl="4" >
                            <v-text-field :rules="inputRules" label="Informe seu nome" v-model="contato.nome" prepend-icon="mdi-account" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" lg="4" xl="4" >
                            <v-text-field  v-mask="'(##)#####-####'" placeholder="(42)0000-0000" label="Seu telefone" v-model="contato.telefone" prepend-icon="mdi-phone" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" lg="4" xl="4" >
                            <v-text-field :rules="emailRules" label="Seu email"  v-model="contato.email" prepend-icon="mdi-mail" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" lg="8" xl="8" >
                            <v-textarea  :rules="inputRules" label="Observações" v-model="contato.observacao" prepend-icon="mdi-format-align-justify" ></v-textarea>
                        </v-col>
                    </v-row>

                    <v-btn  class="green white--text mb-5" :disabled="!valid" @click="enviarPedido()" block>Enviar pedido</v-btn>
                    
                    <p class="red--text">Revise seu pedido abaixo</p>
                </fieldset>

                </v-form>
            </fieldset>


            <div class="pa-5">
                <v-row v-for="item in carrinho" :key="item.id" class="mb-2 grey lighten-3" >
                    <v-col cols="12" sm="4" md="4" lg="4" xl="4" >
                        
                            <v-img :src="item.fotos[0].img" class="rounded-xl"   ></v-img>
                        
                        <!-- <v-img v-if="produto.fotos" :src="produto.fotos[0].img" ></v-img> -->
                    </v-col>
                <v-col cols="12" sm="7" md="7" lg="6" xl="5" class="grey lighten-2 rounded-r-xl">
                    <div class="mt-8">
                        <!-- <v-card-title class="display-1">{{item.nome}}</v-card-title> -->
                    <a  :href="'/produto/'+item.id" style="text-decoration: none;" class="black--text">

                        <h2 class="text-center">{{item.nome}}</h2>

                    </a>
                        <br>
                        <v-divider></v-divider>
                        <v-row class="pa-3" justify="space-around">
                            <br>
                            <v-chip class="mt-2 green">Quantidade: <span> {{item.qtde}}</span></v-chip>
                            
                            <span v-if="item.total" class="display-1" >R${{item.total.toLocaleString()}}</span>
                            <br>
                        </v-row>

                        <br>
                        <v-btn block class="py-2 green mb-2" dark @click="addCarrinho(item)" >
                            <v-icon>mdi-cart</v-icon>
                            Adicionar mais
                        </v-btn>
                         
                        <v-btn block class="py-2 red" dark @click="removerProdutoCarrinho(item)" >
                            <v-icon>mdi-delete</v-icon>
                            Remover do carrinho
                        </v-btn> 
                    </div>

                </v-col>

                </v-row>
            </div>
        </v-card>
              <AgradecimentoDialog :stateDialog="dialogAgradecimentoState" />

    </div>
</template>

<script>
import {refPedidos} from '@/plugins/firebase'
import AgradecimentoDialog from '@/components/dialogs/AgradecimentoDialog.vue'

    export default {
        auth: false,
        middleware: false,
        components: {
            AgradecimentoDialog
        },
        data(){
            return{
                dialogAgradecimentoState: false,

                valid: true,
                inputRules: [
                v => !!v || 'Este campo é obrigatório',
                v => (v && v.length >= 3) || 'Nome precisa ter pelo menos 3 caracteres',],
                emailRules: [
                    v => !!v || 'E-mail é obrigatório',
                    v => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido',
                ],
                contato: {
                    nome: '',
                    email: '',
                    telefone: '',
                    observacao: '',
                }
            }
        },
        computed:{
             carrinho(){
                return this.$store.getters["carrinho/getCarrinho"]
            },
            totalCarrinho(){
                let total = 0;
                for(const prod of this.carrinho){
                total = total + parseFloat(prod.total)
                }
                return total
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
            this.valid = false
            },
            addCarrinho(item){
                this.$store.dispatch("carrinho/addProdutoCarrinho", item)

            },
            removerProdutoCarrinho(item){
        
                this.$store.dispatch("carrinho/removeProdutoCarrinho", item)
            },
            returnMillisecondsNow(){
                let hora = new Date().getHours();
                hora = hora < 10 ? `0${hora}` : hora
                let minuto = new Date().getMinutes();
                minuto = minuto < 10 ? `0${minuto}` : minuto
                let dia = new Date().getDate();
                let mes = new Date().getMonth() + 1;
                let ano = new Date().getFullYear();
                let fullDate = `${ano}-${mes}-${dia}T${hora}:${minuto}-03:00`
                console.log(fullDate);
                let milliseconds = new Date(fullDate).getTime()
                return milliseconds;
            },
            enviarPedido(){

                this.contato.horaPedido = this.returnMillisecondsNow();
                this.contato.carrinho = this.carrinho;
                this.contato.totalPedido = this.totalCarrinho;
                refPedidos.add(this.contato).then(pedRef => {
                    this.contato.id = pedRef.id;
                    pedRef.update({id: pedRef.id});

                    this.dialogAgradecimentoState = true
                    
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>