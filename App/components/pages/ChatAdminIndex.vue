<template>
    <div class="ma-5">
        <h3>Lista de conversas abertas</h3>
        <br>
        <v-card
            class="mx-auto"
            
        >
            <v-card-title>Serão carregadas últimas 30 conversas</v-card-title>
            <v-list>
            <v-list-item-group v-model="model">
                <v-list-item
                v-for="(item, i) in items"
                :key="i" @click="abrirConversa(item.text)"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <!-- <ChatAdmin :chatId="item.text" /> -->
                    <v-list-item-title  v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { realTime } from '@/plugins/firebase'
import { ChatAdmin } from '@/components/dialogs/ChatAdmin.vue'

    export default {
        components: {ChatAdmin},
    data: () => ({
      items: [
        
      ],
      model: 1,
    }),
    created(){
        this.carregarListasDeConversas()
        this.prepararNotificacao()
    },
    methods: {
        prepararNotificacao(){
            this.audio = new Audio(require('~/assets/sounds/pristine609.ogg'))

        },
        async carregarListasDeConversas(){
            let chats = await realTime.ref("/chat/")
            console.log("carregando conversas", chats);
            chats.on('value', (snap) =>{
                let lenghtArray = this.items.length;
                this.items = []
                console.log("1 testeeee",snap.val());
                console.log(typeof snap.val());

                Object.entries(snap.val()).map((key, value) => {
                    try {
                        
                        let horaMsg =  key[1][0].timestamp.split("T")[1].slice(0,5)
                        let diaMsg =  new Date(key[1][0].timestamp).getDate() + "/" + (new Date(key[1][0].timestamp).getMonth() + 1).toString()
                        console.log(diaMsg);
                        let text = "Enviado às " + key[1][0].timestamp.split("T")[1].slice(0,5) + " do dia " +diaMsg + " |"+ key[0]
                        // let text = key[0] + "|" + key[1][0].timestamp
                        // console.log(key[1][0].timestamp.split("T")[1].slice(0,5));
                        this.items.push({text:text, icon: "mdi-inbox"})
                        
                    } catch (error) {
                        console.log(error);
                    }
                });
                this.items.reverse()
                this.sortBy("timestamp")
                if(this.items.length > lenghtArray){
                    this.audio.play()
                }
                // for(const item of snap.val()){
                //     console.log(item);
                // }
            });
            
       
        },
        sortBy(prop){
            this.items.sort((a,b) => a[prop] < b[prop] ? -1 : 1);
    
        },
        abrirConversa(item){
            let idConversa = item.split("|")[1]
            console.log(idConversa);
            this.$store.dispatch("chat/alterarEstado",{chatId: idConversa, chatOpen: true})
            console.log(this.$store.getters["chat/getEstado"]);
            // this.$refs.chatAdmin.abrirChat()
            console.log(this.$refs)
        }
    },
    }
</script>

<style lang="scss" scoped>

</style>