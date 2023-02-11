import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17473016 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _e0e119f2 = () => interopDefault(import('..\\pages\\contato.vue' /* webpackChunkName: "pages/contato" */))
const _3faadbf4 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _56580f8d = () => interopDefault(import('..\\pages\\produtos.vue' /* webpackChunkName: "pages/produtos" */))
const _9e155e50 = () => interopDefault(import('..\\pages\\register-admin.vue' /* webpackChunkName: "pages/register-admin" */))
const _17318654 = () => interopDefault(import('..\\pages\\sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _c48c7380 = () => interopDefault(import('..\\pages\\admin\\configuracoes.vue' /* webpackChunkName: "pages/admin/configuracoes" */))
const _2188c4b3 = () => interopDefault(import('..\\pages\\admin\\fotos.vue' /* webpackChunkName: "pages/admin/fotos" */))
const _79e923d2 = () => interopDefault(import('..\\pages\\admin\\mensagem.vue' /* webpackChunkName: "pages/admin/mensagem" */))
const _e69c2df4 = () => interopDefault(import('..\\pages\\admin\\produtos.vue' /* webpackChunkName: "pages/admin/produtos" */))
const _5cb10a4c = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _711bc41e = () => interopDefault(import('..\\pages\\admin\\usuarios.vue' /* webpackChunkName: "pages/admin/usuarios" */))
const _1682eeef = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _17473016,
    name: "admin"
  }, {
    path: "/contato",
    component: _e0e119f2,
    name: "contato"
  }, {
    path: "/login",
    component: _3faadbf4,
    name: "login"
  }, {
    path: "/produtos",
    component: _56580f8d,
    name: "produtos"
  }, {
    path: "/register-admin",
    component: _9e155e50,
    name: "register-admin"
  }, {
    path: "/sobre",
    component: _17318654,
    name: "sobre"
  }, {
    path: "/admin/configuracoes",
    component: _c48c7380,
    name: "admin-configuracoes"
  }, {
    path: "/admin/fotos",
    component: _2188c4b3,
    name: "admin-fotos"
  }, {
    path: "/admin/mensagem",
    component: _79e923d2,
    name: "admin-mensagem"
  }, {
    path: "/admin/produtos",
    component: _e69c2df4,
    name: "admin-produtos"
  }, {
    path: "/admin/users",
    component: _5cb10a4c,
    name: "admin-users"
  }, {
    path: "/admin/usuarios",
    component: _711bc41e,
    name: "admin-usuarios"
  }, {
    path: "/",
    component: _1682eeef,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
