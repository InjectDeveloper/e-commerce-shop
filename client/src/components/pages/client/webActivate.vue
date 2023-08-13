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
        
        <div class="u-key">
            <h1 class="ent-key">Введите уникальный код</h1>
            <div class="all-inp">
                <input class="inp-key" placeholder="Вводить сюда" v-model="code">
            </div>
            <button v-on:click="setKey()" class="key-btn">Отправить</button>
        </div>
        <div class="server-error" v-bind:class="{ 'server-error-block' : serverError }" style="display: none;">
            <div class="server-up">
                <div class="server-up-1">
                    <div class="server-error-triangle">
                        <img src="./img/alert-triangle.png" alt="" class="">
                    </div>
                    <div class="server-error-name">Ошибка сайта</div>
                </div>
                <div v-on:click="this.serverError = false" class="server-error-close"></div>
            </div>
            <div class="server-down">
               Свяжитесь с нами по контактам техподдержки
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios'

import webHeader from '../../models/webHeader.vue'

export default {
    name: 'webActivate',
    components: {
        webHeader
    },
    data() {
        return {
            showedMenu: false,
            contacts: {},
            showContacts: false,
            code: '',
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
        async setKey() {
            try {
                const response = await axios.get(`license/activate/${this.code}`)
                if (response.status < 300) {
                    this.$router.push(`/key/${this.code}`)
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        var btn = document.querySelector('.key-btn');
                        var err = document.querySelector('.all-inp');
                        var blk = document.querySelector('.u-key');
                        var ent = document.querySelector('.ent-key');
                        var inp = document.querySelector('.inp-key');

                        if (!this.codeError) {
                            inp.style.borderColor = '#FA435B';
                            err.innerHTML += '<p>Неверный код!</p>';
                        }

                        if (window.innerWidth <= 670) {
                            blk.style.height = '170px';
                            btn.style.marginTop = '5px';
                            ent.style.marginBottom = '0px';
                        } else {
                            blk.style.height = '246px';
                            btn.style.marginTop = '10px';
                            ent.style.marginTop = '25px';
                        }

                        this.codeError = true
                    }
                    if (error.response.status >= 500) {
                        this.serverError = true
                    }
                }
            }
        }
    },
    mounted() {
        this.getContacts()
    }
}
</script>

<style>
@keyframes opacityError {
    from {
        opacity: 0; 
    }
    to {
        opacity: 1; 
    }
}
.server-error-block {
    display: inline-flex !important;
    animation-name: opacityError;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}
.server-error {
    z-index: 1000;
    position: absolute;
    top: 25px;
    left: 25px;
    max-width: 534px;
    height: fit-content;
    display: inline-flex;
    flex-direction: column;
    background-color: #FFE8E8;
    border-radius: 4px;
    border: 2px solid #E2B6B6;
    padding: 24px;
    margin: 5px;
}
.server-up {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.server-up-1 {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.server-error-name {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #0A0A0A;
    margin: 0px 40px 0px 17px;
}
.server-down {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #424242;
    margin: 8px 0px 0px 42px;
    word-break: break-word;
}
.server-error-close {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 24px;
    height: 24px;
    opacity: 0.3;
    cursor: pointer;
}
.server-error-close:hover {
    opacity: 1;
}
.server-error-close:before, .server-error-close:after {
    position: absolute;
    left: 10px;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: black;
}
.server-error-close:before {
    transform: rotate(45deg);
}
.server-error-close:after {
    transform: rotate(-45deg);
}
@media (max-width: 575px) {
    .server-error {
        left: 0;
        right: 0;
    }
}
@media (max-width: 420px) {
    .server-error-name {
        margin: 0px 0px 0px 8px;
    }
    .server-down {
        margin: 8px 0px 0px 33px;
    }
}
</style>