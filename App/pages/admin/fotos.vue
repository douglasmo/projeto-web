<template>
    <div>
        <v-container class="pa-5"  >
        <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl" > Fotos</h1>
            <div class="ma-5">
            <v-row justify="center" >
                <NovaFotoDialog :acaoEditar="false" @recarregarLista="atualizarTudo" />

                <SessoesDialog class="ml-5" @recarregarLista="atualizarTudo"  />
            </v-row>
            </div>


              <v-row justify="center" class="mt-2" v-for="sessao in sessoes" :key="sessao.id">
                    <v-col cols="10" sm="10" md="10" lg="10" xl="10"   class="grey darken-4 white--text text-center">
                    <v-row justify="center" class="ma-1 pb-7">
                        <v-col cols="12" class="pa-5">
                            <h1 class="display-3">{{sessao.descricao}}</h1>
                        </v-col>
                        
                        <v-col cols="10" sm="10" md="4" lg="3" xl="3" class="mb-2" v-for="img in sessao.fotos" :key="img.id">
    
                            
                            <a href="#"><v-img width="" @click="apagarFoto(img)" class="rounded-lg ma-2" aspect-ratio="1.0" :src="img.imageUrl" >
                            </v-img></a>
                            
                        </v-col>

                    
                    </v-row>

                
                </v-col>
                </v-row>
        </v-container>
    </div>
</template>

<script>
    import NovaFotoDialog from '@/components/dialogs/NovaFotoDialog'
    import SessoesDialog from '@/components/dialogs/SessoesDialog'
    // storageRef
    import { refFotos, refSessoes,storageRef } from '@/plugins/firebase' 

    export default {
         layout: 'admin',
        // middleware: 'auth',
        // auth: false,
        // middleware: false,
         meta: {
             auth: { authority: 3 }
         },
        components: {
            NovaFotoDialog, SessoesDialog
        },
        data(){
            return {
                // fotos: [],
                sessoes: [],
            }
        },
        async mounted(){
            await this.carregarSessoes();
            this.filtrarFotosESessoes();
        },
        methods:{
        async atualizarTudo(){
            await this.carregarSessoes();
            this.filtrarFotosESessoes();
        },
        
        async carregarSessoes(){
            this.sessoes = []
            return refSessoes.orderBy("ordem", "asc").get().then(ref => {
                return ref.forEach(async sessao => {
                    // this.sessoes.push(sessao.data())
                    let sessaoRef = {...sessao.data(), fotos: []}
                    await refFotos.where("sessao.id", "==", sessaoRef.id ).get().then(ref => {
                        return ref.forEach(foto => {
                            // this.fotos.push(foto.data());
                            sessaoRef.fotos.push(foto.data())
                        });
                    });
                    this.sessoes.push(sessaoRef);
                })
            });

        },
         filtrarFotosESessoes(){
            // sessao.fotos
            let fotos = []
            this.sessoes.forEach(sessao => {
                
                this.fotos.forEach(foto =>{
                    // foto.sessao.id == sessao.id ? true : false
                    if(foto.sessao.id == sessao.id){
                        fotos.push(foto);
                    }
                })
                
                sessao.fotos = fotos
                // console.log("fotos",fotos);
            });
            console.log("sessao atualziada",this.sessoes);
            // this.sessoes = sessoesAtualizadas
        },
        apagarFoto(item){
            if(confirm("Deseja apagar esta foto?")){
                refFotos.doc(item.id).delete().then(() =>{
                    storageRef.ref().child(item.path).delete().then(() => {
                    this.$toast.success("Apagada com sucesso!",{duration: 2000});
                    this.atualizarTudo();
                    })
                });
            }
        }
     }
    }
</script>

<style lang="scss" scoped>

</style>