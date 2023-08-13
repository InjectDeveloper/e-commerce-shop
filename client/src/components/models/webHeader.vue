<template>
    <div class="head">
        <router-link to="/" style="text-decoration: none; color: black">
            <h1 class="co-name">Winkeys<span>.ru</span></h1>
        </router-link>
        <div class="f-burg">
            <div class="menu-btn" id = 'menu-btn' v-on:click="onMenu()">
                <wrapper class="wrapper"><input type="checkbox" /><bun><burger></burger></bun></wrapper></div>
        </div>
        <div class="h-links" style="margin: 0 auto;">
            <router-link to="/" class="h-link" href="">Каталог</router-link>
            <router-link to="/activate" class="h-link" style="margin-left: 35px;" href="">Активировать ключ</router-link>
        </div>
        <button class="h-btn" id="contact_btn_adaptiv" v-on:click="onContacts()">Связаться с нами</button>
    </div>
</template>

<script>
export default {
    name: 'webHeader',
    methods: {
        onMenu() {
            this.$emit('showMenu')
        },
        onContacts() {
            this.$emit('showContacts')
        }
    }
}
</script>

<style>

</style>