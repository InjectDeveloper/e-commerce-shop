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
        
        <div v-if="order.license" class="ins-key">
            <h1 class="ent-ord wind">{{ order.product?.title }}</h1>
            <div class="lst-key"><textarea v-on:click="copyKey(order.license.value)" class="copy-ord inkey" v-model="order.license.value" readonly></textarea>
            <p style="display: none; cursor: pointer;" v-bind:class="{ 'copied-block': !showCopied }" class='click-to-copy onkey' v-on:click="copyKey(order.license.value)">Нажмите, чтобы скопировать</p>
            <p style="display: none" v-bind:class="{ 'copied-block': showCopied }" class='click-to-copy onkey' v-on:click="copyKey(order.license.value)">Скопировано</p></div>
            <div class="instal-instr" style="height: content;">
                <h1>Инструкция по установке и активации</h1>
                <p v-html="order.product?.instruction" class="key-txt"></p>
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
    </body>
</template>

<script>
import axios from 'axios'

import webHeader from '../../models/webHeader.vue'

export default {
    name: 'webKey',
    components: {
        webHeader
    },
    data() {
        return {
            showedMenu: false,
            contacts: {},
            showContacts: false,
            order: {},
            showCopied: false,
            // errors
            serverError: false,
        }
    },
    methods: {
        showMenu() {
            this.showedMenu = !this.showedMenu
        },
        async getContacts() {
            const {data} = await axios.get('contact')
            this.contacts = data
        },
        async getKey() {
            let key = this.$route.params.code

            try {
                const response = await axios.get(`license/byCode/${key}`)
                this.order = response.data
            } catch (error) {
                if (error.response) {
                    if (error.response.status >= 500) {
                        this.serverError = true
                    }
                }
            }
        },
        copyKey(key) {
            navigator.clipboard.writeText(key)
            this.showCopied = true
            setTimeout(() => {
                this.showCopied = false
            }, 1500)
        }
    },
    mounted() {
        this.getContacts(),
        this.getKey()
    }
}
</script>

<style>
@keyframes copiedOpacity {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.copied-block {
    display: block !important;
    animation-name: copiedOpacity;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
}
.order-activate-button {
    cursor: pointer;
    width: 210px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    font-size: 16px;
    font-weight: 525;
    line-height: 19.5px;
    background: #5D3EDF;
    font-family: 'Montserrat';
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
    color: white;
    transition: background-color 0.4s, color 0.4s, font-weight 0.4s;
}
.order-activate-button:hover {
    background-color: #FFFFFF;
    color: black;
    font-weight: 600;
}
</style>