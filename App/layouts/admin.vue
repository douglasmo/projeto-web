<template>
  <v-app dark>
    
   <AppBarAdmin />
    <v-main >
     <transition name="slide" mode="out-in" >

           <nuxt />
      </transition>
      
    </v-main>
   
    <v-footer
    
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBarAdmin from '../components/AppBarAdmin'
export default {
    middleware: 'authMiddleware',
  components: {AppBarAdmin},
}
</script>
<style >
  @keyframes slide-in{
    from {transform: translateX(-30px); opacity: 0;}
    to {transform: translateX(0px); opacity: 1;}
  }
   @keyframes slide-out{
    from {transform: translateX(0px); opacity: 1;}
    to {transform: translateX(-30px); opacity: 0;}
  }
  .slide-enter-active{
    animation: slide-in 0.3s ease;
  }
  .slide-leave-active{
    animation: slide-out 0.3s ease;
  }
</style>