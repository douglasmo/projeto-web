<template>
    <div>
        <!-- <div class="indigo lighten-4">
            <v-row justify="center" align="center" >
                <v-col class="text-center" style="min-height: 450px"  cols="12" sm="12" md="6" lg="6" xl="6" >
                    Logo

                </v-col>
                <v-col class="text-center" style="min-height: 450px"  cols="12" sm="12" md="6" lg="6" xl="6" >
                    registrese

                </v-col>
            </v-row>
        </div> -->

        <v-img src="/imgs/banner_main.png"  ></v-img>
        <v-row justify="center">
            <v-col cols="12" sm="5" md="5" lg="5" xl="5">
                <v-btn class="green pa-5" to="/register" block dark>Registre-se grátis</v-btn>
            </v-col>
        </v-row>
        <v-img src="/imgs/banner_home_lg.png" class="d-none d-sm-flex" ></v-img>
        <v-img src="/imgs/banner_home_mobile.png" class="d-flex d-sm-none" ></v-img>

        <v-img src="/imgs/banner_home_2_lg.png" class="d-none d-sm-flex" ></v-img>
        <v-img src="/imgs/banner_home_2_mobile.png" class="d-flex d-sm-none" ></v-img>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>