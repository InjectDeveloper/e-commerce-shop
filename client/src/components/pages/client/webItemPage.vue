<template>
    <body>
        <div id="contact" v-bind:class="{ 'contacts-block': showContacts }">
            <h2 class="contact_title">Контакты</h2>
            <div class="contact_block">
                <a :href="'tel:' + contacts.mobile" class="contact_block_network contact_block_phone" style="text-decoration: none; word-break: break-word;">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="27px" height="26px" viewBox="0 0 27 26" enable-background="new 0 0 27 26" xml:space="preserve">  <image id="image0" width="27" height="26" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAaCAMAAABxVtfCAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAADfj4DkkoTklITj kYPfj4Dkj4XlkobkkoXnj4fkkoXjkoTkk4bkk4XjkYPklIXfl4DklIXklYXjk4Pkk4Xkk4bjj4Pi j4PikoLkk4Tlk4Xnl4fllIblkoXjk4XkkoXkk4TjkoXjk4Pkk4X////g8dHrAAAAI3RSTlMAEHCf kCAw398g77C/74DfIM8wQM+gQFBgv38g35+AYKDAkHNrXSkAAAABYktHRCS0BvmZAAAACXBIWXMA AAsTAAALEwEAmpwYAAAAB3RJTUUH5wEPChwfxH5tAgAAAKdJREFUKM99keEWwTAMhZMaisUYxgwb ef93tFZLu6bur57z9d6c3AAAqlkxB1GLJTNrEa7WbKRRYBv+qBQYOcYqZR4xpakl543bLysShn5g tYOccS8gb6zFYpRlB7m1Y273UfU/o03VmVucQtico19oR+qLebfj6xrC7mZntg3eORng4K95lcQG inIfExjdrI9z4526IUDVdNHAKtzFUZIr7J9EL+N6A/f+HvNxabVJAAAAJXRFWHRkYXRlOmNyZWF0 ZQAyMDIzLTAxLTE1VDA5OjI4OjMxKzAxOjAwQ5PFUAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0w MS0xNVQwOToyODozMSswMTowMDLOfewAAAAASUVORK5CYII=" class="contact_block_img"/>
                    </svg>
                    <div class="contact_block_network_text contact_text_black" style="text-decoration: none; word-break: break-word;">Мобильный телефон</div>
                </a>
                <a :href="contacts.email" class="contact_block_network contact_block_mail" style="text-decoration: none; word-break: break-word;">
                    <img src="./img/mail_icon.svg" alt="">
                    <div class="contact_block_network_text contact_text_black" style="text-decoration: none; word-break: break-word;">E-mail</div>
                </a>
                <a :href="contacts.whatsapp" class="contact_block_network contact_block_whatsapp" style="text-decoration: none; word-break: break-word;">
                    <img src="./img/whatsapp_icon.svg" alt="">
                    <div class="contact_block_network_text" style="text-decoration: none; word-break: break-word;">Whatsapp</div>
                </a>
                <a :href="contacts.telegram" class="contact_block_network contact_block_telegram" style="text-decoration: none; word-break: break-word;">
                    <img src="./img/telegram_icon.svg" alt="">
                    <div class="contact_block_network_text" style="text-decoration: none; word-break: break-word;">Telegram</div>
                </a>
                <a :href="contacts.viber" class="contact_block_network contact_block_viber" style="text-decoration: none; word-break: break-word;">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="body_1" width="27" height="27">
                        <g transform="matrix(1.3333334 0 0 1.3333334 0 0)">
                            <image x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKiSURBVEhLrZZLbhpBEIbnCLlBOAI3sI+QG5gbMFIOYN/AC0uWsiJZeJFF5CVKNiNiW0SOlYlkAnGIMxFGvCcNzJMBm/TfFGMGmAeIb1ld1VXVj79b2oZfuV6mf+eyQXU0Nf+OtJ7qKEx1DoqyliKXaFRZe9G6sLOsNMo1CuZxVGBHNTOuPp4u4+qTafvKykUmZaqZdjoTjWIErOxoUUHfXjdelk/ZXqtgZLtf7XOr7lHkLJYXlCbXZ7Q8S02sR0Z+ARCEjsk1EvjV8izD5xJFo8u7d+yAhmd0b+xzMXMIrUtTIddEFOVmqv/TFXMi4UPe2KchSTJr47VdLaJ9YDK5J6an2gpizZrH/NXBiYojEJAQ+CMO8brqHgtjv+qJCuJoXRhZEUDcn7EjFDrkR796ph+ROcDDR+MQsVhOUezcEEdDGc6qI3DEaUhg1r0cDfksdoc8AUMYHj9h667BlVxPY4nG9pPw4/dzZW9x4THWr7qzgxbV3b9bV41TBvbDEV36Ey4AocAYllsYorpD9cIpggqXL/gaf0YqmXx+v2evMDaoulMySVKjMJBhXOb2pPl8T0JAsZA4TEwmn2teLOYJJANYMpFhAaw5DW9Nu2jlWgU7cJq5mrP0ssCO7cegCuySe64WlMcHIh13SLZGL1lvKY9P3CtQOenuY882Lgob3v5ireyfZz1pK0rOaV7ayvyuQS24sqxVlFCg3qziBN64Ob3vjoJ9RFF6yVlZBdC7sTUt7yTvEgmbn821CQG6iGLM38nym07yFyNsSZOC0xwm1KHwfTic78umICGKpqmSgV8Vjw1d1jCQDH8WmiY52EedC+8mXeLaUPh2oEtWdmO7JEXajSBEJTX4S9L8ZOyR6+5A0iF/z/BU4bfcVe2lj64k/QfA7StlETrlQQAAAABJRU5ErkJggg==" preserveAspectRatio="none" width="20.25" height="20.25"/>
                        </g>
                    </svg>
                    <div class="contact_block_network_text" style="text-decoration: none; word-break: break-word;">Viber</div>
                </a>
            </div>
        </div>
        <div id="overlay" v-on:click="this.showContacts = false" v-bind:class="{ 'contacts-overlay': showContacts }"></div><!-- Подложка -->
        <div id="overlay" v-on:click="this.showPhoneModal = false, this.buyPhone = false" v-bind:class="{ 'contacts-overlay': showPhoneModal }"></div><!-- Подложка -->
        <div class="verhnaya_linia" v-bind:class="{ 'act-sne': showedMenu }">
            <webHeader
            @showMenu="showMenu()"
            @showContacts="this.showContacts = true"
            />
        </div> 
        <div id = 'menu' class="menu" v-bind:class="{ active: showedMenu }">
            <div class="h-link-m"><router-link to="/" class="h-link-m">Каталог</router-link></div>
            <div class="h-link-m"><router-link to="/activate" class="h-link-m">Активировать ключ</router-link></div>
            <button v-on:click="this.showContacts = true" class="h-btn-m" id="contact_btn">Связаться с нами</button>
        </div>
        <!-- <div class="item-page-container">
            <img :src="this.item.image" alt="" class="item-page-image">
            <div class="item-page-title">{{ this.item.title }}</div>
            <div class="item-page-description-block">
                <div class="item-page-description-title">Описание</div>
                <div class="item-page-description-text" v-html="this.item.fullDescription"></div>
            </div>
            <div class="item-page-price">{{ this.item.price }}₽</div>
            <div v-on:click="this.unavailableItemError = true" class="item-page-button">Приобрести</div>
        </div> -->
        <div class="item-page-container">
            <img :src="this.item.image" class="item-page-image">
            <div class="item-page-right">
                <div class="item-page-title">{{ this.item.title }}</div>
                <div class="item-page-block-1">
                    <div class="item-page-price">{{ this.item.price }}₽</div>
                    <div v-on:click="this.showPhoneModal = true" class="item-page-button">Приобрести</div>
                    <!-- this.showPhoneModal = true -->
                </div>
                <div class="item-page-description-block">
                    <div class="item-page-description-title">Описание</div>
                    <div class="item-page-description-text" v-html="this.item.fullDescription"></div>
                </div>
            </div>
        </div>
        <div class="server-error" v-bind:class="{ 'server-error-block' : serverError }" style="display: none;">
            <div class="server-up">
                <div class="server-up-1">
                    <div class="server-error-triangle">
                        <img src="./img/alert-triangle.png" alt="" class="">
                    </div>
                    <div class="server-error-name">Ошибка сервера</div>
                </div>
                <div v-on:click="this.serverError = false" class="server-error-close"></div>
            </div>
            <div class="server-down">
                Ошибка сервера. Подождите и попробуйте позже
            </div>
        </div>
        <div class="server-error" v-bind:class="{ 'server-error-block' : unavailableItemError }" style="display: none; z-index: 100000;">
            <div class="server-up">
                <div class="server-up-1">
                    <div class="server-error-triangle">
                        <img src="./img/alert-triangle.png" alt="" class="">
                    </div>
                    <div class="server-error-name">Покупка пока недоступна</div>
                </div>
                <div v-on:click="this.unavailableItemError = false" class="server-error-close"></div>
            </div>
            <div class="server-down">
                В скором времени все заработает.
            </div>
        </div>
        <div class="server-error" v-bind:class="{ 'server-error-block' : noneItemError }" style="display: none; z-index: 100000;">
            <div class="server-up">
                <div class="server-up-1">
                    <div class="server-error-triangle">
                        <img src="./img/alert-triangle.png" alt="" class="">
                    </div>
                    <div class="server-error-name">Товар закончился</div>
                </div>
                <div v-on:click="this.noneItemError = false" class="server-error-close"></div>
            </div>
            <div class="server-down">
                Подождите пока товар добавят.
            </div>
        </div>
        <div class="enter-phone-cont" style="display: none;" v-bind:class="{ 'contacts-overlay': showPhoneModal }">
            <div id="overlay" v-on:click="this.showPhoneModal = false, this.buyPhone = false" v-bind:class="{ 'contacts-overlay': showPhoneModal }"></div><!-- Подложка -->
            <div class="enter-phone-modal">
                <div class="enter-phone-title">Введите номер телефона</div>
                <input class="enter-phone-input" v-bind:class="{ errorRedInput: phoneError }" placeholder="Номер телефона..." v-model="buyPhone">
                <div v-bind:class="{ errorBlock: phoneError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите номер</div>
                <div v-on:click="createOrder()" class="enter-phone-button">Далее</div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios'

import webHeader from '../../models/webHeader.vue'

export default {
    name: 'webItemPage',
    components: {
        webHeader
    },
    data() {
        return {
            contacts: {},
            showedMenu: false,
            showContacts: false,
            showPhoneModal: false,
            buyPhone: '',
            item: {},
            // errors
            serverError: false,
            noneItemError: false,
            unavailableItemError: false,
            phoneError: false
        }
    },
    methods: {
        async createOrder() {
            if (this.buyPhone === '') {
                this.phoneError = true
            } else {
                try {
                    const response = await axios.post('license/buy', {
                        productId: this.item.id,
                        phone: this.buyPhone
                    })
                    if (response.status < 300) {
                        window.open(response.data)
                    }
                } catch (error) {
                    if (error.response) {
                        if (error.response.status >= 400) {
                            if (error.response.data.message.includes('Товар закончился')) {
                                this.noneItemError = true
                            }
                        }
                        if (error.response.status >= 500) {
                            this.serverError = true
                        }
                    }
                }
            }
        },
        showMenu() {
            this.showedMenu = !this.showedMenu
        },
        async getItem() {
            let id = this.$route.params.productId

            const {data} = await axios.get(`product/${id}`)
            this.item = data
        },
        async getContacts() {
            const {data} = await axios.get('contact')
            this.contacts = data
        }
    },
    watch: {
        showPhoneModal: {
            deep: true,
            handler() {
                this.buyPhone = ''
            }
        }
    },
    mounted() {
        this.getItem(),
        this.getContacts()
    }
}
</script>

<style>
.item-page-container {
    position: relative;
    max-width: 1050px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 6px 11px 1px rgba(171, 190, 209, 0.25);
    border-radius: 20px;
    padding: 25px;
    margin: 50px auto;
    min-height: 554px;
}
@media (max-width: 1150px) {
    .item-page-container {
        max-width: 800px;
        flex-direction: column;
        align-items: flex-start;
    }
    .item-page-image {
        width: 100% !important;
        height: 450px;
    }
    .item-page-right {
        width: 100% !important;
        margin: 30px 0px 0px 0px !important;
        height: 60%;
    }
}
@media (max-width: 950px) {
    .item-page-container {
        margin: 40px auto;
        max-width: 600px;
    }
}
@media (max-width: 700px) {
    .item-page-container {
        max-width: 500px;
    }
    .item-page-image {
        height: 400px;
    }
    .item-page-block-1 {
        flex-direction: column !important;
        align-items: flex-start;
    }
    .item-page-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0px !important;
        width: 100%;
        margin: 25px 0px 0px 0px;
    }
}
@media (max-width: 600px) {
    .item-page-container {
        max-width: 350px;
        margin: 30px auto;
    }
    .item-page-image {
        height: 300px;
    }
}
@media (max-width: 450px) {
    .item-page-container {
        max-width: 300px;
        margin: 30px auto;
    }
    .item-page-image {
        height: 250px;
    }
}
.item-page-image {
    position: relative;
    width: 40%;
    object-fit: contain;
    border-radius: 10px;
}
.item-page-right {
    position: relative;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0px 0px 0px 30px;
}
.item-page-title {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    color: #212121;
    word-break: break-word;
    margin: 0px 0px 25px 0px;
}
.item-page-block-1 {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 0px 25px 0px;
}
.item-page-price {
    position: relative;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    color: #212121;
    word-break: break-word;
}
.item-page-button {
    cursor: pointer;
    position: relative;
    padding: 10px 156px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: white;
    background: #5D3EDF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
}
.item-page-button:hover {
    transition: all 0.4s;
    background-color: #FFFFFF;
    color: black;
    font-weight: 600;
}
.item-page-description-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.item-page-description-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #212121;
    margin: 0px 0px 10px 0px;
    word-break: break-word;
}
.item-page-description-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #212121;
    word-break: break-word;
}
</style>