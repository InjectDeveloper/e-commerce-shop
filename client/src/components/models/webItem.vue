<template>
    <div class="catalog_block_item">
        <div style="display: flex; flex-direction: column; align-items: center; flex: 1 1 0;">
            <img :src="item.image" class="catalog_block_item_img">
            <router-link :to="`/product/` + this.id" class="catalog_block_item_title" style="text-decoration: none; color: black; word-break: break-word; max-width: 240px;">{{ item.title }}</router-link>
            <p v-html="item.shortDescription" class="catalog_block_item_description" style="word-break: break-word; max-width: 240px;"></p>
            <p class="catalog_block_item_price" >{{ item.price }}₽</p>
        </div>
        <button v-on:click="toProductPage()" class="catalog_block_item_btn more_button">Подробнее</button>
        <button v-on:click="this.$emit('showPhoneModal', this.id)" class="catalog_block_item_btn">Купить</button>
        <!-- this.$emit('showPhoneModal', this.id) -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ["item"],
    name: 'webItem',
    data() {
        return {
            id: this.item.id,
            // errors
        }
    },
    methods: {
        toProductPage() {
            this.$router.push(`/product/${this.id}`)
        },
        async createOrder() {
            try {
                const response = await axios.post('license/buy', {
                    productId: this.id
                })
                if (response.status < 300) {
                    let win = window.open('/')
                    win.document.write(response.data)
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('товар закончился')) {
                            this.$emit('noneItemError')
                        }
                    }
                    if (error.response.status >= 500) {
                        this.$emit('serverError')
                    }
                }
            }
        },
    }
}
</script>

<style>
.more_button {
    background-color: #FFFFFF !important;
    color: black !important;
    border-radius: 0 !important;
    border: 1px solid rgba(171, 190, 209, 0.45) !important;
}
.more_button:hover {
    transition: all 0.4s;
    background-color: #7C61EF !important;
    color: #FFFFFF !important;
    font-weight: 600;
}
.catalog_block_item_btn:hover {
    transition: all 0.4s;
    background-color: #FFFFFF;
    color: black;
    font-weight: 600;
}
</style>