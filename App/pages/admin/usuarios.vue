<template>
  <v-container class="my-2">
    <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl">
      Usuários
    </h1>
    <v-layout row justify-space-around>
      <v-flex class="ma-5 pa-5">
        <NovoUsuarioDialog
          :acaoEditar="false"
          @recarregarLista="carregarListasAtualizadas"
        />
      </v-flex>
    </v-layout>

    <v-row justify="center">
      <v-col cols="8">
        <v-text-field
          label="Pesquisar"
          type="text"
          prepend-icon="mdi-magnify"
          v-model="filtro"
        ></v-text-field>

        <v-row justify="center">
          <v-btn
            v-if="filtroBool"
            class="red white--text"
            @click="limparFiltro()"
            >Limpar filtros<v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn class="green white--text mr-1" @click="filtrar()"
            >Pesquisar<v-icon small>mdi-magnify</v-icon></v-btn
          >
        </v-row>
      </v-col>
    </v-row>

    <p>Total de usuários: {{ items.length }}</p>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="3"
        v-for="item in items"
        :key="item.id"
      >
        <v-card class="text-center ma-3 pa-3 grey lighten-2">
          <v-card class="green white--text mb-5"> {{ item.nome }}</v-card>

          <v-responsive>
            <v-avatar size="100">
              <!-- <img src="/imgs/img_perfil.jpg" alt=""> -->
              <v-icon size="100">mdi-face</v-icon>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">
              {{ item.name }}
            </div>
            <div class="grey--text">
              {{ item.email }}
            </div>

            <v-divider></v-divider>
            <!-- <div v-if="item.funcoes" class="green lighten-4" >
                            <p class="subheading green lighten-2 mb-1" >Serviços</p>
                            <div v-for="func in item.funcoes" :key="func.id" >
                                <v-chip class="mb-1 green" dark>
                                    {{ func.descricao }}
                                </v-chip>
                            </div>
                        </div>
                        -->
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <NovoUsuarioDialog
                :acaoEditar="true"
                @recarregarLista="carregarListasAtualizadas"
                :itemPassado="item"
              />

              <v-btn class="red ma-2" dark @click="removeUser(item)">
                <v-icon left>mdi-delete</v-icon>
                <span>Remover</span>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NovoUsuarioDialog from "@/components/dialogs/NovoUsuarioDialog";

//import firebase from 'firebase'
import { refUsers } from "@/plugins/firebase";
// import {mapActions } from 'vuex'

export default {
  layout: "admin",
  // middleware: 'auth',
  // auth: false,
  // middleware: false,
  meta: {
    auth: { authority: 3 }
  },
  components: {
    NovoUsuarioDialog
  },
  data() {
    return {
      // dbRefFuncoes: refFuncoes,
      refUsers: refUsers,
      items: [],
      itemsTotais: [],
      filtro: "",
      filtroBool: false
    };
  },
  async created() {
    await this.carregarLista();
  },

  methods: {
    filtrar() {
      this.filtroBool = true;
      this.items = this.itemsTotais;

      this.items = this.items.filter(val => {
        if (val.name.includes(this.filtro) || val.email.includes(this.filtro)) {
          return true;
        } else {
          return false;
        }
      });
    },
    limparFiltro() {
      this.filtroBool = false;
      this.items = this.itemsTotais;
    },
    async carregarListasAtualizadas() {
      await this.carregarLista();
      // this.carregarFuncoes();
    },
    async carregarLista() {
      this.items = [];
      return this.refUsers.get().then(snap => {
        snap.forEach(doc => {
          this.items.push({ ...doc.data() });
          this.itemsTotais.push({ ...doc.data() });
        });
      });
    },

    removeUser(item) {
      //TODO remover usuário do AUTH também
      //Criar uma function
      if (confirm("Deseja excluir mesmo o uusário " + item.name + "?")) {
        refUsers
          .where("email", "==", item.email)
          .get()
          .then(snap => {
            //console.log(snap.docs[0].data().uid);

            refUsers
              .doc(snap.docs[0].data().uid)
              .delete()
              .then(() => {
                console.log("Apagado");
                this.carregarLista();
              })
              .catch(err => {
                alert(err.message);
              });
          })
          .catch(err => {
            alert(err.message);
          });
      } else {
        console.log("Ação cancelada");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
