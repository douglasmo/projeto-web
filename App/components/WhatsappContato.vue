<template>
   <div>
        <div class="blue-grey darken-3 pa-5 d-none  d-md-flex d-lg-flex d-xl-flex" >
       <v-row justify="center" class="text-center" >
           <v-col cols="12">
                <a :href="numeroWhats" target="_blank"><img width="90%" :src="img_pc" alt=""></a>
           </v-col>
       </v-row>
    </div>
    
    <div class="blue-grey darken-3 pa-5 d-none d-flex d-sm-flex d-md-none" >
       <v-row justify="center" class="text-center" >
           <v-col cols="12">
                    <v-divider class="white py-1 mb-7"></v-divider>

                <a :href="numeroWhats"><img class="" :src="img_mobile" alt="">
                <h1 style="font-weight:1000; text-decoration:none; " class="white--text px-10 pt-3 pb-5" >Nosso contato pelo whastapp</h1>
                
                <v-divider class="white py-1"></v-divider>
                </a>
                
           </v-col>
       </v-row>
    </div>
   </div>
</template>

<script>
import {refConfiguracoes} from '@/plugins/firebase'

    export default {
        data(){
            return{
                img_pc: '/imgs/whastapp_pc.PNG',
                img_mobile: '/imgs/whastapp_mobile.PNG',
                // textoMensagem: "Olá Alexandre, vi seu contato no site, gostaria de fazer um agendamento.",
                // numeroWhats: "https://api.whatsapp.com/send?phone=554298607670&text="+ "Olá Alexandre, vi seu contato no site, gostaria de fazer um agendamento."+"&app_absent=0",
                numeroWhats: "",
                
            }
        },
       
        created(){
            this.carregarWhats()
        },
        methods: {
            carregarWhats(){
                   refConfiguracoes.get().then((ref)=>{
                       
                    let telefone = ref.docs[0].data().telefoneContato;
                    telefone = telefone.replace("(","").replace(")","")
                    let string = "https://api.whatsapp.com/send?phone=55"+ telefone+"&text="+ "Olá Alexandre, vi seu contato no site, gostaria de fazer um agendamento."+"&app_absent=0";
                    this.numeroWhats = string;
                    console.log(string);
                });
            }
        }
        
        
    }
</script>

<style lang="scss" scoped>
a{
    text-decoration: none;

}
</style>