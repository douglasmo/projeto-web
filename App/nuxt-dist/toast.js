import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"position":"top-center"})

const globals = [{"name":"my-error","message":"Oops...alguma coisa deu errado!","options":{"type":"error"}},{"name":"my-success","message":"Operação realizada com sucesso!","options":{"type":"success"}}]
if(globals) {
  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })
}

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}
