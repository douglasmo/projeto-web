<template>
    <div>
<div >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn class="green darken-3" dark v-bind="attrs" v-on="on" >
              <!-- <v-icon left>mdi-plus</v-icon> -->
              <span>Sessoes de fotos</span>
          </v-btn>


      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Sessoes

        </v-card-title>

        <div >
           <v-form class="pa-5" v-model="valid" ref="form">
              
            <v-text-field prepend-icon="mdi-pencil" type="text" label="Descrição da sessão" v-model="sessao.descricao" >
            </v-text-field>
         
            <v-text-field prepend-icon="mdi-format-list-bulleted-type" type="number" label="Ordem de exibição" v-model="sessao.ordem" >
            </v-text-field>
         
              
           

           </v-form>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="red darken-2" dark @click="fechar()" > 
            Fechar
          </v-btn>
          <v-btn :disabled="!valid" color="primary darken-2" @click="criarSessao()" :loading="loading"> 
            Salvar
          </v-btn>
          <!-- <v-btn v-if="editar" :disabled="!valid" color="primary darken-2" @click="atualizarItem">
            Atualizar
          </v-btn> -->
        </v-card-actions>

        <div  class="blue-grey lighten-3 pa-7" >
            <h2>Sessões</h2>
            <v-divider class="pt-1 indigo mb-3" ></v-divider>
          <v-row justify="center" >
              <v-col cols="10" class="white" >
                  <div v-for="item in items" :key="item.id" class="px-4" >
                      <v-row>
                          <p>
                              <v-btn @click="apagarSessao(item)" icon class="red white--text mr-1">
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-btn @click="editarSessao(item)" icon class="green white--text mr-1">
                                  <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                {{item.descricao}} | <strong>{{ item.ordem }}</strong>
                        </p> 
                    </v-row>
                      
                  </div>
                  
              </v-col>
          </v-row>

          </div>
      </v-card>

     
    </v-dialog>
  </div>
    </div>
</template>

<script>
import { refSessoes,refFotos, storageRef} from '@/plugins/firebase'
// import {mapActions} from 'vuex'
    export default {
      props: ['acaoEditar', 'itemPassado'],

        data(){
            return {
              imgError: false,
              imgErrorMsg: "",
              items: [],
              sessao: {
                  descricao: ''
              },
              valid: true,
              editar: false,
              loading: false,
              disabled: false,
              dialog: false,
              menu: false,
              section: '',
              imgUploaded: '',
                // rules: [
                //   value => !value || value.size < 2000000 || 'Foto deverá ser menor que 2 MB!',
                // ],
                inputRules: [
                    v => !!v || 'Este campo é obrigatório',
                     v => (v && v.length >= 3) || "Tamanho mínimo é 3 caractéres" 
                ], 
              
            }
        },

    mounted(){
        this.carregarSessoes()
    },
    methods: {
        carregarSessoes(){
            this.items = []
            refSessoes.orderBy("ordem", "asc").get().then(ref => {
                ref.forEach(sessao => {
                    this.items.push(sessao.data())
                })
            })
        },
        criarSessao(){
            if(this.editar){
                refSessoes.doc(this.sessao.id).update(this.sessao).then(ref =>{
                    console.log("Atualizado", ref);
                    this.carregarSessoes();
                    this.editar = false;
                    this.$refs.form.reset()
                    // this.$emit('recarregarLista');  
                    document.location.reload(true);

                })
            }else{

                refSessoes.add(this.sessao).then(ref =>{
                    ref.update({id: ref.id})
                    console.log("Sessao criada!");
                    this.carregarSessoes();
                    document.location.reload(true);
                    // this.$emit('recarregarLista');  

                });
            }
        },
        editarSessao(item){
            this.sessao = {...item};
            this.editar = true;
        },
        fechar(){
            this.editar = false;
            this.$refs.form.reset()
            this.dialog = false;

        },
        async apagarSessao(item){
            
            if(confirm("Deseja mesmo apagar esta sessão?")){
                refSessoes.doc(item.id).delete().then(async() => {

                await this.apagarFotos(item);
                this.carregarSessoes();
                  setTimeout(() => {
                    this.$emit('recarregarLista');  
                }, 1000);
                
            });
            }
        },
        async apagarFotos(item){
            
            return refFotos.where("sessao.id", "==", item.id).get().then(async (ref) =>{
                
                ref.forEach(async foto => {
                    console.log(foto);
                    await storageRef.ref().child(foto.data().path).delete();
                    foto.ref.delete();
                });
            });
        
        }
    },
   

    }
</script>

<style lang="scss" scoped>

</style>