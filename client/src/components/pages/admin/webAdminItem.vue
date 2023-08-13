<template>
    <div class="admin-wrap">
        <router-link to="/admin" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
            <div class="login-label">Создание товара</div>
            <input v-bind:class="{ errorRedInput: titleError, successGreenInput: successCreate }" class="login-input" placeholder="Название..." v-model="title">
            <div v-bind:class="{ errorBlock: titleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите название</div>
            <div v-bind:class="{ errorBlock: sameNameError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Продукт с таким названием уже существует</div>
            <input v-bind:class="{ errorRedInput: shortDescriptionError, successGreenInput: successCreate }" class="login-input" placeholder="Короткое описание..." v-model="shortDescription">
            <div v-bind:class="{ errorBlock: shortDescriptionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите короткое описание</div>
            <textarea v-bind:class="{ errorRedInput: fullDescriptionError, successGreenInput: successCreate }" class="login-input" placeholder="Длинное описание..." v-model="fullDescription" style="resize: none; height: 200px;"></textarea>
            <div v-bind:class="{ errorBlock: fullDescriptionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите длинное описание</div>
            <input v-bind:class="{ errorRedInput: imageError, successGreenInput: successCreate }" class="login-input" placeholder="Ссылка на картинку..." v-model="image">
            <div v-bind:class="{ errorBlock: imageError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите ссылку на картинку</div>
            <div v-bind:class="{ errorBlock: imgUrlError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Картинка должна быть ссылкой</div>
            <textarea v-bind:class="{ errorRedInput: instructionError, successGreenInput: successCreate }" class="login-input" placeholder="Инструкция..." v-model="instruction" style="resize: none; height: 200px;"></textarea>
            <div v-bind:class="{ errorBlock: instructionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите инструкции</div>
            <input v-bind:class="{ errorRedInput: priceError, successGreenInput: successCreate }" class="login-input" placeholder="Цена..." v-model="price">
            <div v-bind:class="{ errorBlock: priceError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите цену</div>
            <div v-bind:class="{ errorBlock: priceNumberError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Цена должна быть числом</div>
            <input v-bind:class="{ errorRedInput: groupError, successGreenInput: successCreate }" class="login-input" placeholder="Группа..." v-model="group">
            <div v-bind:class="{ errorBlock: groupError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите группу</div>
            <div v-bind:class="{ errorBlock: sameGroupError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Группы с таким названием не существует</div>
            <div v-bind:class="{ errorBlock: successCreate }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Товар успешно создан</div>
            <div v-bind:class="{ errorBlock: serverError1 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="createItem()">
                Создать
            </div>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Удаление товара</div>
            <input v-bind:class="{ errorRedInput: idError, successGreenInput: successDelete }" class="login-input" placeholder="ID товара..." v-model="id">
            <div v-bind:class="{ errorBlock: noneIdError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Товара с таким ID не существует</div>
            <div v-bind:class="{ errorBlock: idError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите ID товара</div>
            <div v-bind:class="{ errorBlock: successDelete }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Товар успешно удален</div>
            <div v-bind:class="{ errorBlock: serverError2 }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="deleteItem()">
                Удалить
            </div>
            <router-link to="/admin-item-change" class="login-button" style="margin: 15px 0px 0px 0px;">Изменение</router-link>
            <div class="login-label" style="margin: 15px 0px 15px 0px;">Все товары</div>
            <div class="admin-all-items">
                <div v-for="item in items" :key="item.id" class="admin-all-item">
                    <div class="admin-all-item-id">ID:<br/>{{ item.id }}</div>
                    <div class="admin-all-item-title">Название:<br/>{{ item.title }}</div>
                </div>
            </div>
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

export default {
    name: 'webAdminItem',
    data() {
        return {
            items: [],
            id: '',
            title: '',
            shortDescription: '',
            fullDescription: '',
            image: '',
            instruction: '',
            price: '',
            group: '',
            // success
            successCreate: false,
            successDelete: false,
            // errors
            idError: false,
            titleError: false,
            shortDescriptionError: false,
            fullDescriptionError: false,
            imageError: false,
            instructionError: false,
            priceError: false,
            serverError1: false,
            serverError2: false,
            imgUrlError: false,
            priceNumberError: false,
            noneIdError: false,
            sameNameError: false,
            groupError: false,
            sameGroupError: false
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
        async createItem() {
            if (this.title === "") {
                this.titleError = true
            } else if (this.shortDescription === "") {
                this.shortDescriptionError = true
            } else if (this.fullDescription === "") {
                this.fullDescriptionError = true
            } else if (this.image === "") {
                this.imageError = true
            } else if (this.instruction === "") {
                this.instructionError = true
            } else if (this.price === "") {
                this.priceError = true
            } else if (this.group === "") {
                this.groupError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.post('product', {
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
            if (this.id === "") {
                this.idError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.delete(`product/${this.id}`, {  headers: headers  })
                    if (response.status < 300) {
                        this.idError = false
                        this.noneIdError = false
                        this.serverError2 = false
                        this.successDelete = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >= 400) {
                        if (error.response.data.message.includes('Продукта с таким ID не существует')) {
                            this.noneIdError = true
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
.successGreenInput {
    border: 1px solid green !important;
}
.errorBlock {
    display: block !important;
}
.errorRedInput {
    border: 1px solid red !important;
}
.admin-all-items {
    display: flex;
    flex-direction: column;
}
.admin-all-item {
    width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 0px 8px 0px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid black;
    min-height: 42px;
}
.admin-all-item-id {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
}
.admin-all-item-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
}
</style>