<template>
    <div>
<div >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn v-if="acaoEditar == false" class="success" v-bind="attrs" v-on="on" >
              <v-icon left>mdi-plus</v-icon>
              <span>Novo barbeiro</span>
          </v-btn> -->

        <v-btn v-if="acaoEditar == true" class="white--text"  v-bind="attrs" v-on="on" icon >
            <v-icon left>mdi-pencil</v-icon>
        </v-btn>

      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Usuário

        </v-card-title>

        <div >
           <v-form class="pa-5" v-model="valid">
              
               <v-text-field :rules="inputRules"
               v-model="item.name" prepend-inner-icon="mdi-face"
               label="Nome" required>
    
               </v-text-field>


              <v-text-field  prepend-inner-icon="mdi-email"
              v-model="item.email" :rules="emailRules" 
              label="E-mail" required>
              </v-text-field>
              
               <v-select
                :items="permissoes"
                v-model="item.lvl"
                item-text="label"
                item-value="permissao"
                label="Permissão"
                ></v-select>
              <!-- <v-text-field  prepend-inner-icon="mdi-phone"
              v-model="item.telefone" :rules="inputRules" 
              label="Telefone" required>
              </v-text-field> -->
              
              <!-- <v-text-field
              v-model="item.password" :rules="passRules" prepend-inner-icon="mdi-security"
              type="password" label="Senha" required>
              </v-text-field> -->
              
           </v-form>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!editar" :disabled="!valid" color="primary darken-2" @click="criarUsuario" :loading="loading"> 
            Criar
          </v-btn>
          <v-btn v-if="editar" :disabled="!valid" color="primary darken-2" @click="atualizarItem">
            Atualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </div>
</template>

<script>
import { refUsers} from '@/plugins/firebase'

    export default {
      props: ['acaoEditar', 'itemPassado'],

    data(){
            return {
                valid: true,
                loading: false,
                editar: this.acaoEditar,
                disabled: false,
                 refUsers: refUsers,
                 dialog: false,
                  date: null,
                    menu: false,
                 item: {},
                 inputRules: [
                    v => !!v || 'Este campo é obrigatório',
                     v => (v && v.length >= 3) || "Tamanho mínimo é 3 caractéres" 
                  ], 
                  passRules: [
                  v => !!v || 'Senha é obrigatória',
                  v => (v && v.length >= 6) || 'Senha precisa ser pelo menos 6 caracteres',
                ],
                emailRules: [
                    v => !!v || 'E-mail é obrigatório',
                    v => /.+@.+\..+/.test(v) || 'E-mail precisa ser váilido',
                  ],
                  

            }
        },
        

    computed: {
        permissoes(){
            return this.$store.getters["authStore/getPermissoesList"]
        }
    },

    methods: {
    //   ...mapActions(['signupBarbeiro']),

      checarCampos(){
        return  typeof this.item.nome === 'undefined' || this.item.nome === ''
      //  ||  typeof this.item.nascimento === 'undefined' || this.item.nascimento === ''
      },
       async criarUsuario(){


      },
      
     
      atualizarItem(){
                // console.log("atualizar")
                // console.log(this.item)
                
                this.refUsers.doc(this.item.uid).update({name: this.item.name, email: this.item.email, lvl: this.item.lvl}).then(() => {
                    this.$toast.success("Atualizado com sucesso!", {duration: 2000})
                    //TODO
                    //atualizar também no Auth
                    
                    //this.Funcoes.carregar();
                    this.$emit('recarregarLista');

                }).catch(err=>{
                    this.$toast.error(err.message, {duration: 2000})
                });
               
            

            this.dialog = false;

            //this._vm.$forceUpdate();


      },
    ajustarPagina(){
        
        console.log(this.editar)
       if(this.editar == true){
         this.item = this.itemPassado;
         
       }
      }
    },
    mounted() {
      this.ajustarPagina()
    }
    }
</script>

<style lang="scss" scoped>

</style>