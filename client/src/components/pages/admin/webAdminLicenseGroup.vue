<template>
    <div class="admin-wrap">
        <router-link to="/admin-choice-license" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
          <router-link to="api/license/download" class="login-button export-button" target="_blank" style="margin: 0px 0px 15px 0px; text-decoration: none; color: white; display: inline-flex; top: 25px; right: 25px; position: absolute;">
            Экспортировать
          </router-link>
            <div class="login-label">Добавление лицензий c указанием группы</div>
            <textarea v-bind:class="{ errorRedInput: licenseError, successGreenInput: successAddLicense }" class="login-input" placeholder="Лицензия,Группа" v-model="license" style="height: 150px; resize: none;"></textarea>
            <div v-bind:class="{ errorBlock: licenseError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите лицензии</div>
            <div v-bind:class="{ errorBlock: successAddLicense }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Лицензии успешно добавлены</div>
            <div v-bind:class="{ errorBlock: licenseNumberError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Похоже вы ввели что-то не так</div>
            <div v-bind:class="{ errorBlock: serverError11 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="addLicense()">
                Добавить
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Удаление лицензий</div>
            <textarea v-bind:class="{ errorRedInput: deleteError, successGreenInput: successDelete }" class="login-input" placeholder="Лицензии..." v-model="deleteLicense" style="height: 150px; resize: none;"></textarea>
            <div v-bind:class="{ errorBlock: deleteError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите лицензии</div>
            <div v-bind:class="{ errorBlock: successDelete }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Лицензии успешно удалены</div>
            <div v-bind:class="{ errorBlock: serverError2 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div v-bind:class="{ errorBlock: deleteLicenseError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Похоже вы ввели что-то не так</div>
            <div class="login-button" v-on:click="deleteCodes()" style="margin: 0px 0px 15px 0px;">
                Удалить
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Все группы</div>
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
    name: 'webAdminLicenseGroup',
    components: {
        webLicenseItem
    },
    data() {
        return {
            items: [],
            license: '',
            deleteLicense: '',
            // success
            successAddLicense: false,
            successDelete: false,
            // errors
            deleteError: false,
            serverError2: false,
            deleteLicenseError: false,
            // licenseErrors
            licenseError: false,
            licenseNumberError: false,
            serverError11: false,
        }
    },
    methods: {
        async getItems() {
            const headers = {
                "Authorization": localStorage.getItem('password')
            };
            
            const {data} = await axios.get('group', {  headers: headers  })
            this.items = data
        },
        async addLicense() {
            if (this.license === "") {
                this.licenseError = true
            } else {
                let licenseStrings = this.license.split("\n")
                try {
                    let licenses = []
                    for (let i = 0; i < licenseStrings.length; i++) {
                        let licenseString = licenseStrings[i].split(",")

                        licenses.push({
                            groupTitle: licenseString[1],
                            value: licenseString[0],
                        })
                    }
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.post('license/byGroup', {
                        licenses: licenses
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.licenseError = false
                        this.licenseNumberError = false
                        this.successAddLicense = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Неправильные данные, проверьте, может быть неправильно указаны названия товаров')) {
                            this.licenseNumberError = true
                        } else {
                            this.licenseNumberError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError11 = true
                    }
                }
            }
        },
        async deleteCodes() {
            if (this.deleteLicense === "") {
                this.deleteError = true
            } else {
                let codeStrings = this.deleteLicense.split("\n")
                try {
                    const response = await axios.delete('license/deleteLicenses', {
                        headers: {
                            "Authorization": localStorage.getItem('password')
                        },
                        data: {
                            values: codeStrings
                        }
                    })
                    if (response.status < 300) {
                        this.deleteError = false
                        this.deleteLicenseError = false
                        this.successDelete = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Что-то нет')) {
                            this.deleteLicenseError = true
                        } else if (error.response.data.message.includes('licenses must be an array')) {
                            this.deleteLicenseError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError2 = true
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
        this.getItems(),
        this.toLogin()
    }
}
</script>

<style>
</style>