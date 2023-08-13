<template>
    <div class="admin-wrap">
        <router-link to="/admin" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
            <div class="login-label">Создание группы</div>
            <input v-bind:class="{ errorRedInput: titleError, successGreenInput: successCreate }" class="login-input" placeholder="Название группы..." v-model="title">
            <div v-bind:class="{ errorBlock: titleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите название</div>
            <div v-bind:class="{ errorBlock: sameNameError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Продукт с таким названием уже существует</div>
            <div v-bind:class="{ errorBlock: successCreate }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Группа успешно создана</div>
            <div class="login-button" v-on:click="createItem()">
                Создать
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Удаление группы</div>
            <input v-bind:class="{ errorRedInput: deleteTitleError, successGreenInput: successDelete }" class="login-input" placeholder="Название группы..." v-model="deleteTitle">
            <div v-bind:class="{ errorBlock: sameDeleteTitleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Группы с таким названием не существует</div>
            <div v-bind:class="{ errorBlock: deleteTitleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите название группы</div>
            <div v-bind:class="{ errorBlock: successDelete }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Группа успешно удалена</div>
            <div v-bind:class="{ errorBlock: serverError2 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="deleteItem()">
                Удалить
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Все группы</div>
            <div class="admin-all-items">
                <div v-for="item in items" :key="item.id" class="admin-all-item">
                    <div class="admin-all-item-id">ID:<br/>{{ item.id }}</div>
                    <div class="admin-all-item-title">Название:<br/>{{ item.title }}</div>
                </div>
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Получение группы</div>
            <input v-bind:class="{ errorRedInput: getTitleError }" class="login-input" placeholder="Название группы..." v-model="getTitle">
            <div v-bind:class="{ errorBlock: getTitleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите название группы</div>
            <div v-bind:class="{ errorBlock: serverError3 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="getItem()">
                Удалить
            </div>
            <div v-bind:class="{ 'active-group': showGroup }" class="admin-all-items" style="margin: 20px 0px 0px 0px; display: none;"> 
                <webGroupItem
                :item="this.groupItem"
                class="admin-all-item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import webGroupItem from '../../models/webGroupItem.vue'

export default {
    components: {
        webGroupItem
    },
    name: 'webAdminGroup',
    data() {
        return {
            items: [],
            title: '',
            deleteTitle: '',
            getTitle: '',
            groupItem: '',
            showGroup: false,
            // success
            successCreate: false,
            successDelete: false,
            // errors
            titleError: false,
            sameNameError: false,
            deleteTitleError: false,
            sameDeleteTitleError: false,
            getTitleError: false,
            serverError1: false,
            serverError2: false,
            serverError3: false,
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
        async createItem() {
            if (this.title === "") {
                this.titleError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.post('group', {
                        title: this.title,
                        shortDescription: this.shortDescription,
                        fullDescription: this.fullDescription,
                        image: this.image,
                        instruction: this.instruction,
                        price: Number(this.price),
                        groupTitle: this.group
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.titleError = false
                        this.shortDescriptionError = false
                        this.fullDescriptionError = false
                        this.imageError = false
                        this.instructionError = false
                        this.priceError = false
                        this.imgUrlError = false
                        this.priceNumberError = false
                        this.serverError1 = false
                        this.sameNameError = false
                        this.groupError = false
                        this.successCreate = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('image must be a URL address')) {
                            this.imgUrlError = true
                        } else if (error.response.data.message.includes('price must be a number conforming to the specified constraints')) {
                            this.priceNumberError = true
                        } else if (error.response.data.message.includes('Продукт с таким названием уже существует')) {
                            this.sameNameError = true
                        } else if (error.response.data.message.includes('Группы с таким названием не существует')) {
                            this.sameGroupError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError1 = true
                    }
                }
            }
        },
        async deleteItem() {
            if (this.deleteTitle === "") {
                this.deleteTitleError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.delete(`group/${this.deleteTitle}`, {  headers: headers  })
                    if (response.status < 300) {
                        this.deleteTitleError = false
                        this.sameDeleteTitleError = false
                        this.serverError2 = false
                        this.successDelete = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Группы с таким названием не существует')) {
                            this.sameDeleteTitleError = true
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError2 = true
                    }
                }

            }
        },
        async getItem() {
            if (this.getTitle === "") {
                this.getTitleError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.get(`group/${this.getTitle}`, {  headers: headers  })
                    if (response.status < 300) {
                        this.getTitleError = false
                        this.serverError3 = false
                        this.showGroup = true
                    }
                    this.groupItem = response.data
                } catch (error) {
                    if (error.response.status >= 400) {
                        this.getTitleError = true
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
        this.getItems(),
        this.toLogin()
    }
}
</script>

<style>
.active-group {
    display: flex !important;
}
</style>