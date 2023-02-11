<template>
        <!-- :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null" -->
     <div >
       <Chat v-if="visible" 
        :participants="participants"
        :myself="myself"
        :messages="messages"
        :chat-title="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        
        :border-style="borderStyle"
        :hide-close-button="hideCloseButton"
        :close-button-icon-size="closeButtonIconSize"
        :submit-icon-size="submitIconSize"
        :async-mode="asyncMode"
        :scroll-bottom="scrollBottom"
        :display-header="true"
        :send-images="true"
        :profile-picture-config="profilePictureConfig"
        :timestamp-config="timestampConfig"
        :link-options="linkOptions"
        :accept-image-types="'.png, .jpeg'"
        @onImageClicked="onImageClicked"
        @onImageSelected="onImageSelected"
        @onMessageSubmit="onMessageSubmit"
        @onType="onType"
        @onClose="onClose()"
        style="max-height:500px; overflow:scroll"
        />
        <v-btn v-if="!visible" @click="abrirChat()" block class="blue white--text pa-5"><v-icon>mdi-chat</v-icon><span class="pl-3"> </span> Abrir chat</v-btn>
   </div>
</template>

<script>
import { Chat } from 'vue-quick-chat'
import { realTime } from '@/plugins/firebase'
import 'vue-quick-chat/dist/vue-quick-chat.css';

    export default {
        components: {
            Chat
        },
        
        data(){
             return {
            visible: false,
            ip: '',
            participants: [
                {
                    name: 'Empresa',
                    id: 1,
                    profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                },
               
            ],
            myself: {
                name: 'Cliente',
                id: 2,
                profilePicture: '/imgs/guest.png'
            },
            msgPadrao: {
                content: 'Olá! Que tal nos mandar uma mensagem? Diga seu nome e seu telefone ex: (42) 00000-0000',
                    myself: false,
                    participantId: 1,
                    timestamp: new Date(),
                    type: 'text'
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
        this.carregarConversa()
        },
    methods: {
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
        onMessageSubmit: function (message) {
            /*
            * example simulating an upload callback. 
            * It's important to notice that even when your message wasn't send 
            * yet to the server you have to add the message into the array
            */

           let mensagem = {
                    content: message,
                    myself: false,
                    participantId: 2,
                    timestamp: new Date(),
                    uploaded: true,
                    viewed: true,
                    type: 'text'
                }
            // this.messages.push(message);
            this.messagesGravar = []
            this.messagesGravar = this.messages
            this.messagesGravar.push(message);
            console.log(this.messages);
            realTime.ref("/chat/"+this.ip+"/").set(this.messagesGravar)

            /*
            * you can update message state after the server response
            */
            // timeout simulating the request
            setTimeout(() => {
                message.uploaded = true
            }, 2000)
        },
        async carregarConversa(){
          
        },
        async abrirChat(){
            this.visible = !this.visible;

              let ip = await this.$axios.$get('https://icanhazip.com')
              this.ip = ip.replace(/[^\d]+/g,'')
                console.log(this.ip);
                    
                    var messages = await realTime.ref("/chat/"+this.ip+"/")
                    console.log("messagess",messages);
                    this.messages = [this.msgPadrao]
                    messages.on('value', (snap) =>{
                        if(this.messages.length > 1){
                            
                            this.messages = []
                        }
                        snap.val().forEach(val =>{
                        if(val.timestamp.c){
                            val.timestamp = val.timestamp.c
                        }
                        
                        this.messages.push(val)
                        // this.messagesGravar.push(val)
                        console.log("add mensagem",val);
                        
                        })
                    })
        },
        onClose() {
             this.visible = !this.visible;
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