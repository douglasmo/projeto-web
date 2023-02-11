<template>
        <!-- :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null" -->
     <div >
         <v-col >
             <div  v-if="visible" class="mb-5" style="height:450px;  width: 320px">
             <!-- Mensagens -->
             <v-card class="pa-5 red darken-2 white--text">
                 <v-row>
                    <span>Mensagens - Usuario</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="onClose"><v-icon class="white--text">mdi-close</v-icon></v-btn>
                 </v-row>

             </v-card>
             <div class="red lighten-4" ref="chatbox" style="height: 80%; overflow-y:scroll">
                 <v-col cols="12">

               
                 <!-- Texto para CLIENTE (left side) -->
                 <v-row justify="space-around" v-for="item in messages" :key="(Math.random(1000000)).toString()">
                     <v-col cols="12" v-if="item.participantId == 2">
                        <v-row>
                            <v-col cols="1">
                                <v-avatar class="pa-1" size="25">
                                <img src="/imgs/guest.png" alt="">
                            </v-avatar>
                            </v-col>
                            
                            <v-col cols="10">
                                <v-card class="pa-3 rounded-tr-xl orange darken-3 white--text" >
                                    <div style="font-size:12px"> Cliente</div>
                                    <p>{{item.content}}</p>
                                    <div style="font-size:12px"> 10:20</div>
                                </v-card>
                            </v-col>
                        </v-row>
                     </v-col>
                     
                 
                    <v-col v-if="item.participantId == 1" cols="12">
                            <v-row>
                                                
                                <v-col cols="10">
                                    <v-card class="pa-3 rounded-tl-xl text-right" >
                                        <div style="font-size:12px"> Empresa</div>
                                     <p>{{item.content}}</p>
                                        <div style="font-size:12px"> 10:20</div>
                                    </v-card>
                                </v-col>

                                <v-col cols="1">
                                    <v-avatar class="pa-1" size="25">
                                    <img src="/imgs/guest.png" alt="">
                                    </v-avatar>
                                </v-col>
                                
                            </v-row>
                        </v-col>

                 </v-row>
            


               
                
                 
                 
                 
                 </v-col>
             </div>
             <v-text-field v-model="texto" label="Texto"  v-on:keyup.enter="onMessageSubmit()" >

             </v-text-field>
         </div>
         </v-col>
        <!-- <v-list-item-title  v-text="chatId" @click="abrirChat()"></v-list-item-title> -->
        <v-btn  @click="abrirChat()" block class="blue white--text pa-5"><v-icon>mdi-chat</v-icon><span class="pl-3"> </span> Abrir chat</v-btn>
   </div>
</template>

<script>
import { Chat } from 'vue-quick-chat'
import { realTime } from '@/plugins/firebase'
import 'vue-quick-chat/dist/vue-quick-chat.css';

    export default {
        props: ["chatId"],
        components: {
            Chat
        },
        
        data(){
            return {
            texto: '',
            visible: false,
            ip: '',
            audio: '',
            participants: [
                {
                    name: 'Cliente',
                    id: 2,
                    profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                },
               
            ],
            myself: {
                name: 'Empresa',
                id: 1,
                profilePicture: '/imgs/guest.png'
            },
            
            messagesGravar:[],
            messages: [
              
            ],
            chatTitle: 'Conversa com a empresa',
            placeholder: 'Envie sua mensagem',
            colors: {
                header: {
                    bg: '#d30303',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#fff',
                        text: '#bdb8b8'
                    },
                    others: {
                        bg: '#fb4141',
                        text: '#fff'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#b91010',
                submitImageIcon: '#b91010',
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            hideCloseButton: false,
            submitIconSize: 25,
            closeButtonIconSize: "20px",
            asyncMode: false,
            // toLoad: [
               
            // ],
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            displayHeader:true,
            profilePictureConfig: {
                others: true,
                myself: true,
                styles: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                }
            },
            timestampConfig: {   
                format: 'HH:mm',
                relative: false
            },
            // there are other options, you can check them here
            // https://soapbox.github.io/linkifyjs/docs/options.html
            linkOptions: {
                myself: {
                    className: 'myLinkClass',
                    events: {
                        click: function (e) {
                            alert('Link clicked!');
                        },
                        mouseover: function (e) {
                            alert('Link hovered!');
                        }
                    },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                },
                others: {
                    className: 'othersLinkClass',
                    events: {
                        click: function (e) {
                            alert('Link clicked!');
                        },
                        mouseover: function (e) {
                            alert('Link hovered!');
                        }
                    },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                }
            }
        }
    },
    mounted(){
        this.carregarSom()
        
        },
    created(){
        this.boundVariables()
    },
    methods: {

        boundVariables(){

            this.visible = this.$store.getters["chat/getEstado"]
            this.ip = this.$store.getters["chat/getChatId"]
            
            // this.$parent.$on("openChat", )
        },
      onType: function (event) {
            //here you can set any behavior
        },
        loadMoreMessages(resolve) {
        
            // setTimeout(() => {
            //     resolve(this.toLoad); //We end the loading state and add the messages
            //     //Make sure the loaded messages are also added to our local messages copy or they will be lost
            //     // this.messages.unshift(...this.toLoad);
            //     this.toLoad = [];
            // }, 1000);
        },
        onMessageSubmit: function () {
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */
           
           let timestamp =  {
               day: new Date().getDate(),
               hour: new Date().getHours(),
               millisecond: new Date().getMilliseconds(),
               minute: new Date().getMinutes(),
               month: new Date().getMonth() + 1,
               second: new Date().getSeconds(),
               year: new Date().getFullYear(),
           }
           let mensagem = {
                    content: this.texto,
                    myself: false,
                    participantId: 1,
                    timestamp: timestamp,
                    uploaded: false,
                    viewed: false,
                    type: 'text'
                }
            //  this.messages.push(mensagem);
            // console.log(message);
            this.messagesGravar = []
            this.messagesGravar = this.messages
            this.messagesGravar.push(mensagem);
            // console.log(this.messages);
            realTime.ref("/chat/"+this.ip+"/").set(this.messagesGravar)

            this.texto = ''

            /*
            * you can update message state after the server response
            */
            // timeout simulating the request
            setTimeout(() => {
                // message.uploaded = true
                mensagem.uploaded = true
            }, 2000)
        },
        async carregarSom(){
          this.audio = new Audio(require('~/assets/sounds/pristine609.ogg'))
        },
        async abrirChat(){
             this.visible = !this.visible;
                // this.audio = new Audio(require('@/static/sounds/pristine609.ogg'))
                
                
            this.ip = this.$store.getters["chat/getChatId"]

            //   this.ip = this.chatId.split("|")[1]
                console.log("Carregando mensagens do IP",this.ip);
                    
                    var messages = await realTime.ref("/chat/"+this.ip+"/")
                    console.log("messagess",messages);
                    // this.messages = [this.msgPadrao]
                    const content = this.$refs.chatbox; 
                    
                    messages.on('value', (snap) =>{
                        if(this.messages.length > 1){
                            
                            this.messages = []
                        }
                        

                        let lastChild = snap.val()[snap.val().length - 1]
                        console.log(lastChild);
                        if(lastChild.participantId === 2){
                            console.log("PLAYYYYYY");
                            this.audio.play()
                        }

                        snap.val().forEach(val =>{
                                if(val.timestamp.c){
                                    try {
                                        
                                        val.timestamp = val.timestamp.c
                                    } catch (error) {
                                        
                                    }
                                }
                        
                        
                        this.messages.push(val)
                        // this.messagesGravar.push(val)
                        // console.log("add mensagem",val);
                        
                        
                           
                                               
                        setTimeout(() => {
                           content.scrollTop = content.scrollHeight 
                        }, 300);

                        })
                    })

               
        },
        onClose() {
            //  this.visible = !this.visible;
             this.$store.dispatch("chat/setEstado", false)
             this.visible= this.$store.getters["chat/getEstado"]
            console.log(this.$store.getters["chat/getEstado"]);

        },
        onImageSelected(files, message){
            let src = 'https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg'
            this.messages.push(message);
            /**
             * This timeout simulates a requisition that uploads the image file to the server.
             * It's up to you implement the request and deal with the response in order to
             * update the message status and the message URL
             */
            setTimeout((res) => {
                message.uploaded = true
                message.src = res.src
            }, 3000, {src});
        },
        onImageClicked(message){
            /**
             * This is the callback function that is going to be executed when some image is clicked.
             * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
             */
            console.log('Image clicked', message.src)
        }
    }
    }
</script>

<style  scoped>
 /* .message-text-box {
            padding: 0 10px 0 10px;
            flex: 1;
            overflow: hidden;
        } */
</style>