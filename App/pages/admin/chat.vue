<template>
    <div>
        <ChatAdminIndex />
        
    </div>
</template>

<script>
import {ChatAdminIndex} from "@/components/pages/ChatAdminIndex.vue"

    export default {
        components: {
            ChatAdminIndex
        },
        layout: 'admin',
        // middleware: 'auth',
        // auth: false,
        // middleware: false,
         meta: {
             auth: { authority: 3 }
         },
    }
</script>

<style lang="scss" scoped>

</style>