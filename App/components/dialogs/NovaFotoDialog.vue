<template>
    <div>
<div >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="acaoEditar == false" class="blue darken-3" dark v-bind="attrs" v-on="on" >
              <v-icon left>mdi-plus</v-icon>
              <span>Nova foto</span>
          </v-btn>

      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Foto         

        </v-card-title>

        <div >
           <v-form class="pa-5" v-model="valid">
              
            <!-- <v-text-field prepend-icon="mdi-folder" type="number" label="Seção da foto" v-model="section" >
            </v-text-field> -->

            <v-select  :items="sessoes" item-text="descricao" 
            item-value="id" v-model="sessaoEscolhida" :rules="inputRules"
            label="Sessão" @change="ajustarSessaoEscolhida" prepend-icon="mdi-folder"  >
            </v-select>
          <v-file-input
              
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Escolha as fotos da sessão"
              multiple
              v-model="imgUploaded" :rules="inputFoto"
              @change="print" :error="imgError" :error-messages="imgErrorMsg"
          ></v-file-input>
              
            <v-row justify="center">
              <v-col cols="3" v-for="file in listPreview" :key="file" >
                <v-img  :src="file" ></v-img>
              </v-col>
            </v-row>

           </v-form>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  :disabled="!valid" color="primary darken-2" @click="iniciarEnvio()" :loading="loading"> 
            Criar
          </v-btn>
          <!-- <v-btn v-if="editar" :disabled="!valid" color="primary darken-2" @click="atualizarItem">
            Atualizar
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </div>
</template>

<script>
import { refFotos, storageRef, refSessoes} from '@/plugins/firebase'
// import {mapActions} from 'vuex'
    export default {
      props: ['acaoEditar', 'itemPassado'],

        data(){
            return {
              imgError: false,
              imgErrorMsg: "",
              listPreview: [],
              sessaoEscolhida: [],
              sessaoObjeto: {},
              sessoes: [],
              valid: true,
              loading: false,
              editar: this.acaoEditar,
              disabled: false,
              dialog: false,
              menu: false,
              section: '',
              imgUploaded: '',
                // rules: [
                //   value => !value || value.size < 2000000 || 'Foto deverá ser menor que 2 MB!',
                // ],
                inputRules: [
                    v => !!v || 'Este campo é obrigatório',
                     v => (v && v.length >= 3) || "Tamanho mínimo é 3 caractéres" 
                ], 
                inputFoto: [
                    v => !!v || 'Este campo é obrigatório',
                ]
              
            }
        },
    async mounted(){
      await this.carregarSessoes()
    },
    methods: {
      async carregarSessoes(){
            this.sessoes = []
            await refSessoes.orderBy("ordem", "asc").get().then(ref => {
                for(const sessao of ref.docs){
                  console.log(sessao.data());
                  this.sessoes.push(sessao.data())

                }
                // ref.forEach(sessao => {
                //     this.items.push(sessao.data())
                // })
            })
        },
      print(){
        // console.log(this.imgUploaded);
        this.listPreview = []
        this.imgUploaded.forEach((val) =>{
          console.log(val);
          
          this.listPreview.push(URL.createObjectURL(val))
          if(val.size > 2000000){
            this.imgError =  true;
            this.imgErrorMsg =  "Uma das fotos possui tamanho maior que 2 megas";
          }

          
        });
      },
     
      async iniciarEnvio(){
            this.loading = true

            for(let val of this.imgUploaded){
              console.log("Iniciando envio da foto: ",val.name);
            await this.uploadFile(val);
            }
            
          // this.imgUploaded.forEach(async(val) =>{
          //   console.log("Iniciando envio da foto: ",val.name);
          //   await this.uploadFile(val);
          // });
            // this.$emit('recarregarLista');  
           setTimeout(() => {
             this.$emit('recarregarLista');  
           }, 1000);

          this.loading = false
          
          this.$toast.success("Imagens salvas com sucesso!",{duration: 2000});
          this.dialog = false
        
        


      },
      async uploadFile(file){
      
     
        
        let filePath = Math.random().toString().replace(".","") + '_'  +  file.name;
        let imgsRef = storageRef.ref().child(filePath)
        return imgsRef.put(file).then(async (response) => {
          return  response.ref.getDownloadURL().then( async (downloadURL) => {
            // await refFotos.add({path: filePath, section: this.section, imageUrl:downloadURL});
            return refFotos.add({path: filePath, sessao: this.sessaoObjeto, imageUrl:downloadURL}).then(ref => {
                  return ref.update({id: ref.id});
            });
           }).catch(err => {console.log(err)})
       })
        

      },
   
    ajustarSessaoEscolhida(){
      this.sessoes.filter(item => {
        if(item.id == this.sessaoEscolhida){
          this.sessaoObjeto = item
        }
      })
    }

    }


    }
</script>

<style lang="scss" scoped>

</style>