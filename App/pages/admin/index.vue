<template>
    <div>
          <v-container class="my-2" >

                <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl" > Index</h1>

          </v-container>

          
    </div>
</template>

<script>
import {refMensagens} from '@/plugins/firebase'
    export default {
         layout: 'admin',
        // middleware: 'auth',
        // auth: false,
        // middleware: false,
         meta: {
             auth: { authority: 2 }
         },
        data(){
            return {
              
            }
        },
        created(){
            
        },
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped>

</style>