<template>
  <div class="home">
      
  <!-- <Slider/>
  <br> -->
  <Header/>
  <br>
  

  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import Slider from '@/components/home/Slider.vue'
import Header from '@/components/home/Header.vue'

// import WhatsappContato from '@/components/WhatsappContato.vue'

export default {
  auth: false,
  middleware: false,
  components: {
    Slider,Header
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
