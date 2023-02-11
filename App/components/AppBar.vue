<template>
  <div>
    <v-app-bar fixed app dark class="white--text indigo darken-2">
      <v-toolbar-title class="text-uppercase">
        <span style="font-weight:300"> FluxoCaixa</span> <strong>Fácil</strong>
        <!-- <img src="/imgs/logo_sombra.png" class="pt-1" height="65px" alt=""> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex">
        <v-btn
          v-for="item in menu"
          :key="item.nome"
          text
          router
          :to="item.to"
          :v-if="item.needsAuth || isUserAuth == false"
        >
          <span>{{ item.title }}</span>
        </v-btn>
        
      </div>

      <div>
        <v-row>
          <v-app-bar-nav-icon
            class="d-flex d-sm-none"
            @click.stop="rightDrawer = !rightDrawer"
          ></v-app-bar-nav-icon>

          
        </v-row>
      </div>

     
    </v-app-bar>

   <v-navigation-drawer
      :disable-resize-watcher="true"
      v-model="rightDrawer"
      app
      right
      class="grey darken-1 hidden-sm-and-up"
    >
      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.title"
          router
          :to="item.to"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content class="text-center white--text">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div style="position:fixed; z-index:1000; bottom: 55px; right:23px">
      <v-row>
        <Chat />
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Chat } from "@/components/dialogs/Chat.vue";

export default {
  components: {
    Chat
  },
  data() {
    return {
      drawer: false,
      rightDrawer: false,
      carrinhoDrawer: false,
      menu: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
          needsAuth: false
        },
        // {
        //   icon: "mdi-apps",
        //   title: "Produtos",
        //   to: "/produtos",
        //   needsAuth: false
        // },
        // {
        //   icon: "mdi-chart-bubble",
        //   title: "Sobre",
        //   to: "/sobre",
        //   needsAuth: false
        // },
        {
          icon: "mdi-chart-bubble",
          title: "Contato",
          to: "/contato",
          needsAuth: false
        },
        {
          icon: "mdi-chart-bubble",
          title: "Login",
          to: "/login",
          needsAuth: false
        },
        {
          icon: "mdi-chart-bubble",
          title: "Registre-se",
          to: "/register",
          needsAuth: false
        },
        // {
        // icon: 'mdi-secret',
        // title: 'Agenda',
        // to: '/admin/agenda',
        // needsAuth: true,
        // }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ""
    };
  },

  computed: {
    //  ...mapGetters([{isUserAuth: "authStore/isUserAuth"}, {getCurrentUser: "authStore/getCurrentUser"}])
    isUserAuth() {
      return this.$store.getters["authStore/isUserAuth"];
    },
    getCurrentUser() {
      return this.$store.getters["authStore/getCurrentUser"];
    },
    carrinho() {
      return this.$store.getters["carrinho/getCarrinho"];
    },
    totalCarrinho() {
      let total = 0;
      for (const prod of this.carrinho) {
        total = total + parseFloat(prod.total);
      }
      return total;
    }
  },
  methods: {
    enviarOrcamento() {
      //abrir página de checkout e pedir nome, email e telefone e obervação por produto.
      this.$router.push("/checkout");
    },
    sugestaoProduto() {
      alert("Sugestao produto");
    },
    // ...mapActions([{logout: "authStore/logout"}]),
    removerProdutoCarrinho(item) {
      this.$store.dispatch("carrinho/removeProdutoCarrinho", item);
    },
    logoutAction() {
      this.$store.dispatch("authStore/logout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
