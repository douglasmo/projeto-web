<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="editar == true"
          small
          class="success"
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon small class="white--text">mdi-grease-pencil</v-icon>
        </v-btn>
        <v-btn v-if="editar == false" class="success" v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon>
          <span>Novo lançamento</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Lançamento
        </v-card-title>

        <div>
          <v-form class="pa-5" v-model="valid" ref="form">
            <v-row justify="center">
              <v-btn-toggle v-model="lancamento.tipo">
                <v-btn value="entrada" class="green" dark>
                  Entrada
                </v-btn>

                <v-btn value="saida" class="red" dark>
                  Saída
                </v-btn>
              </v-btn-toggle>
            </v-row>
            <br />
            <p class="text-center">
              Você escolheu lançamento de:
              <v-card
                class="green white--text"
                v-if="lancamento.tipo == 'entrada'"
                >{{ lancamento.tipo.toUpperCase() + " de caixa" }}</v-card
              >
              <v-card
                class="red white--text"
                v-if="lancamento.tipo == 'saida'"
                >{{ lancamento.tipo.toUpperCase() + " de caixa" }}</v-card
              >
            </p>

            <v-text-field
              :rules="inputRulesTitle"
              v-model="lancamento.descricao"
              prepend-icon="mdi-file-find"
              label="Descrição"
            >
            </v-text-field>

            <v-text-field
              prepend-icon="mdi-currency-usd"
              v-model.lazy="lancamento.valor"
              v-money="money"
              :rules="inputRules"
            >
            </v-text-field>

            <!-- <v-text-field :rules="inputRules"
               v-model="produto.descricao" prepend-icon="mdi-file-find"
               label="Descrição do produto" >
               </v-text-field>
             -->

            <v-text-field
              type="date"
              prepend-icon="mdi-calendar"
              v-model="lancamento.data"
              :rules="inputRules"
            >
            </v-text-field>
            <v-textarea
              prepend-icon="mdi-cursor-text"
              name="input-5-4"
              label="Detalhes do lançamento (opcional)"
              v-model="lancamento.detalhes"
            ></v-textarea>

            <!-- <v-text-field 
               v-model="lancamento.descricao" prepend-icon="mdi-format-align-center"
               label="Categoria" >
               </v-text-field> -->
          </v-form>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="this.editar == false"
            color="primary"
            @click="novoLancamento"
            :disabled="!valid"
            :loading="loading"
          >
            Criar
          </v-btn>
          <v-btn
            v-if="this.editar == true"
            color="primary"
            @click="atualizar"
            :disabled="!valid"
            :loading="loading"
          >
            Atualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { refLancamentos, refFotos, storageRef } from "@/plugins/firebase";
//import EventBus from '../../../bus.js';

export default {
  props: ["acaoEditar", "itemPassado"],
  data() {
    return {
      editar: this.acaoEditar,
      usuario: "",
      refLancamentos: refLancamentos,
      refFotos: refFotos,
      storageRef: storageRef,
      dialog: false,
      date: null,
      menu: false,
      valid: true,
      imgUploaded: "",
      loading: false,
      lancamento: {
        tipo: "entrada"
      },
      imgError: false,
      imgErrorMsg: "",
      listPreview: [],
      inputFoto: [v => !!v || "Este campo é obrigatório"],
      inputRules: [
        v => !!v || "Este campo é obrigatório",
        v => (v && v.length >= 3) || "Tamanho mínimo é 3 caractéres"
      ],
      inputRulesTitle: [
        v => !!v || "Este campo é obrigatório",
        v => (v && v.length >= 3) || "Tamanho mínimo é 3 caractéres",
        v => (v && v.length <= 60) || "Tamanho máximo é 60 caractéres"
      ],

      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        // suffix: ' #',
        precision: 2,
        masked: false
      }
    };
  },

  methods: {
    //ação de editar
    exibirFotos() {},

    async uploadFile(file) {
      let filePath =
        Math.random()
          .toString()
          .replace(".", "") +
        "_" +
        file.name;
      let imgsRef = storageRef.ref().child(filePath);
      await imgsRef.put(file).then(async response => {
        await response.ref
          .getDownloadURL()
          .then(async downloadURL => {
            // await refFotos.add({path: filePath, section: this.section, imageUrl:downloadURL});
            if (typeof this.produto.fotos === "undefined") {
              this.produto.fotos = [];
            }
            this.produto.fotos.push({ img: downloadURL, path: filePath });
            await this.refLancamentos.doc(this.produto.id).update(this.produto);
            // return refFotos.add({path: filePath, idProduto: this.produto.id, imageUrl:downloadURL}).then(ref => {
            //       return ref.update({id: ref.id});
            // });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    prepararLancamento(editar) {
      this.usuario = this.$store.getters["authStore/getCurrentUser"];
      if (editar == false) {
        this.lancamento.id = new Date().getTime().toString();
      }
      this.lancamento.valor = parseFloat(this.lancamento.valor).toFixed(2); //.toLocaleString()

      this.lancamento.timestamp = new Date(
        this.lancamento.data + "T00:00-03:00"
      ).getTime();

      this.lancamento.mes = this.lancamento.data.split("-")[1];
      this.lancamento.ano = this.lancamento.data.split("-")[0];

      // this.produto.preco = this.produto.preco.toFixed(2);

      this.gerarTermosParaPesquisa();
    },
    async atualizar() {
      this.loading = true;

      this.prepararLancamento();

      let refLanc = await this.refLancamentos
        .where("ano", "==", this.lancamento.ano)
        .where("mes", "==", this.lancamento.mes)
        .where("id_user", "==", this.usuario.uid)
        .get();

      let lancAtt = refLanc.docs[0].data();
      let listaNova = lancAtt.lancamentos.filter(item => {
        if (item.id == this.lancamento.id) {
          return false;
        } else {
          return true;
        }
      });
      lancAtt.lancamentos = listaNova;
      lancAtt.lancamentos.push(this.lancamento);
      lancAtt = this.processarSaldo(lancAtt);
      refLanc.docs[0].ref.update(lancAtt);

      // this.$refs.form.reset()

      setTimeout(() => {
        this.$emit("recarregarLista");
      }, 500);
      this.loading = false;

      this.dialog = false;
      // this.$refs.form.reset()

      //this._vm.$forceUpdate();
    },

    async novoLancamento() {
      console.log("registrar");
      this.loading = true;
      if (!this.lancamento.tipo) {
        console.log("indefinido");
        alert("Informe se é ENTRADA ou SAÍDA");
         this.loading = false;
      } else {


        this.prepararLancamento(false);
  
        let refLanc = await this.refLancamentos
          .where("ano", "==", this.lancamento.ano)
          .where("mes", "==", this.lancamento.mes)
          .where("id_user", "==", this.usuario.uid)
          .get();
  
        //Se não houver registro do mês, criamos um novo
        if (refLanc.docs.length == 0) {
          let mesObjeto = {
            lancamentos: [],
            id_user: this.usuario.uid,
            mes: this.lancamento.mes,
            ano: this.lancamento.ano
          };
          mesObjeto.lancamentos.push(this.lancamento);
          mesObjeto = this.processarSaldo(mesObjeto);
  
          this.refLancamentos.add(mesObjeto).then(async ref => {
            console.log("criado novo lancamento para o mês");
          });
        } else {
          //caso contrário, somente vou editar o lançamento do mês existente
  
          let lancAtt = refLanc.docs[0].data();
          lancAtt.lancamentos.push(this.lancamento);
          lancAtt = this.processarSaldo(lancAtt);
          refLanc.docs[0].ref.update(lancAtt);
        }
  
        setTimeout(() => {
          this.$emit("recarregarLista");
        }, 500);
  
        // this.$refs.form.reset()
        this.loading = false;
  
        this.dialog = false;
      }

    },
    gerarTermosParaPesquisa() {
      //gerar termos para pesquisa
      this.lancamento.searchTermsArray = this.lancamento.descricao.split(" ");
      this.lancamento.searchTermsArray = this.lancamento.searchTermsArray.map(
        term => {
          term = term.toLowerCase();
          term = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

          return term;
        }
      );
    },
    processarSaldo(lancAtt) {
      let saldo = 0;
      let qtdeLancamentos = 0;
      let saidas = 0;
      let entradas = 0;
      for (const lancamento of lancAtt.lancamentos) {
        console.log("VALORR", lancamento.valor);
        let valor = lancamento.valor
          .toString()
          .replace("R$", "")
          .replace(".", "")
          .replace(",", ".");
        if (lancamento.tipo == "entrada") {
          saldo = saldo + parseFloat(valor);
        } else {
          saldo = saldo - parseFloat(valor);
        }

        if (lancamento.tipo == "entrada") {
          entradas += parseFloat(valor);
        }
        if (lancamento.tipo == "saida") {
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
    ajustarPagina() {
      console.log("created!");
      console.log(this.editar);
      if (this.editar == true) {
        this.lancamento = this.itemPassado;
        this.lancamento.valor = this.itemPassado.valor.toString();
        this.valid = false;
      }
    }
  },
  mounted() {
    this.ajustarPagina();
  }
};
</script>

<style lang="scss" scoped></style>
