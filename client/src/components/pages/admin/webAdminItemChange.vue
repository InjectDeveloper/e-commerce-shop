<template>
    <div class="admin-wrap">
        <router-link to="/admin" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
            <div class="login-label">Изменение товаров</div>
            <webChangeItem
            v-for="item in items"
            :key="item.id"
            :item="item" 
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import router from '../../../router/'

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response?.status === 403) {
        router.push('/admin-login')
    }
    return Promise.reject(error)
})

import webChangeItem from '../../models/webChangeItem.vue'

export default {
    name:'webAdminItemChange',
    components: {
        webChangeItem
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        async getItems() {
            const headers = {
                "Authorization": localStorage.getItem('password')
            };
            
            const {data} = await axios.get('product', {  headers: headers  })
            this.items = data
        },
        async toLogin() {
            if (!localStorage.getItem('password')) {
                this.$router.push('/admin-login')
            }
        }
    },
    mounted() {
        this.getItems(),
        this.toLogin()
    }
}
</script>

<style>

</style>