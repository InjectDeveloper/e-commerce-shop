<template>
    <div class="admin-wrap">
        <router-link to="/admin" class="back-button">
            Назад
        </router-link>
        <div class="admin-login">
            <div class="login-label">Изменение контактов</div>
            <div class="login-label" style="font-size: 16px; margin: 0px 0px 15px 0px;">Выберите контакт</div>
            <div class="admin-contact-item">
                <input type="radio" value="mobile" class="admin-contact-input" placeholder="Контакт..." v-model="contact" name="one">
                <div class="admin-contact-item-text">Телефон</div>
                <div class="admin-contact-item-text">{{ contacts.mobile }}</div>
            </div>
            <div class="admin-contact-item">
                <input type="radio" value="email" class="admin-contact-input" placeholder="Контакт..." v-model="contact" name="one">
                <div class="admin-contact-item-text">E-mail</div>
                <div class="admin-contact-item-text">{{ contacts.email }}</div>
            </div>
            <div class="admin-contact-item">
                <input type="radio" value="whatsapp" class="admin-contact-input" placeholder="Контакт..." v-model="contact" name="one">
                <div class="admin-contact-item-text">WhatsApp</div>
                <div class="admin-contact-item-text">{{ contacts.whatsapp }}</div>
            </div>
            <div class="admin-contact-item">
                <input type="radio" value="telegram" class="admin-contact-input" placeholder="Контакт..." v-model="contact" name="one">
                <div class="admin-contact-item-text">Telegram</div>
                <div class="admin-contact-item-text">{{ contacts.telegram }}</div>
            </div>
            <div class="admin-contact-item" style="margin: 0px 0px 15px 0px;">
                <input type="radio" value="viber" class="admin-contact-input" placeholder="Контакт..." v-model="contact" name="one">
                <div class="admin-contact-item-text">Viber</div>
                <div class="admin-contact-item-text">{{ contacts.viber }}</div>
            </div>
            <div v-bind:class="{ errorBlock: contactError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Выберите контакт</div>
            <input v-bind:class="{ errorRedInput: valueError, successGreenInput: successChange }" class="login-input" placeholder="Новае значение..." v-model="newValue">
            <div v-bind:class="{ errorBlock: valueError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите новое значение</div>
            <div v-bind:class="{ errorBlock: successChange }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Контакт успешно изменен</div>
            <div v-bind:class="{ errorBlock: serverError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="changeContact">
                Изменить
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
    name: 'webAdminContacts',
    data() {
        return {
            contacts: {},
            contact: '',
            newValue: '',
            // success
            successChange: false,
            // errors
            contactError: false,
            valueError: false,
            serverError: false
        }
    },
    methods: {
        async getContacts() {
            const headers = {
                "Authorization": localStorage.getItem('password')
            };
            
            const {data} = await axios.get('contact', {  headers: headers  })
            this.contacts = data
        },
        async changeContact() {
            if (this.contact === '') {
                this.contactError = true
            } else if (this.newValue === '') {
                this.valueError = true
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.patch(`contact/${this.contact}`, {
                        newValue: this.newValue
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.contactError = false
                        this.valueError = false
                        this.serverError = false
                        this.successChange = true
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                } catch (error) {
                    if (error.response.status >=500) {
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
        this.getContacts(),
        this.toLogin()
    }
}
</script>

<style>
.back-button {
    position: absolute;
    top: 25px;
    left: 25px;
    border-radius: 15px;
    width: 200px;
    background-color: blue;
    height: 40px;
    text-decoration: none;
    color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
}
.admin-contact-item {
    width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0px 0px 10px 0px;
}
.admin-contact-input {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
}
.admin-contact-item-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
    flex: 0 0 200px;
}
</style>