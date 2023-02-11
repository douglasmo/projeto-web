<template>
    <div>
<div >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="acaoEditar == false" class="success" v-bind="attrs" v-on="on" >
              <v-icon left>mdi-plus</v-icon>
              <span>Novo usuário</span>
          </v-btn>

        <v-btn v-if="acaoEditar == true" class="ma-2 primary"  v-bind="attrs" v-on="on" >
            <v-icon left>mdi-pencil</v-icon>
            <span>Editar</span>
        </v-btn>

      </template>

      <v-card>
        <v-card-title v-if="acaoEditar == false" class="headline grey lighten-2">
          Novo usuário         

        </v-card-title>
        <v-card-title v-if="acaoEditar == true" class="headline grey lighten-2">
          Atualizar usuário

        </v-card-title>

        <div >
           <v-form class="pa-5" v-model="valid">
              
               <v-text-field :rules="inputRules"
               v-model="item.name" prepend-icon="mdi-face"
               label="Nome do usuário" required>
    
               </v-text-field>


              <v-text-field  prepend-inner-icon="mdi-email"
              v-model="item.email" :rules="emailRules" :readonly="acaoEditar"
              label="E-mail" required>
              </v-text-field>
              
              <!-- <v-text-field  prepend-inner-icon="mdi-phone"
              v-model="item.telefone" :rules="inputRules"  v-mask="'(##)#####-####'" 
              label="Telefone" required>
              </v-text-field> -->
              
                
               <v-select
                :items="permissoes"
                v-model="item.lvl"
                item-text="label"
                item-value="permissao"
                label="Permissão"
                ></v-select>

              <v-text-field v-if="acaoEditar == false"
              v-model="item.password" :rules="passRules" prepend-inner-icon="mdi-security"
              type="password" label="Senha" required>
              </v-text-field>
              
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
// import {mapActions} from 'vuex'
    export default {
      props: ['acaoEditar', 'itemPassado'],

        data(){
            return {
                valid: true,
                loading: false,
                editar: this.acaoEditar,
                disabled: false,
                //  dbRef: refUsuarios,
                 refUsers: refUsers,
                 dialog: false,
                  date: null,
                    menu: false,
                 item: {
                   name:'',
                   email:'',
                   password:'',
                 },
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
      // ...mapActions(['signupBarbeiro']),

      checarCampos(){
        return  typeof this.item.nome === 'undefined' || this.item.nome === ''
      //  ||  typeof this.item.nascimento === 'undefined' || this.item.nascimento === ''
      },
       async criarUsuario(){
          let bool = false

          this.loading = true;

          // bool = await this.signupBarbeiro(
          //   {email: this.item.email,
          //   password: this.item.password,
          //   name: this.item.name,
          //   telefone: this.item.telefone});
          bool = await this.$store.dispatch("authStore/signupUser", 
            {email: this.item.email,
            password: this.item.password,
            name: this.item.name,
            telefone: this.item.telefone});

            

            if(!bool){
            
              alert(this.$store.getters["authStore/getLoginError"])
            }


      },
      
     
      atualizarItem(){
                console.log("atualizar")
                console.log(this.item)
                
                  this.refUsers.where("email", "==", this.item.email).get().then(uRef => {
                    console.log("uref",uRef.docs[0]);
                    uRef.docs[0].ref.update({name: this.item.name, lvl: this.item.lvl}).then(()=>{

                      this.$toast.success("Atualizado com sucesso!",{duration: 2000});
                      this.$emit('recarregarLista');  
                    })
                  });

            this.dialog = false;
            //this._vm.$forceUpdate();


      },
    ajustarPagina(){
        
        console.log("Editar",this.editar)
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