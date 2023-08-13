<template>
    <div class="admin-wrap">
        <router-link to="/admin-choice-license" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
          <router-link to="api/license/download" class="login-button export-button" target="_blank" style="margin: 0px 0px 15px 0px; text-decoration: none; color: white; display: inline-flex; top: 25px; right: 25px; position: absolute;">
            Экспортировать
          </router-link>
            <div class="login-label">Привязка</div>
            <textarea v-bind:class="{ errorRedInput: relationsError, successGreenInput: successAddRelations }" class="login-input" placeholder="Код,Лицензия,Имя товара" v-model="relations" style="height: 150px; resize: none;"></textarea>
            <div v-bind:class="{ errorBlock: relationsError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите привязку</div>
            <div v-bind:class="{ errorBlock: successAddRelations }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Привязка успешно добавлена</div>
            <div v-bind:class="{ errorBlock: relationsNumberError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Похоже вы ввели что-то не так</div>
            <div v-bind:class="{ errorBlock: serverError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="addRelations()">
                Добавить
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Все товары</div>
            <div class="admin-all-items">
                <webLicenseItem
                v-for="item in items"
                :key="item.id"
                :item="item"
                class="admin-all-item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import router from '../../../router/'

import webLicenseItem from '../../models/webLicenseItem.vue'

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response?.status === 403) {
        router.push('/admin-login')
    }
    return Promise.reject(error)
})

export default {
    name: 'webAdminRelations',
    components: {
        webLicenseItem
    },
    data() {
        return {
            items: [],
            successAddRelations: false,
            relations: '',
            // errors
            relationsError: false,
            relationsNumberError: false,
            serverError: false,
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
        async addRelations() {
            if (this.relations === "") {
                this.relationsError = true
            } else {
                let relationsStrings = this.relations.split("\n")
                try {
                    let relations = []
                    for (let i = 0; i < relationsStrings.length; i++) {
                        let relationsString = relationsStrings[i].split(",")

                        relations.push({
                            code: relationsString[0],
                            license: relationsString[1],
                            product: relationsString[2],
                        })
                    }
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.post('license/createWithRelation', {
                        values: relations
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.relationsError = false
                        this.relationsNumberError = false
                        this.successAddRelations = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        this.relationsNumberError = true
                    }
                    if (error.response.status >= 500) {
                        this.serverError = true
                    }
                }
            }
        },
        async toLogin() {
            if (!localStorage.getItem('password')) {
                this.$router.push('/admin-login')
            }
        }
    },
    mounted() {
        // this.getAllLicense(),
        this.getItems(),
        this.toLogin()
    }
}
</script>

<style>

</style>