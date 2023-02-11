<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="success pa-5" v-bind="attrs" v-on="on">
          <v-icon left>mdi-calculator</v-icon>
          <span>Simulador de investimentos</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Calculadora
        </v-card-title>

        <div class="pa-5">
          <v-form class="pa-5" v-model="valid" ref="form">
            <v-text-field
              v-model="invest.capital"
              label="Valor a ser aplicado"
              prepend-icon="mdi-currency-usd"
              v-money="money"
              :rules="inputRules"
            >
            </v-text-field>
            <v-text-field
              v-model="invest.prazo"
              label="Prazo"
              prepend-icon="mdi-update"
              placeholder="Informe quantos meses ficará investido"
              :rules="inputRules"
            >
            </v-text-field>

                    
                <v-text-field
              v-model="invest.taxa"
              label="Taxa ANUAL"
              prepend-icon="mdi-percent"
              v-money="percentage"
              placeholder="Informe qual o percentual ANUAL do investimento"
              :rules="inputRules"
            >
            </v-text-field>
              <v-checkbox
                    v-model="invest.descontarIR"
                    label="Calcular descontado de IR Regressivo?"
                    ></v-checkbox>
          </v-form>
        </div>

        <v-divider></v-divider>
        <div class="pa-5">
            <span>Resultado BRUTO</span>
          <v-row justify="center">
            <v-col cols="12">
                <v-row justify="center">
            R$ <h4 class="display-3">{{ investFinal.montante }}</h4>   
                </v-row>
            </v-col>
            <v-col cols="12" >
                <span>Lucro </span>
                <v-row justify="center">
                    R$<h4 class="display-3">{{ investFinal.rentabilidade }}</h4>   
                </v-row>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="calcular" :disabled="!valid">
            Simular
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      invest: {
        capital: "",
        prazo: "",
        taxa: "",
        descontarIR: false
      },
      investFinal: {
        montante: 0,
        rentabilidade: 0,
        mediaMensal: 0,
        benchmarking: 0
      },
      exibirInvestimento: false,
      inputRules: [
        v => !!v || "Este campo é obrigatório",
        v => (v && v.length >= 1) || "Tamanho mínimo é 1 caractéres"
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        // suffix: ' #',
        precision: 2,
        masked: false
      },
      percentage: {
        decimal: ".",
        //thousands: ".",
        //prefix: "R$ ",
        suffix: "%",
        precision: 2,
        masked: false
      },
      tabelaIR:{
          6: 0.225,
          12: 0.20,
          24: 0.175,
          25: 0.15,
      }
    };
  },
  methods: {
    calcular() {
      let capital = parseFloat(
        this.invest.capital
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      );
      let taxa = parseFloat(this.invest.taxa.replace("%", "")) / 12 / 100;

      // console.log("Final",final);
      let final = capital * Math.pow(1 + taxa, this.invest.prazo).toFixed(2);
      this.investFinal.montante = final.toLocaleString();
      let rentabilidade = (final - capital)
      if(this.invest.descontarIR){
          rentabilidade = this.descontarIR(rentabilidade)
      }
      this.investFinal.rentabilidade = rentabilidade.toLocaleString()
      
      this.exibirInvestimento = true;
    },
    descontarIR(valor){
        let prazo = this.invest.prazo
        let ir = 0
        if(prazo <= 6){
            ir = 0.225
        }
        if(prazo > 6 && prazo <= 12){
            ir = 0.20
        }
        if(prazo > 12 && prazo <= 24){
            ir = 0.175
        }
        if(prazo > 24){
            ir = 0.15
        }

        return valor * (1 - ir)
    }

  }
};
</script>

<style lang="scss" scoped></style>
