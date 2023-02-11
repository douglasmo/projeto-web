<template>
  <div class="produtos">
      
  
  
  <Produtos/>

  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import Slider from '@/components/home/Slider.vue'
import Produtos from '@/components/pages/Produtos.vue'
// import WhatsappContato from '@/components/WhatsappContato.vue'

export default {
  auth: false,
  middleware: false,
  components: {
    Slider,Produtos,
    // Logo,
    // VuetifyLogo
  },
  data(){
    return {
      
    }
  },
  mounted(){
    // this.settarUser();
  },
  methods: {
    
  }


}
</script>
