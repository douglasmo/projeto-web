import Vue from 'vue'
// import VueTheMask from 'vue-the-mask'
// Vue.use(VueTheMask)

// export default VueTheMask;


import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

export default VueMaskDirective


