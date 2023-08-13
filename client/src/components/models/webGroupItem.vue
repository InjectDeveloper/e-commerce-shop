<template>
    <div class="admin-all-item admin-all-item-3" style="width: 600px; position: relative;">
        <div class="admin-item-showed" v-bind:class="{ 'item-flex': !showItemBlocks }" style="display: none; flex-direction: row; justify-content: space-between; width: 100%;">
            <div class="admin-all-item-id">ID:<br/>{{ item.id }}</div>
            <div class="admin-all-item-title">Название:<br/>{{ item.title }}</div>
            <div class="admin-item-show-button" v-on:click="this.showItemBlocks = true">
                <img src="../pages/client/img/down-arrow.svg">
            </div>
        </div>
        <div class="admin-item-hidden" v-bind:class="{ 'item-flex': showItemBlocks }" style="display: none">
            <div class="admin-item-show-button absolute-item-button" v-on:click="this.showItemBlocks = false">
                <img src="../pages/client/img/down-arrow.svg">
            </div>
            <div v-for="product in item.products" :key="product.id" class="admin-all-item admin-all-item-2" style="width: 550px;">
                <div class="admin-all-item-id">ID:<br/>{{ product.id }}</div>
                <div class="admin-all-item-title">Название:<br/>{{ product.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["item"],
    name: 'webLicenseItem',
    data() {
        return {
            itemId: this.item.id,
            showItemBlocks: false,
        }
    }
}
</script>

<style>
</style>