<template>
    <div>
        
        <v-row justify="center">

            <v-col cols="12" class="my-5" >
                <div class="mx-5" >
                    <v-card class="pa-3">
                        <h1 class="display-3 "> Contato</h1>
                        
                                        
                        <v-form ref="form" v-model="valid" lazy-validation class="pa-5" >

                        <v-text-field
                        v-model="mensagem.nome" :rules="inputRules" prepend-inner-icon="mdi-security"
                        type="text" label="Digite seu nome" required>
                        </v-text-field>

                        <v-text-field  prepend-inner-icon="mdi-email" v-model="mensagem.email" :rules="emailRules" 
                        label="E-mail" required>
                        </v-text-field>
                        
                        <v-text-field v-mask="'(##)#####-####'"  prepend-inner-icon="mdi-cellphone-android" v-model="mensagem.telefone" :rules="inputRules" 
                        label="Telefone" required>
                        </v-text-field>

                         <v-textarea
                        outlined
                        name="input-7-4"
                        label="Mensagem"
                        :rules="inputRules"
                        v-model="mensagem.texto"
                        ></v-textarea>

                        <v-btn class="success mt-3" :disabled="!valid" @click="enviarMensagem" block>
                            Enviar
                        </v-btn>
                    </v-form>

                    </v-card>
                </div>
                <v-divider class="my-5" ></v-divider>
            </v-col>
          
            <v-col cols="10" class="my-5">

                <v-card class="pl-7">
                    <h3 class="display-2 mb-7" >Informações contato</h3>
                    <div class="mb-5"> 
                        <span class="mx-7" >Endereco </span>  <address class="mx-7">   Rua Cruz Machado 1276-1342 Vila Rio Branco, Castro - PR</address>
                        
                        <br><br>

                    
                    </div>
                </v-card>
            </v-col>
            
            <v-col cols="12" sm="10" md="7" lg="6" xl="6" >

                <v-card class="blue-grey mb-5 pa-3 text-center" dark><span class="display-3">Localização</span></v-card>
                
                <iframe  
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.845932442932!2d-49.99507448550934!3d-24.8007286144063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c29d167d1ef621%3A0x5531a9fbff6baf55!2sBarbearia%20Lisboa!5e0!3m2!1spt-BR!2sbr!4v1600896175531!5m2!1spt-BR!2sbr"
                 width="100%" height="450" frameborder="0" style="border:0;" 
                 allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

            </v-col>
            

        <div>
            
        </div>

        </v-row>
    </div>
</template>
<script>
import {refMensagens} from '@/plugins/firebase'

export default {
  auth: false,
  middleware: false,
   data(){
            return {
            refMensagens: refMensagens,
            valid: true,
            inputRules: [
            v => !!v || 'Este campo é obrigatório',
            v => (v && v.length >= 3) || 'Nome precisa ter pelo menos 3 caracteres',],
            emailRules: [
                v => !!v || 'E-mail é obrigatório',
                v => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido',
            ],
            mensagem: {
                nome: '',
                email: '',
                texto: '',
            }
            }
        },
        methods: {
            enviarMensagem(){
                if(this.checarMensagem()){
                    let fatorMultiplicacao = new Date().getTimezoneOffset() != 180 ? (180 * 60 * 1000) : 0
                    var horaVisivel = new Date().getTime() + fatorMultiplicacao;
                    this.mensagem.hora = horaVisivel;
                    this.mensagem.lida = false;
                    refMensagens.add(this.mensagem).then((snap)=>{
                          snap.update({id:snap.id });
                            this.$toast.success("Mensagem enviada com sucesso!",{duration: 2000});
                                this.$refs.form.reset();

                    });
                }
            },
            checarMensagem(){
                let boolCampos = true
                

                if(this.mensagem.nome && this.mensagem.email && this.mensagem.texto){
                   boolCampos = true
                }else{
                    boolCampos = false
                }
                

              
                return boolCampos
            }
        }
    
}
</script>

<style  scoped>

</style>
