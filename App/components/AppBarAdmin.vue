<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app class="indigo">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/imgs/img_perfil.jpg" alt="" />
          </v-avatar>
        </v-flex>
        <br />
        <p class="white--text" v-if="isUserAuth">{{ getCurrentUser.name }}</p>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="item.to"
          router
          exact
          v-if="checkPermissao(item)"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app dark>
      <v-app-bar-nav-icon
        v-if="isUserAuth"
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase white--text">
        <span style="font-weight:300"> Área</span>
        <strong>Administrativa</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <div class="d-none d-sm-flex">

            <v-btn v-for="item in menu" :key="item.title" text color="white" router :to="item.title" :v-if="item.showOnAuth || isUserAuth == false" >
                <span>{{ item.title }}</span>
            </v-btn>

           

        </div> -->

      <div v-if="isUserAuth">
        <!-- <v-btn text color="white" router to="/admin/home">  
            <span> Área admin</span>
                    </v-btn>
                    -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" dark v-bind="attrs" v-on="on" text>
              {{ getCurrentUser.name.split(" ")[0] }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="logoutAction">
                <v-btn text
                  ><v-icon color="black" left @click="logoutAction"
                    >mdi-logout</v-icon
                  >Sair</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!--<v-btn text color="white" router to="/admin/home">  
            <span> {{  getCurrentUser.name.split(" ")[0] }}</span>
            </v-btn> -->
      </div>

      <div>
        <!-- <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="rightDrawer = !rightDrawer"></v-app-bar-nav-icon> -->
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
          :key="item.nome"
          router
          :to="item.rota"
          :v-if="item.showOnAuth || isUserAuth == false"
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content class="text-center white--text">
            <v-list-item-title>{{ item.nome }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div style="position:fixed; z-index:1000; bottom: 55px; right:23px">
      <v-row>
        <ChatAdmin ref="chatAdmin" />
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ChatAdmin } from "@/components/dialogs/ChatAdmin.vue";

export default {
  components: {
    ChatAdmin
  },
  data() {
    return {
      drawer: false,
      rightDrawer: false,
      menu: [
        {
          icon: "mdi-view-dashboard",
          title: "Área administrativa",
          to: "/admin/",
          lvl: 3,
          count: 0
        },
        {
          icon: "mdi-view-dashboard",
          title: "Caixa",
          to: "/user/",
          lvl: 1,
          count: 0
        },
        // {
        //   icon: "mdi-priority-high",
        //   title: "Pedidos",
        //   to: "/admin/pedidos",
        //   lvl: 3,
        //   count: 0 /*this.countMessages*/
        // },
        {
          icon: "mdi-wechat",
          title: "Chat",
          to: "/admin/chat",
          lvl: 3,
          count: 0 /*this.countMessages*/
        },
        {
          icon: "mdi-account",
          title: "Usuários",
          to: "/admin/usuarios",
          lvl: 3,
          count: 0
        },
        // {
        //   icon: "mdi-folder",
        //   title: "Produtos",
        //   to: "/admin/produtos",
        //   lvl: 3,
        //   count: 0
        // },
        {
          icon: "mdi-email",
          title: "Mensagens",
          to: "/admin/mensagem",
          lvl: 3,
          count: 0 /*this.countMessages*/
        },
        // {
        //   icon: "mdi-image",
        //   title: "Fotos",
        //   to: "/admin/fotos",
        //   lvl: 3,
        //   count: 0
        // },
        {
          icon: "mdi-engine",
          title: "Configurações",
          to: "/admin/configuracoes",
          lvl: 3,
          count: 0
        }
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
    getUserLvl() {
      return this.$store.getters["authStore/getUserLvl"];
    },
    getCurrentUser() {
      return this.$store.getters["authStore/getCurrentUser"];
    }
  },

  methods: {
    checkPermissao(item) {
      return this.getUserLvl >= item.lvl;
    },
    // ...mapActions([{logout: "authStore/logout"}]),
    logoutAction() {
      this.$store.dispatch("authStore/logout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
