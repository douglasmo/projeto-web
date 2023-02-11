<template>
    <div>
         <v-container class="pa-5"  >
            <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl" > Configurações</h1>

        <v-form  v-model="valid" >
            <v-row>
                <v-col cols="12" >
                    <v-text-field type="text" v-mask="'(##)#####-####'" :rules="inputRules" label="Whastapp de contato" v-model="config.telefoneContato" prepend-icon="mdi-cellphone-android" ></v-text-field>
                    <v-text-field type="text"  label="Email de contato" v-model="config.emailContato" prepend-icon="mdi-email-open" ></v-text-field>

                    
                    <v-text-field type="text"  label="Link Facebook" v-model="config.facebook" prepend-icon="mdi-facebook" ></v-text-field>
                    <v-text-field type="text"  label="Link instagram" v-model="config.instagram" prepend-icon="mdi-instagram" ></v-text-field>
                    <v-text-field type="text"  label="Link Twitter" v-model="config.twitter" prepend-icon="mdi-twitter" ></v-text-field>
                    <v-text-field type="text"  label="Link Linkedin" v-model="config.linkedin" prepend-icon="mdi-linkedin" ></v-text-field>
                    
                    
                         <v-textarea
                        outlined
                        name="input-7-4"
                        label="História"
                        :rules="inputRules"
                        v-model="config.textoHistoria"
                        prepend-icon="mdi-format-align-justify"
                        ></v-textarea>
                </v-col>

                <v-col cols="12">
                    <v-btn class="success" @click="atualizarInformacoes" block >Salvar</v-btn>
                    
                </v-col>
            </v-row>


        </v-form>





         </v-container>

         
    </div>
</template>

<script>
import {refConfiguracoes} from '@/plugins/firebase'
    export default {
         layout: 'admin',
        // middleware: 'auth',
        // auth: false,
        // middleware: false,
         meta: {
             auth: { authority: 3 }
         },
        data(){
            return{
                valid: true,
                config: {
                    telefoneContato: '',
                    emailContato: '',
                    textoHistoria: '',
                    id: '',
                    
                    // telefoneContato: '',
                },
                inputRules: [
                v => !!v || 'Este campo é obrigatório',
                v => (v && v.length >= 3) || 'Nome precisa ter pelo menos 3 caracteres',],
                emailRules: [
                    v => !!v || 'E-mail é obrigatório',
                    v => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido',
                ],
            }
        },
        created(){
            this.carregarInformacoes()
        },
        methods: {
            carregarInformacoes(){
                refConfiguracoes.get().then(ref => {
                    console.log(ref);
                    this.config = ref.docs[0].data()
                });
            },
            atualizarInformacoes(){
                if(this.config.id === ''){
                    refConfiguracoes.add(this.config).then(ref=>{
                        ref.update({id: ref.id});
                        // console.log("adicionado");
                this.$toast.success("Adicionado com sucesso!",{duration: 2000});

                    });
                }else{
                    refConfiguracoes.doc(this.config.id).update(this.config).then(ref=>{
                        console.log(ref);
                                this.$toast.success("Atualizado com sucesso!",{duration: 2000});

                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>