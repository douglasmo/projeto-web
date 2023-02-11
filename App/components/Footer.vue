<template>
  <v-footer dark padless class="mt-7">
    <v-row>
      <v-col cols="12">
        <v-card flat tile class="grey darken-3 white--text text-center">
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon.id"
              class="mx-4 white--text"
              icon
              :href="icon.url"
              target="_blank"
            >
              <v-icon size="24px">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0 my-3">
            Acesse nossos canais através das redes sociais acima.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — Desenvolvido por
            <a
              href="https://www.linkedin.com/in/douglas-martins-oliveira-26009895/"
              ><strong>Douglas</strong></a
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { refConfiguracoes } from "@/plugins/firebase";

export default {
  data: () => ({
    icons: [
      // {id: 0, icon: 'mdi-facebook', url: 'https://www.facebook.com/barberiaclassicalisboa'},
      // //{icon: 'mdi-twitter', url: ''},
      // //{icon: 'mdi-linkedin', url: ''},
      // {id: 1, icon: 'mdi-instagram', url: 'https://www.instagram.com/lisboabarbearia/'},
      // {id: 2, icon: 'mdi-whatsapp', url: 'https://api.whatsapp.com/send?phone=554298607670'},
    ]
  }),
  mounted() {
    this.carregarInformacoes();
  },
  methods: {
    carregarInformacoes() {
      refConfiguracoes.get().then(ref => {
        console.log(ref);
        let dados = ref.docs[0].data();
        let tel = dados.telefoneContato.replace("(", "");
        tel = tel.replace(")", "");
        tel = tel.replace("-", "");
        if (dados.facebook) {
          this.icons.push({ id: 0, icon: "mdi-facebook", url: dados.facebook });
        }
        if (dados.instagram) {
          this.icons.push({
            id: 1,
            icon: "mdi-instagram",
            url: dados.instagram
          });
        }
        if (dados.twitter) {
          this.icons.push({ id: 2, icon: "mdi-twitter", url: dados.twitter });
        }
        if (dados.linkedin) {
          this.icons.push({ id: 3, icon: "mdi-linkedin", url: dados.linkedin });
        }
        this.icons.push({
          id: 4,
          icon: "mdi-whatsapp",
          url: `https://api.whatsapp.com/send?phone=55${tel}`
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
