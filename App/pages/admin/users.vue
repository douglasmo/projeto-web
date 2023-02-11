<template>
  <div>
    <v-row justify="center">
      <v-col cols="10">
        <v-col class="blue-grey white--text display-1 pa-5" cols="12">
          <h1>Usuários</h1>
        </v-col>
        <br />

        <br />
        <v-divider class="pa-1 blue-grey mb-1"></v-divider>
        <p>Total de usuários: {{listaItens.length}}</p>
        <v-row v-for="item in listaItens" :key="item.uid">
          <v-col cols="2" sm="3">
            <v-row justify="center"><v-icon size="50">mdi-face</v-icon></v-row>
          </v-col>
          <v-col cols="9" sm="6">
            <v-row justify="center">
              Nome: {{ item.name }} - <br />
              <strong> {{ item.email }}</strong>
            </v-row>
          </v-col>
          <v-row justify="center">
            <v-col cols="10" class="blue darken-4 rounded-xl" sm="6">
              <v-row justify="center">
                <!-- <DialogUser :itemPassado='item'  :acaoEditar='true' @recarregarLista="carregarLista" /> -->
                <v-btn icon>
                  <v-icon class="white--text">mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import {DialogUser} from '@/components/users/DialogUser'
import { refUsers } from "@/plugins/firebase";

export default {
  components: {
    // DialogUser
  },
  layout: "admin",
  // middleware: 'auth',
  // auth: false,
  // middleware: false,
  meta: {
    auth: { authority: 3 }
  },
  data() {
    return {
      refUsers: refUsers,
      listaItens: []
    };
  },

  computed: {
    user() {
      return this.$store.getters["authStore/getCurrentUser"];
    },
    
  },
  methods: {
    carregarLista() {
      this.listaItens = [];
      this.refUsers.get().then(users => {
        users.forEach(user => {
          this.listaItens.push({ ...user.data() });
        });
      });
    }
  },
  mounted() {
    this.carregarLista();
  }
};
</script>

<style lang="scss" scoped></style>
