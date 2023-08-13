<template>
    <div class="admin-wrap">
        <router-link to="/admin-choice-license" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
          <router-link to="api/license/download" class="login-button export-button" target="_blank" style="margin: 0px 0px 15px 0px; text-decoration: none; color: white; display: inline-flex; top: 25px; right: 25px; position: absolute;">
            Экспортировать
          </router-link>
            <div class="login-label">Добавление кодов</div>
            <textarea v-bind:class="{ errorRedInput: codeError, successGreenInput: successAddCode }" class="login-input" placeholder="Код,Имя товара" v-model="code" style="height: 150px; resize: none;"></textarea>
            <div v-bind:class="{ errorBlock: codeError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите коды</div>
            <div v-bind:class="{ errorBlock: successAddCode }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Коды успешно добавлены</div>
            <div v-bind:class="{ errorBlock: codeNumberError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Похоже вы ввели что-то не так</div>
            <div v-bind:class="{ errorBlock: serverError1 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" style="margin: 0px 0px 15px 0px;" v-on:click="addCode()">
                Добавить
            </div>
            <!-- <div class="login-label" style="margin: 15px 0px 15px 0px;">Изменение лицензии</div>
            <input v-bind:class="{ errorRedInput: changeIdError, successGreenInput: successChange }" class="login-input" placeholder="ID лицензии..." v-model="changeId">
            <div v-bind:class="{ errorBlock: changeIdError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите ID лицензии</div>
            <div v-bind:class="{ errorBlock: changeNoneIdError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Лицензии с таким ID не существует</div>
            <input v-bind:class="{ errorRedInput: changeCodeError, successGreenInput: successChange }" class="login-input" placeholder="Код лицензии..." v-model="changeCode">
            <div v-bind:class="{ errorBlock: changeCodeError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите код лицензии</div>
            <div v-bind:class="{ errorBlock: sameCodeError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Товар с таким уникальным кодом уже существует</div>
            <input v-bind:class="{ errorRedInput: changeKeyError, successGreenInput: successChange }" class="login-input" placeholder="Ключ лицензии..." v-model="key">
            <div v-bind:class="{ errorBlock: changeKeyError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите ключ лицензии</div>
            <div v-bind:class="{ errorBlock: successChange }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Лицензия успешно изменена</div>
            <div v-bind:class="{ errorBlock: serverError2 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="changeLicense()">
                Изменить
            </div> -->
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Удаление кодов</div>
          <textarea v-bind:class="{ errorRedInput: deleteError, successGreenInput: successDelete }" class="login-input" placeholder="Коды..." v-model="deleteCode"  style="height: 150px; resize: none;"></textarea>
            <div v-bind:class="{ errorBlock: deleteError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите коды</div>
            <div v-bind:class="{ errorBlock: successDelete }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Коды успешно удалены</div>
            <div v-bind:class="{ errorBlock: serverError3 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div v-bind:class="{ errorBlock: deleteCodeError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Похоже вы ввели что-то не так</div>
            <div class="login-button" v-on:click="deleteCodes()" style="margin: 0px 0px 15px 0px;">
                Удалить
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
    name: 'webAdminCodes',
    components: {
        webLicenseItem
    },
    data() {
        return {
            items: [],
            code: '',
            deleteCode: '',
            // success
            successAddCode: false,
            successDelete: false,
            // errors
            deleteError: false,
            deleteCodeError: false,
            // codeErrors
            codeError: false,
            codeNumberError: false,
            serverError1: false,
            serverError3: false,
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
        // async getAllLicense() {
        //     const headers = {
        //         "Authorization": localStorage.getItem('password')
        //     };
            
        //     const response = await axios.get('license', {  headers: headers  })
        //     this.licenses = response.data
        // },
        async addCode() {
            if (this.code === "") {
                this.codeError = true
            } else {
                let codeStrings = this.code.split("\n")
                try {
                    let codes = []
                    for (let i = 0; i < codeStrings.length; i++) {
                        let codeString = codeStrings[i].split(",")

                        codes.push({
                            productTitle: codeString[1],
                            value: codeString[0],
                        })
                    }
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.post('license/code', {
                        codes: codes
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.codeError = false
                        this.codeNumberError = false
                        this.successAddCode = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Неправильные данные, проверьте, может быть неправильно указаны названия товаров')) {
                            this.codeNumberError = true
                        } else {
                            this.codeNumberError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError1 = true
                    }
                }
            }
        },
        // async changeLicense() {
        //     if (this.changeId === "") {
        //         this.changeIdError = true
        //     } else if (this.co === "") {
        //         this.changeCodeError = true
        //     } else if (this.key === "") {
        //         this.changeKeyError = true
        //     } else {
        //         try {
        //             const headers = {
        //                 "Authorization": localStorage.getItem('password')
        //             };

        //             const response = await axios.put('license', {
        //                 id: Number(this.changeId),
        //                 code: this.changeCode,
        //                 key: this.key,
        //             }, {  headers: headers  })
        //             if (response.status < 300) {
        //                 this.changeIdError = false
        //                 this.changeCodeError = false
        //                 this.changeKeyError = false
        //                 this.successChange = true
        //                 setTimeout(() => {
        //                     location.reload()
        //                 }, 1000)
        //             }
        //         } catch (error) {
        //             if (error.response.status >= 400) {
        //                 if (error.response.data.message.includes('Лицензии с таким ID не существует')) {
        //                     this.changeNoneIdError = true
        //                 } else if (error.response.data.message.includes('Товар с таким уникальным кодом уже существует')) {
        //                     this.sameCodeError = true
        //                 }
        //             }
        //             if (error.response.status >= 500) {
        //                 this.serverError2 = true
        //             }
        //         }
        //     }
        // },
        async deleteCodes() {
            if (this.deleteCode === "") {
                this.deleteError = true
            } else {
                let codeStrings = this.deleteCode.split("\n")
                try {
                    // let values = []
                    // for (let i = 0; i < codeStrings.length; i++) {
                    //     let codeString = codeStrings[i]
                    //     values.push(codeString)
                    // }
                    // console.log(values)
                    const response = await axios.delete('license/deleteCodes', {
                        headers: {
                            "Authorization": localStorage.getItem('password')
                        },
                        data: {
                            values: codeStrings
                        }
                    })
                    if (response.status < 300) {
                        this.deleteError = false
                        this.deleteCodeError = false
                        this.successDelete = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Что-то нет')) {
                            this.deleteCodeError = true
                        } else if (error.response.data.message.includes('codes must be an array')) {
                            this.deleteCodeError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError3 = true
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