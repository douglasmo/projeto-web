<template>
  <div>
    <v-container class="my-2">
      <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl">
        Caixa
      </h1>

      <v-row justify="center">
        <v-col cols="12">
          <LancamentoDialog :acaoEditar="false" @recarregarLista="init()" />
          <!-- <v-btn class="success" >Novo lançamento</v-btn> -->
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="10" xl="10">
          <v-card>
            <div class="pa-5">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dataEscolhida"
                    label="Escolha o mês"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  type="month"
                  locale="pt-br"
                  v-model="dataEscolhida"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="alterarData()"
                ></v-date-picker>
              </v-menu>
            </div>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisa"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-row justify="center" class="pa-3">
              <v-col cols="12" class="text-center">
                <span
                  >Período:
                  <strong
                    >{{ lancamentoMes.mes }}/{{ lancamentoMes.ano }}</strong
                  ></span
                >
              </v-col>
              <v-col cols="12" class="text-center">
                <span v-if="lancamentoMes.saldo <= 0" class=""
                ><v-chip class="red white--text"
                  >Saldo:
                  <strong class="pl-1 headline"
                    >{{ lancamentoMes.saldo.toLocaleString() }}</strong
                  ></v-chip
                ></span
              >
              <span v-if="lancamentoMes.saldo > 0" class=""
                ><v-chip class="green white--text"
                  >Saldo:
                  <strong class="pl-1 headline"
                    >{{ lancamentoMes.saldo.toLocaleString() }}</strong
                  ></v-chip
              ></span>

              </v-col>
              <v-col cols="12" class="text-center mb-2">
                 <v-chip>
                <span>Quantidade: {{ lancamentoMes.qtdeLancamentos }}</span>
              </v-chip>
              </v-col>
              <span  class="mr-5" v-if="lancamentoMes.entradas"
                ><v-chip class="green darken-4 white--text"
                  >Entradas:
                  <strong class="pl-1"
                    >{{ lancamentoMes.entradas.toLocaleString() }}</strong
                  ></v-chip
              ></span>
              <span class="mr-5"  v-if="lancamentoMes.saidas"
                ><v-chip class="red darken-4 white--text"
                  >Saídas:
                  <strong class="pl-1"
                    >{{ lancamentoMes.saidas.toLocaleString() }}</strong
                  ></v-chip
              ></span>

             
            </v-row>
            <v-data-table
              :headers="headers"
              :items="lancamentos"
              :search="search"
              :items-per-page="100"
            >
              <template v-slot:item.valor="{ item }">
                {{ item.valor }}
              </template>
              <template v-slot:item.tipo="{ item }">
                <v-chip v-if="item.tipo == 'entrada'" color="green" dark>
                  {{ item.tipo }}
                </v-chip>
                <v-chip v-if="item.tipo == 'saida'" color="red" dark>
                  {{ item.tipo }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-row>
                  <LancamentoDialog
                    :acaoEditar="true"
                    :itemPassado="item"
                    @recarregarLista="init()"
                  />

                  <v-btn icon small @click="apagar(item)" class="red ml-1">
                    <v-icon class="white--text" small>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { refLancamentos } from "@/plugins/firebase";
import { LancamentoDialog } from "@/components/dialogs/LancamentoDialog";

export default {
  layout: "user",
  // middleware: 'auth',
  // auth: false,
  // middleware: false,
  meta: {
    auth: { authority: 1 }
  },
  components: {
    LancamentoDialog
  },
  data() {
    return {
      dataEscolhida: "",
      usuario: "",
      lancamentos: [],
      lancamentoMes: {},
      mes: "",
      ano: "",
      search: "",
      menu: false,

      headers: [
        { text: "Data", align: "start", value: "data" },
        { text: "Descrição", value: "descricao" },
        { text: "Tipo", value: "tipo" },
        { text: "Valor", value: "valor" },
        { text: "Ações", value: "actions" }
      ]
    };
  },
  mounted() {
      this.beforeInit();
    this.init();
  },
  methods: {
      beforeInit(){
        this.ano = new Date().getFullYear().toString()
      this.mes = (new Date().getMonth() + 1).toString()
      if(this.mes.length < 2){
        this.mes = "0" + this.mes
      }
      this.dataEscolhida = this.ano +"-"+ this.mes
      },
    init() {
       
    //   this.dataEscolhida = this.ano + "-" + this.mes
      //carregar lancamentos
      console.log("Carregando pagina");
      this.usuario = this.$store.getters["authStore/getCurrentUser"];
      this.lancamentos = [];
      this.lancamentoMes = {}
      refLancamentos
        .where("id_user", "==", this.usuario.uid)
        .where("mes", "==", this.mes)
        .where("ano", "==", this.ano)
        .get()
        .then(ref => {
          //    console.log(ref);
          for (const item of ref.docs) {
            console.log(item.data().lancamentos);
            this.lancamentos = item.data().lancamentos;
            this.lancamentoMes = item.data();
            // let lista = [];
            // for (const lanc of item.data().lancamentos) {
            //   lanc.valor = lanc.valor.toLocaleString();
            //   lista.push(lanc);
            // }
            // this.lancamentos = lista;
          }
          console.log(this.lancamentos);
        });
    },
    async apagar(itemPassado) {
      if (confirm("Tem certeza que deseja excluir este lançamento?")) {
        let refLanc = await refLancamentos
          .where("ano", "==", this.ano)
          .where("mes", "==", this.mes)
          .where("id_user", "==", this.usuario.uid)
          .get();

        let lancAtt = refLanc.docs[0].data();
        let listaNova = lancAtt.lancamentos.filter(item => {
          if (item.id == itemPassado.id) {
            return false;
          } else {
            return true;
          }
        });
        lancAtt.lancamentos = listaNova;

        lancAtt = this.processarSaldo(lancAtt);
        refLanc.docs[0].ref.update(lancAtt);
        this.lancamentoMes = lancAtt;
        this.lancamentos = lancAtt.lancamentos;
      }
    },
    processarSaldo(lancAtt) {
      let saldo = 0;
      let qtdeLancamentos = 0;
      let saidas = 0
      let entradas = 0
      for (const lancamento of lancAtt.lancamentos) {
        console.log("VALORR",lancamento.valor);
        let valor = lancamento.valor.toString().replace("R$","").replace(".","").replace(",",".")
        if (lancamento.tipo == "entrada") {
          saldo = saldo + parseFloat(valor);
        } else {
          saldo = saldo - parseFloat(valor);
        }
        if(lancamento.tipo == 'entrada'){
          entradas += parseFloat(valor);
        }
        if(lancamento.tipo == 'saida'){
          saidas += parseFloat(valor);
        }


        qtdeLancamentos++;
      }
      lancAtt.entradas = entradas;
      lancAtt.saidas = saidas;
      lancAtt.saldo = saldo;
      lancAtt.qtdeLancamentos = qtdeLancamentos;
      return lancAtt;
    },
    alterarData(data) {
      this.$refs.menu.save(this.dataEscolhida);
      console.log(this.dataEscolhida);
      this.ano = this.dataEscolhida.split("-")[0]
      this.mes = this.dataEscolhida.split("-")[1]

      this.init()
    },
    imprimir() {
      print();
    }
  }
};
</script>

<style lang="scss" scoped></style>
