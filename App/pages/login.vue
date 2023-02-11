<template>
<div>
  <v-container class="pa-5" >
     <v-snackbar v-model="snackbar" timeout="3000" top color="success">
           <span>
               Login com sucesso!
               <v-btn text @click="snackbar = !snackbar" class="white--text"  >Fechar</v-btn>
               </span>
       </v-snackbar>
<v-layout row justify-center align-center >
  
    <v-flex xs12 sm6 md5 lg4 class="pa-7 mt-5 rounded-t-xl rounded-b-xl green lighten-3 loginForm" >
        
    <v-card class="green darken-5 mb-7" >

    <h3 class="pa-5 text-center display-2 white--text" >Login</h3></v-card>
    
    

    <v-form ref="form" v-model="valid" 
    lazy-validation>

    <v-text-field  prepend-inner-icon="mdi-email"
    v-model="email" :rules="emailRules" 
    label="E-mail" required>
    </v-text-field>
    
    <v-text-field
    v-model="senha" :rules="passRules" prepend-inner-icon="mdi-security"
    type="password" label="Senha" required>
    </v-text-field>
 

<br>

<v-row justify="space-around">

        <v-col cols="10" >
            <v-btn v-if="!register" block
          :disabled="!valid" color="success" :loading="loadingState"
          @click="loginAction">
                  Login
              </v-btn>

        </v-col>
        <v-col cols="7" >
          <v-btn color="error" block
          @click="reset">
                  Limpar
          </v-btn>

        </v-col>
        
</v-row>
  
            <div v-if="getLoginError != null" >
              <br  >
              <div class="red pa-2 pl-5 white--text" >
              
              <p>{{ getLoginError }}</p>
            </div>
            </div>
            
        </v-form>

    <v-layout row justify-center>
      <v-flex xs12 class="text-center mt-5">
        <v-btn text class="blue--text" @click="recuperarSenhaAction">Recuperar senha</v-btn>
        
      </v-flex>
      
      </v-layout>    
    </v-flex>
    
</v-layout>
</v-container>
</div>
</template>

<script>
//import firebase from 'firebase';
import { mapActions,mapGetters } from 'vuex'

export default {
    auth: false,
     middleware: false,
    data: () => ({
        register: false,
        loading: false,
        snackbar: false,
      valid: true,
      
      passRules: [
        v => !!v || 'Senha é obrigatória',
        v => (v && v.length >= 3) || 'Senha precisa ser pelo menos 3 caracteres',

      ],
      email: '',
      senha: '',
      //passwordRepeat: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail precisa ser váilido',
      ],
     
    }),
    
    methods: {
      print(){
        console.log("User", this.$store.getters["authStore/getCurrentUser"]);
      },
      loginAction () {
           this.loading =  this.$store.getters["authStore/getLoadingState"]
        // this.loading = this.getLoadingState;
        this.$refs.form.validate();
    
        try {
          this.$store.dispatch("authStore/login", {email: this.email, senha: this.senha})
        } catch (error) {
          console.log(error.message);
        }finally{
          this.$store.commit("authStore/changeLoading", false)
        }
        // this.login();

      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      recuperarSenhaAction(){

        if(typeof this.email == 'undefined' || this.email === "" || this.email == null){
          alert("Favor preencher campo email")
        }else{
          console.log(this.email);
            this.$store.dispatch("authStore/recuperarSenha", this.email)
        //   this.recuperarSenha(this.email)
        }
      }
    },
    computed: {
        
       ...mapGetters({getLoginError: "authStore/getLoginError"}),
      loadingState() {
        return this.$store.getters['authStore/getLoadingState']
        }
    }

    }
</script>

<style  scoped>


</style>