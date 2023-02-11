<template>
  <div>
    <v-container class="my-2">
      <h1 class="display-3 pa-5 indigo darken-1 white--text rounded-tl-xl">
        Ferramentas
      </h1>

      <v-row>
          <v-col cols="4" >              
              <InvestimentoDialog />
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
 import {InvestimentoDialog} from '@/components/dialogs/InvestimentoDialog'

export default {
  layout: "user",
  meta: {
    auth: { authority: 1 }
  },
   components: {
    InvestimentoDialog
  },
  // middleware: 'auth',
  // auth: false,
  // middleware: false,
};
</script>

<style lang="scss" scoped></style>
