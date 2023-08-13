<template>
    <div class="admin-all-item" style="width: 600px; position: relative;">
        <div class="admin-item-showed" v-bind:class="{ 'item-flex': !showItemBlocks }" style="display: none; flex-direction: row; justify-content: space-between; width: 100%;">
            <div class="admin-all-item-id">ID:<br/>{{ item.id }}</div>
            <div class="admin-all-item-title">Название:<br/>{{ item.title }}</div>
            <!-- <div class="admin-item-show-button" v-on:click="this.showItemBlocks = true">
                <img src="../pages/client/img/down-arrow.svg">
            </div> -->
        </div>
        <!-- <div class="admin-item-hidden" v-bind:class="{ 'item-flex': showItemBlocks }" style="display: none">
            <div class="admin-item-show-button absolute-item-button" v-on:click="this.showItemBlocks = false">
                <img src="../pages/client/img/down-arrow.svg">
            </div>
            <div v-for="item in licenses" :key="item.id" class="admin-all-item" style="width: 550px;">
                <div class="admin-all-item-id">ID:<br/>{{ item.id }}</div>
                <div class="admin-all-item-title">Ключ:<br/>{{ item.key }}</div>
                <div class="admin-all-item-title">Код:<br/>{{ item.code }}</div>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ["item"],
    name: 'webLicenseItem',
    data() {
        return {
            itemId: this.item.id,
            licenses: [],
            showItemBlocks: false,
        }
    },
    // methods: {
    //     async getLicenses() {
    //         const headers = {
    //             "Authorization": localStorage.getItem('password')
    //         };

    //         const response = await axios.get(`license/byProduct/${this.itemId}`, {  headers: headers  })
    //         this.licenses = response.data
    //     }
    // },
    // mounted() {
    //     this.getLicenses()
    // }
}
</script>

<style>
</style>