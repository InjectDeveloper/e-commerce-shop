<template>
    <div class="admin-wrap">
        <div class="admin-login">
            <div class="login-label">Введите пароль</div>
            <input class="login-input" placeholder="Пароль админа..." v-model="password">
            <div v-bind:class="{ errorBlock: passwordError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Неверный пароль</div>
            <div v-bind:class="{ errorBlock: serverError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div class="login-button" v-on:click="login()">
                Войти
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'webAdminLogin',
    data() {
        return {
            password: '',
            // errors
            passwordError: false,
            serverError: false,
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('admin/login', {
                    password: this.password
                })
                if (response.data.message === 'success') {
                    localStorage.setItem('password', this.password)
                    this.$router.push('/admin')
                }
            } catch(error) {
                if (error.response.status === 403) {
                    this.passwordError = true
                }
                if (error.response.status >= 500) {
                    this.serverError = true
                }
            }
        }
    }
}
</script>

<style>
.block {
    display: flex !important;
}
.admin-wrap {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.admin-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    margin: 25px 0px 25px 0px;
}
.login-label {
    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    color: black;
    margin: 0px 0px 15px 0px;
}
.login-input {
    padding: 0px 10px;
    width: 350px;
    border: 1px solid blue;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
    border-radius: 15px;
    margin: 0px 0px 15px 0px;
}
.login-button {
    border-radius: 15px;
    width: 350px;
    background-color: blue;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
}
.error-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(158, 158, 158, 0.5);
}
.error {
    border-radius: 5px;
    padding: 24px;
    width: 534px;
    min-height: 100px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: #EED3D3;
    border: 1px solid #E2B6B6;
}
.error-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.error-header {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: black;
    word-break: break-word;
}
.close {
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
}
.close:hover {
    opacity: 1;
}
.close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
}
.close:before {
    transform: rotate(45deg);
}
.close:after {
    transform: rotate(-45deg);
}
.error-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: black;
    word-break: break-word;
}
@media (max-width: 900px) {
    .back-button {
        width: 150px !important;
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        margin: 25px 0px 25px 0px !important;
    }
    .export-button {
        position: relative !important;
        top: 0 !important;
        right: 0 !important;
        margin: 15px 0px !important;
    }
}
@media (max-width: 700px) {
    .admin-all-item-3 {
        width: 380px !important;
    }
    .admin-all-item-2 {
        width: 330px !important;
    }
}
@media (max-width: 430px) {
    .admin-contact-item {
        width: 250px !important;
    }
    .login-input {
        width: 250px;
    }
    .login-button {
        width: 250px;
    }
    .admin-login {
        width: 250px;
    }
    .admin-all-item {
        width: 250px !important;
    }
    .admin-change-item {
        width: 250px !important;
    }
    .admin-all-item-2 {
        width: 200px !important;
    }
}
</style>