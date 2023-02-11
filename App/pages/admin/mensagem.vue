<template>
    <div>
          <v-container class="my-2" >

                <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl" > Mensagens</h1>

          </v-container>

          <v-row justify="center" >
              <v-col cols="10" class="mb-2" >
               
                <v-row v-for="item in items" :key="item.id" class="grey lighten-2 rounded-tl-xl mb-2" >
                    <v-col cols="3" class="pa-3 mr-2" >
                        <v-row class="pa-5">
                            
                            <v-col cols="12">
                                <p>Nome: {{ item.nome }}</p>
                                <span>Enviado às: </span>
                                <p><span><strong>{{ new Date(item.hora).getDate() }}/{{new Date(item.hora).getMonth()}} - {{new Date(item.hora).getHours()}}:{{new Date(item.hora).getMinutes()}}</strong></span></p>
                                <span>Telefone</span>
                                <p><strong>{{item.telefone}}</strong></p>
                                <p><v-btn @click="apagar(item)" icon class="red white--text"><v-icon>mdi-delete</v-icon></v-btn></p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="8" class="white my-3" >
                        <p>{{ item.email }}</p>
                        <p>{{ item.texto }}</p>
                    </v-col>
                </v-row>
                
              </v-col>
          </v-row>
    </div>
</template>

<script>
import {refMensagens} from '@/plugins/firebase'
    export default {
         layout: 'admin',
        // middleware: 'auth',
        // auth: false,
        // middleware: false,
         meta: {
             auth: { authority: 2 }
         },
        data(){
            return {
                valid: true,
                refMensagens: refMensagens,
                items: {},
            }
        },
        created(){
            this.carregarMensagens()
        },
        methods: {
            async carregarMensagens(){
                 this.items = [];
                 return this.refMensagens.orderBy("hora","desc").get().then((snap) =>  {
                     snap.forEach( (doc) =>  {
                        
                        this.items.push({...doc.data()});
                        this.updateMensagem(doc.data());
                    });
                });
            },
            async updateMensagem(doc){
                await this.refMensagens.doc(doc.id).update({lida:true});
            },
            apagar(item){
                
                if(confirm("Deseja apagar mesmo?")){
                    this.refMensagens.doc(item.id).delete().then(() =>{
                    console.log("Apagado!");
                    this.$toast.success("Apagado com sucesso!",{duration: 2000});
                    /*var index = this.items.indexOf(item);
                    if (index > -1) {
                        this.items.splice(index, 1);
                    }*/
                this.carregarMensagens();
                });
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>