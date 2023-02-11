<template>
    <div>
    <v-carousel
        cycle
        height="100%"
        hide-delimiter-background
        show-arrows-on-hover
    >
        <v-carousel-item
        v-for="(slide, i) in slideImg"
        :key="i"
        >
        <v-sheet
            :color="colors[i]"
            height="100%"
        >
        <v-img :src="slide"  ></v-img>
            <!-- <v-row
            class="fill-height"
            align="center"
            justify="center"
            >
            <div class="display-3">
                {{ slide }} Slide
            </div>
            </v-row> -->
        </v-sheet>
        </v-carousel-item>
    </v-carousel>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
                ],
                slideImg: [
                    '/imgs/banner_1.jpg',
                    '/imgs/banner_2.jpg',

                ],
                slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
                ],
            }
            },
    }
</script>

<style lang="scss" scoped>

</style>