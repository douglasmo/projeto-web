<template>
<v-container class="pa-5" >
     <v-snackbar v-model="snackbar" timeout="3000" top color="success">
           <span>
               Usuário criado com sucesso!
               <v-btn text @click="snackbar = !snackbar" class="white--text"  >Fechar</v-btn>
               </span>
       </v-snackbar>
<v-layout row justify-center align-center >
    <v-flex xs6 sm8 md6 class="pa-7 mt-5 rounded-t-xl green lighten-3" >
        
    
    <h3 class="pa-5 text-center" >Registrar</h3>
    

    <v-form ref="form" v-model="valid" 
    lazy-validation>

    <v-text-field  prepend-inner-icon="mdi-face"
    v-model="nome" :rules="nomeRules" 
    label="Nome" required>
    </v-text-field>



    <v-text-field  prepend-inner-icon="mdi-email"
    v-model="email" :rules="emailRules" 
    label="E-mail" required>
    </v-text-field>
    
    <v-text-field
    v-model="senha" :rules="passRules" prepend-inner-icon="mdi-security"
    type="password" label="Senha" required>
    </v-text-field>
    
    <!-- <v-text-field  v-if="register"
    v-model="passwordRepeat" :rules="passRules" prepend-inner-icon="mdi-security"
    type="password" label="Repita a senha" required>
    </v-text-field> -->
    

<br>
    <v-layout row justify-space-around >
      
        
            <v-btn v-if="!register"
        :disabled="!valid" color="success" :loading="loading"
         @click="login">
                Login
            </v-btn>

              
            <v-btn v-if="register"
        :disabled="!valid" color="success" :loading="loading"
         @click="criarUsuario">
                Criar usuário
            </v-btn>
        
        
            <v-btn color="error" 
            @click="reset">
                    Limpar
            </v-btn>
    </v-layout>

        </v-form>
    </v-flex>
    {{ getLoginError }}
</v-layout>
</v-container>
</template>

<script>
//import auth from "../../firebaseConfig";
//import firebase from 'firebase';
import { mapActions,mapGetters } from 'vuex'

    export default {
    middleware: 'hideMiddleware',
    data: () => ({
        register: true,
        loading: false,
        snackbar: false,
        
      valid: true,
      
      passRules: [
        v => !!v || 'Senha é obrigatória',
        v => (v && v.length >= 6) || 'Senha precisa ser pelo menos 3 caracteres',

      ],
       nomeRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 3) || 'Nome precisa ter pelo menos 3 caracteres',

      ],
      nome: '',
      email: '',
      senha: '',
      //passwordRepeat: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail precisa ser váilido',
      ],
     
    }),
    computed: {
    //   ...mapGetters(["getCurrentUser", "getLoadingState","getLoginError"])
    getLoginError(){
        return this.$store.getters["authStore/getLoginError"]
    }
    },

    methods: {
        //   ...mapActions(['signup']),

      criarUsuario () {
      
        this.loading = true;
        this.$refs.form.validate();
        
      /*  this.$store.dispatch('signup', {
        email: this.email,
        password: this.senha,
        nome: this.nomegetUserLvl
        });*/

        this.$store.dispatch("authStore/signup",
        {email: this.email,
        password: this.senha,
        name: this.nome,
        lvl: 'EB64284B81296A3D0B08D7925A9E09D9'});
        this.loading = false;
        this.$router.push("/login");

        /*firebase.auth().createUserWithEmailAndPassword(this.email, this.senha).then((user) =>{
            
            this.loading = false;
            this.snackbar = true;
            this.$store.dispatch('signup', user, this.nome);
            this.$router.push("admin/home");
        }, (err) => {
            alert("Erro ao criar usuário");
            console.log(err);
            this.loading = false;
        });
      */

        
      },
      reset () {
        this.$refs.form.reset();
        //this.$router.replace('admin/home')
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },

    }
</script>

<style lang="scss" scoped>

</style>