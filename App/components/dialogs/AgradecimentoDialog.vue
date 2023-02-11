<template>
    <div>
        <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500" persistent 
    >
      

      <v-card>
        <v-card-title class="headline blue darken-2 white--text"></v-card-title  >

        <v-card-text class="text-center">
         
         <v-layout row justify-center >
             <v-flex xs12 md12 sm12 class="pt-5" >
                 <h4 class="display-1" >Agradecemos pela sua preferencia</h4>
             </v-flex>
             <v-flex xs12 md12 sm12  >
          
           <v-avatar size="150">
            <img
                src="https://previews.123rf.com/images/martialred/martialred1811/martialred181100013/112752993-bro-fist-bump-or-power-five-pound-line-art-vector-icon-for-apps-and-websites.jpg"
                alt="Agradecimento"
            >
            </v-avatar>
          
             </v-flex>
             <v-flex xs12 >
               <v-card>
                  <v-card class="primary darken-2 pa-2" dark>

                    <h4 class="display-1 "><small>Seu pedido foi enviado agora, estaremos avaliando em entrando em contato </small>  </h4>
                    <!-- <h4 class="display-1 "><small>Seu horário: </small> <strong>{{ agendamento.start.split("T")[1] }} </strong> </h4>
                    <h4 class="display-1 "><small>Seu dia: </small> <strong>{{new  Date(agendamento.start).getDate() }}/{{new Date(agendamento.start).getMonth() + 1 }}  </strong> </h4>
                    <h4 class="display-1 "><small>Seu barbeiro: </small> <strong>{{ agendamento.barbeiro }}</strong> </h4>
                     -->
                  </v-card>

               </v-card>
               <v-card class="red white--text pa-3 mt-1" >
                    Sugestão<h3 class=""> Que tal tirar um print desta tela? </h3>
               </v-card>
             </v-flex>
         </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="finalizar">
            Fechar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </div>
</template>

<script>
    export default {
        props: ['stateDialog'],
        data () {
        return {
            dialog: false,
            }
        },
        
        methods: {
            carregarAgendamento(){
              // this.agendamento = this.$store.getters.agendamento
            },
            finalizar(){
                this.dialog = false
                location.reload();
            }
        },
        watch: {
            stateDialog(newValue){
                
                this.dialog = newValue
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>