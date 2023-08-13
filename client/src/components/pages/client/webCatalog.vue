<template>
    <body >
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
        <div id="overlay" v-on:click="this.showContacts = false" v-bind:class="{ 'contacts-overlay': showContacts}"></div><!-- Подложка -->
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
        <div class="swiper-container">
            <Swiper
            :slides-per-view="1"
            :loop="true"
            :autoplay="autoplay"
            class="swiper-wrapper"
            >
                <SwiperSlide class="swiper-slide">
                    <div class="slider_1">
                        <div>
                            <p class="slider_title">{{ this.sliderItem1.title }}</p>
                            <p class="slider_discription">{{ this.sliderItem1.description }}</p>
                        </div>
                        <button v-on:click="this.$router.push(`/product/${this.sliderId1}`)" class="slider_btn">Подробнее</button>
                        <div class="slide_counter">
                            <div class="slide_counter_2"></div>
                            <div class="slide_counter_1"></div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="swiper-slide">
                    <div class="slider_2">
                        <div>
                            <p class="slider_title">{{ this.sliderItem2.title }}</p>
                            <p class="slider_discription">{{ this.sliderItem2.description }}</p>
                        </div>
                        <button v-on:click="this.$router.push(`/product/${this.sliderId2}`)" class="slider_btn">Подробнее</button>
                        <div class="slide_counter">
                            <div class="slide_counter_1"></div>
                            <div class="slide_counter_2"></div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="catalog_block">
            <webItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @noneItemError="this.noneItemError = true"
            @serverError="this.serverError = true"
            @showUnavailableItemError="this.unavailableItemError = true"
            @showPhoneModal="showPhone"
            />
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
                Ошибка сервера. Подождите и попробуйте позже.
            </div>
        </div>
        <div class="server-error" v-bind:class="{ 'server-error-block' : noneItemError }" style="display: none;">
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
        <div class="server-error" v-bind:class="{ 'server-error-block' : unavailableItemError }" style="display: none;">
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
import webItem from '../../models/webItem.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from "swiper"
SwiperCore.use([Autoplay])
import { defineComponent } from 'vue';

axios.defaults.baseURL = 'http://localhost:5000/api'

export default defineComponent({
    name: 'webCatalog',
    components: {
        Swiper,
        SwiperSlide,
        webHeader,
        webItem,
    },
    data() {
        return {
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            items: [],
            contacts: {},
            showedMenu: false,
            showContacts: false,
            showPhoneModal: false,
            buyItemId: '',
            buyPhone: '',
            // errors
            noneItemError: false,
            serverError: false,
            unavailableItemError: false,
            phoneError: false,
            // other
            sliderId1: 7,
            sliderId2: 2,
            sliderItem1: {},
            sliderItem2: {},
        }
    },
    methods: {
        async getItems() {
            const {data} = await axios.get('product')
            this.items = data
        },
        async getItem1() {
            const {data} = await axios.get(`product/${this.sliderId1}`)
            this.sliderItem1 = data
        },
        async getItem2() {
            const {data} = await axios.get(`product/${this.sliderId2}`)
            this.sliderItem2 = data
        },
        async getContacts() {
            const {data} = await axios.get('contact')
            this.contacts = data
        },
        // async buyProduct1() {
        //     try {
        //         const response = await axios.post('license/buy', {
        //             productId: this.sliderItem1.id
        //         })
        //         if (response.status < 300) {
        //             window.open(response.data.link)
        //         }
        //     } catch (error) {
        //         if (error.response) {
        //             if (error.response.status >= 400) {
        //                 if (error.response.data.message.includes('товар закончился')) {
        //                     this.noneItemError = true
        //                 }
        //             }
        //             if (error.response.status >= 500) {
        //                 this.serverError = true
        //             }
        //         }
        //     }
        // },
        // async buyProduct2() {
        //     try {
        //         const response = await axios.post('license/buy', {
        //             productId: this.sliderItem2.id
        //         })
        //         if (response.status < 300) {
        //             window.open(response.data.link)
        //         }
        //     } catch (error) {
        //         if (error.response) {
        //             if (error.response.status >= 400) {
        //                 if (error.response.data.message.includes('товар закончился')) {
        //                     this.noneItemError = true
        //                 }
        //             }
        //             if (error.response.status >= 500) {
        //                 this.serverError = true
        //             }
        //         }
        //     }
        // },
        async createOrder() {
            if (this.buyPhone === '') {
                this.phoneError = true
            } else {
                try {
                    const response = await axios.post('license/buy', {
                        productId: this.buyItemId,
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
        showPhone(id) {
            this.showPhoneModal = true
            this.buyItemId = id
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
        this.getItems(),
        this.getItem1(),
        this.getItem2(),
        this.getContacts()
    }
})
</script>

<style>
.enter-phone-cont {
    z-index: 10000;
    display: flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    justify-content: center;
    align-items: center;
}
.enter-phone-modal {
    width: 360px;
    z-index: 1000;
    padding: 30px;
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 6px 11px 1px rgba(171, 190, 209, 0.25);
    border-radius: 20px;
}
@media (max-width: 500px) {
    .enter-phone-modal {
        width: 300px !important;
    }
    .enter-phone-title {
        font-size: 18px !important;
    }
    .enter-phone-button {
        width: 200px !important;
    }
    .enter-phone-input {
        width: 220px !important;
        padding: 0 10px !important;
    }
}
@media (max-width: 400px) {
    .enter-phone-modal {
        width: 250px !important;
    }
}
.enter-phone-title {
    text-align: center;
    font-weight: 650;
    font-size: 22px;
    line-height: 22px;
    margin: 0px 0px 15px 0px;
}
.enter-phone-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 50px;
    background: #5D3EDF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    font-weight: 500;
    font-family: 'Montserrat';
    
    transition: background-color 0.4s, color 0.4s, font-weight 0.4s;
}
.enter-phone-button:hover {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    color: black;
    font-weight: 600;
}
.enter-phone-input {
    margin: 0px 0px 15px 0px;
    width: 310px;
    height: 50px;
    padding: 0 20px;
    border-radius: 5px;
    filter: drop-shadow(0px 4px 10px rgba(171, 190, 209, 0.2));
    border: 2px solid #DEDEDE;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Montserrat';
}
.enter-phone-input::placeholder { 
    color: #9A999A;
}
.enter-phone-input:-ms-input-placeholder { 
    color: #9A999A;
}
.enter-phone-input::-ms-input-placeholder { 
    color: #9A999A;
}
.enter-phone-input:focus {
    border-color: #7C61EF;
    outline: 0;
}
.slider_1 {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px;
    max-width: 1050px;
    width: 100%;
    height: 150px;
    background-image: url(./img/Group\ 72.svg);
    background-size: auto;
    background-repeat: no-repeat;
    border-radius: 20px;
    margin: 0;
}
.slider_2 {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px;
    max-width: 1050px;
    width: 100%;
    height: 150px;
    background-image: url(./img/Group\ 73.svg);
    background-size: auto;
    background-repeat: no-repeat;
    border-radius: 20px;
    margin: 0;
}
.slider_title {
    flex: 1 1;
    font-weight: 600;
    font-size: 40px;
    margin: 0;
    color: white;
}
.slider_discription {
    flex: 1 1;
    font-weight: 500;
    font-size: 26px;
    line-height: 39px;
    margin: -10px 0px 0px 0px;
    color: white;
    word-break: break-word;
    max-width: 900px;
}
.slider_btn {
    position: absolute;
    display: inline-block;
    bottom: 25px;
    left: 25px;
    max-width: 173px;
    padding: 15px 45px;
    color: black;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
    cursor: pointer;
    border: none;
    margin: 18px 0px 0px 0px;
}
@media (max-width: 1100px) {
    .slider_1 {
        max-width: 908px;
        height: 160px;
        padding: 20px 25px;
        margin: 40px auto;
        background-image: url(./img/Group\ 721.svg);
    }
    .slider_2 {
        max-width: 908px;
        height: 160px;      
        padding: 20px 25px;
        margin: 40px auto;          
        background-image: url(./img/Group\ 731.svg);
    }
    .slider_title {
        font-size: 38px;
    }
    .slider_discription {
        font-size: 24px;
    }
    .slider_btn {
        padding: 12px 40px;
    }
}
@media (max-width: 958px) {
    .slider_1 {
        max-width: 900px;
        background-image: url(./img/Group\ 721.svg);
    }
    .slider_2 {
        max-width: 900px;
        background-image: url(./img/Group\ 731.svg);
    }
    .slider_title {
        font-size: 32px;
    }
    .slider_discription {
        font-size: 20px;
    }
}
@media (max-width: 951px) {
    .slider_1 {
        max-width: 650px;
        height: 160px;
        margin: 0px auto;
        background-image: url(./img/Group\ 722.svg);
    }
    .slider_2 {
        max-width: 650px;
        height: 160px;
        margin: 0px auto;
        background-image: url(./img/Group\ 732.svg);
    }
}
@media (max-width: 700px) {
    .slider_1 {
        max-width: 700px;
        height: 180px;
        padding: 5px 25px;
        background-image: url(./img/Group\ 722.svg);
        border-radius: 0px;
    }
    .slider_2 {
        max-width: 700px;
        height: 180px;
        padding: 5px 25px;
        background-image: url(./img/Group\ 732.svg);
        border-radius: 0px;
    }
}
@media (max-width: 500px) {
    .slider_1 {
        max-width: 530px;
        height: 160px;
        padding: 10px 25px 5px 25px;
        margin: 0px auto;
    }
    .slider_2 {
        max-width: 530px;
        height: 160px;
        padding: 10px 25px 5px 25px;
        margin: 0px auto;
    }
    .slider_1 {
        background-image: url(./img/Group\ 722.svg);
    }
    .slider_title {
        font-size: 26px;
    }
}
@media (max-width: 420px) {
    .slider_1 .slider_2 {
        max-width: 440px;
    }
}
@keyframes opacityAnimated {
    from {
        opacity: 0; 
        top: 0%;
    }
    to {
        opacity: 1; 
        top: 50%;
    }
}
.contacts-block {
    display: block !important;
    animation-duration: 0.5s;
    animation-name: opacityAnimated;
    animation-fill-mode: forwards;
}
@keyframes opacityAnimated2 {
    from {
        opacity: 0; 
    }
    to {
        opacity: 0.5; 
    }
}
.contacts-overlay {
    display: flex !important;
    animation-duration: 0.5s;
    animation-name: opacityAnimated2;
}
body {
  margin: 0;
  font-family: 'Montserrat';
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
    display: none;
}

.catalog_block {
    display: flex;
    flex-flow: row wrap;
    gap: 28px;

    margin: 0px auto;
    padding: 0px 30px;
    
    max-width: 1100px;
}
.catalog_block_item {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 30px;
    padding-top: 20px;
    
    min-height: 310px;
    width: 254px;
       
    background: #FFFFFF;
    box-shadow: 0px 6px 11px 1px rgba(171, 190, 209, 0.25);
    border-radius: 20px;
    font-family: 'Montserrat';

    color: #212121;

}
.catalog_block_item_img {
    margin: 0px auto;
}

.catalog_block_item_img {
    width: 85px;
    height: 85px;
    object-fit: contain;
}

.catalog_block_item_title {
    margin: 20px auto 20px auto;

    white-space: normal;
    text-align: center;

    font-weight: 500;
    font-size: 19.5px;
    line-height: 20px;
  transition: 150ms linear;
}
.catalog_block_item_title:hover {
  color: #7c61ef !important;
  transition: 150ms linear;
}
.catalog_block_item_description {
    margin: 0px auto 10px auto;

    width: 214px;

    text-align: center;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
}
.catalog_block_item_price {
    margin-bottom:15px;

    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

}
.catalog_block_item_btn {
    cursor: pointer;
    position: relative;
    bottom: 0px;

    background: #7C61EF ;
    border: 2px #7C61EF;
    border-radius: 0px 0px 20px 20px;

    padding: 10px 70px;

    height: 40px;
    width: 254px;

    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Montserrat';

    color: #FFFFFF;
}

#overlay {
    z-index: 113;
    /* подложка должна быть выше слоев элементов сайта, но ниже слоя модального окна */
    position: fixed;
    /* всегда перекрывает весь сайт */
    background-color: #707070;
    /* черная */
    opacity: 0.5;
    /* но немного прозрачна */
    width: 100%;
    height: 100%;
    /* размером во весь экран */
    top: 0;
    left: 0;
    /* сверху и слева 0, обязательные свойства! */
    cursor: pointer;
    display: none;
    /* в обычном состоянии её нет) */
  }
  #contact{
    width: 450px;
    min-height: 364px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 10px;
    position: absolute;
    padding: 25px;    
    left: 34vw;
    transform: translateY(-45%);
    display: none;
    /* в обычном состоянии окна не должно быть */
    opacity: 0;
    /* полностью прозрачно для анимирования */
    z-index: 115;
    margin: 0px 20px;
  }

  .contact_title {
  height: 34px;
  width: 143px;

  margin: 0px auto 20px auto;

  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  font-family: 'Montserrat';

  color: #212121;
  }
  .contact_block {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .contact_block_network {
  display: flex;
  flex-direction: row;

  padding: 12px;

  width: 426px;
  min-height: 26px;

  border-radius: 10px;
  }
  .contact_block_phone {
    background: #FAEFEC;
  }

  .contact_block_network_text {
  position: relative;

  margin: 0px auto;

  font-weight: 500;
  font-size: 19.5px;
  line-height: 27px;
  font-family: 'Montserrat';

  color: #FFFFFF;
  }
  .contact_text_black{
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;
    font-family: 'Montserrat';

    color: #000000;
  }
  .contact_block_mail {
    background: #C1B2FF;
  }
  .contact_block_whatsapp {
    background: #2DB84C;
  }
  .contact_block_telegram {
    background: #21ACE8;
  }
  .contact_block_viber {
    background: #C770E5;
  }

  .swiper-container{
    max-width: 1100px;
    max-height: 240px ; 

    margin: 40px auto;

    overflow: hidden;
  }

  .swiper-wrapper{
    
    display: flex;
    transform: 1s ease all;
  }

  .slide_counter{
    position: absolute;
    display: inline-flex;
    bottom: 25px;
    right: 25px;
    gap: 5px;
    width: 65px;
    height: 2px;
  }
  .slide_counter_1{
  width: 30px;
  height: 2px;

  background: #9A999A;
  }
  .slide_counter_2{
    width: 30px;
    height: 2px;
  
    background: #7C61EF;
    }

    @media (max-width:1160px) {
      .catalog_block {
      justify-content: center;
    }
    }

  @media (max-width:600px) {
    .catalog_block {
        display: flex;
        flex-flow: row wrap;
        gap: 28px;
    
        margin: 0px auto;
        padding: 0px 30px;
        
        max-width: 1100px;
    }
    .catalog_block_item {
        display: flex;
        flex-direction: column;
        align-items: center;
    
        margin-bottom: 30px;
        padding-top: 20px;
        
        min-height: 310px;
        width: 300px;
           
        background: #FFFFFF;
        box-shadow: 0px 6px 11px 1px rgba(171, 190, 209, 0.25);
        border-radius: 20px;
        font-family: 'Montserrat';
    
        color: #212121;
    
    }
    .catalog_block_item_img {
        margin: 0px auto;
    }
    
    .catalog_block_item_title {
        margin: 20px auto 20px auto;
    
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }
    .catalog_block_item_description {
        margin: 0px auto 10px auto;

        width: 260px;
    
        text-align: center;
    
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
    }
    .catalog_block_item_price {
        margin-bottom:11px;
    
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    
    }
    .catalog_block_item_btn {
        background: #7C61EF ;
        border: 2px #7C61EF;
        border-radius: 0px 0px 20px 20px;
    
        padding: 12px 93px;
    
        height: 44px;
        width: 300px;
    
        font-weight: 500;
        font-size: 17px;
        line-height: 20px;
        font-family: 'Montserrat';
    
        color: #FFFFFF;
    }
    
  }


  .verhnaya_linia {
    height: 90px;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(171, 190, 209, 0.2);
    align-items: center;
    margin: 0;
    display: flex;
    background-color: #F4FCFB;
}

.head {
    display: flex;
    margin: 0 auto;
    align-items: center;
    height: 90px;
    display: grid;
    grid-template-columns: 1fr 0 3fr 1fr 0 0;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}
.h-link {
    text-decoration: none;
    color: #212121;
    font-weight: 550;
    font-size: 18px;
    line-height: 22px;
}

.h-links {
    margin: 0 auto;
}

.h-btn {
    cursor: pointer;
    width: 210px;
    height: 40px;
    padding: 10px 30px;
    border: 0;
    font-size: 16px;
    font-weight: 525;
    line-height: 19.5px;
    background: #5D3EDF;
    font-family: 'Montserrat';
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
    color: white;
    margin-right: 20px;
    transition: background-color 0.4s, color 0.4s, font-weight 0.4s;
}

.h-btn:hover {
    background-color: #FFFFFF;
    color: black;
    font-weight: 600;
}

.co-name {
    font-weight: 650;
    font-size: 32px;
    line-height: 39.2px;
    margin: 0 auto;
    margin-left: 30px;
    z-index: 4;
}

.co-name span {
    color: #9A999A;
    font-size: 20px;
}

.u-key {
    margin: 46px auto;
    width: 600px;
    height: 218px;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 10px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
}

.ent-key{
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
}

.inp-key {
    width: 310px;
    height: 50px;
    padding: 0 20px;
    border-radius: 5px;
    filter: drop-shadow(0px 4px 10px rgba(171, 190, 209, 0.2));
    border: 2px solid #DEDEDE;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    font-family: 'Montserrat';
}

.inp-key::placeholder { 
    color: #9A999A;
}
.inp-key:-ms-input-placeholder { 
    color: #9A999A;
}
.inp-key::-ms-input-placeholder { 
    color: #9A999A;
}

.inp-key:focus {
    border-color: #7C61EF;
    outline: 0;
}


.key-btn {
    cursor: pointer;
    width: 204px;
    height: 50px;
    border: 0;
    background: #5D3EDF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
    font-weight: 550;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    font-family: 'Montserrat';

    transition: background-color 0.5s, color 0.5s, font-weight 0.5s;
}

.key-btn:hover {
    background-color: #FFFFFF;
    font-weight: 600;
    color: black;

}

.ent-key, .key-btn {
    margin-left: auto;
    margin-right: auto;
}

.u-key p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #FA435B;
    margin-top: 5px;
}

.adap-u-key {
    width: 600px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
}

.adap-ins {
    width: 95%;
    padding: 0 15px;
    margin-left: auto;
    margin-right: auto;
}

.all-inp {
    margin-left: auto;
    margin-right: auto;
}


.u-order {
    margin: 46px auto;
    width: 600px;
    height: 350px;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 10px;
    display: grid;
    grid-template-rows: repeat(4, auto);
}

.ent-ord, .ur-prod, .copy-ord, .click-to-copy, .ord-btn {
    margin: 0 auto;
}

.ur-prod {
    font-weight: 450;
    font-size: 18px;
    line-height: 22px;
    margin-top: 10px;
}

.copy-ord {
    width: 133px;
    max-height: 50px;
    margin: 0 auto;
    resize: none;
    border-radius: 5px;
    border: 2px solid #DEDEDE;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    font-family: 'Montserrat';
    border: 2px solid #7C61EF;
    filter: drop-shadow(0px 4px 10px rgba(171, 190, 209, 0.2));
    outline: 0;
    text-align: center;
    padding: 15px 0;
    margin-top: 8px;
    box-sizing: border-box;
}

.click-to-copy {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color:#9A999A;
    margin: 0 auto;
}

.ord-btn {
    cursor: pointer;
    padding: 15px 50px;
    width: 298px;
    height: 50px;
    background: #5D3EDF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    font-weight: 500;
    font-family: 'Montserrat';
    margin-bottom: 15px;;
    
    transition: background-color 0.4s, color 0.4s, font-weight 0.4s;
}

.block-f {
    width: 300px;
    display: grid;
    margin: 0 auto;
    margin-bottom: 12px;
}

.ord-btn:hover {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    color: black;
    font-weight: 600;
}

.ent-ord {
    font-weight: 650;
    font-size: 28px;
    line-height: 34px;
    margin-top: 25px;
}

.ins-key {
    width: 1100px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 10px;
    margin-top: 46px;
    display: grid;
    margin-left: auto;
    margin-right: auto;
    padding-right: 15px;    
}

.lst-key {
    display: grid;
}

.onkey {
    margin-bottom: 0;
    margin-top: 5px;
}

.inkey {
    width: 342px;
    margin-top: 20px;
}

.instal-instr {
    width: 95%;
    min-height: 100px;
    margin: 0 25px;
    display: block;
    margin-bottom: 11px;
}

.instal-instr h1 {
    font-weight: 650;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 1px;
    margin-top: 25px;
    
}

.instal-instr p {
    font-weight: 550;
    font-size: 16px;
    line-height: 20px;
    margin-top: 20px;
    margin-right: 7px;
}

.key-txt {
    margin-top: 15px !important;
}

.instal-instr a {
    text-decoration: none;
    color: #5D3EDF;
}


.f-menu {
    display: none;
}

.menu {
    position: absolute;
    height: 140px;
    width: 100%;
    display: block;
    text-align: center;
    z-index: 1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #F4FCFB;
    top: -25%;
    
   
    
    transition: 0.5s linear;
}

.h-btn-m {
    width: 210px;
    height: 40px;
    padding: 10px 30px;
    border: 0;
    font-size: 16px;
    font-weight: 525;
    line-height: 19.5px;
    background: #5D3EDF;
    font-family: 'Montserrat';
    box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
    border-radius: 5px;
    color: white;
    z-index: 3;
    
    transition: background-color 0.5s, color 0.5s, font-weight 0.5s;
}

.h-btn-m:hover {
    background-color: #FFFFFF;
    color: black;
    font-weight: 600;
}

.h-link-m {
    text-decoration: none;
    color: #212121;
    font-weight: 550;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 15px;

    z-index: 3;
}

.h-link:active {
    text-decoration: underline;
    text-decoration-color: #7C61EF;
}

.h-link-m:active {
    text-decoration: underline;
    text-decoration-color: #7C61EF;
}

.wrapper {
    display: none;
    position: relative;
    width: 32px;
    height: 32px;
}
.wrapper bun:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 12%;
    background: #212121;
    border-radius: 32px;
    transition: 0.5s ease-in-out;
    top: 10%;
    right: 0;
}
.wrapper bun:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 12%;
    background: #212121;
    border-radius: 32px;
    transition: 0.5s ease-in-out;
    bottom: 10%;
    left: 0;
}
.wrapper bun burger {
    position: absolute;
    display: flex;
    align-items: center;
    height: 32px;
    width: 32px;
}
.wrapper bun burger:before, .wrapper bun burger:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 12%;
    background: #212121;
    border-radius: 32px;
    transition: 0.5s ease-in-out;
}
.wrapper input {
    display: block;
    position: absolute;
    opacity: 0;
    z-index: 1;
    width: 32px;
    height: 32px;
    cursor: pointer;
}
.wrapper input:hover ~ bun:before, .wrapper input:hover ~ bun:after, .wrapper input:hover ~ bun :before, .wrapper input:hover ~ bun :after {
    background: #141414;
}
.wrapper input:checked ~ bun:before, .wrapper input:checked ~ bun:after {
    width: 0;
}
.wrapper input:checked ~ bun burger:before {
    transform: rotate(135deg);
}
.wrapper input:checked ~ bun burger:after {
    transform: rotate(45deg);
}


@media (max-width: 1200px) {

    .ins-key {
        width: 95%;
        margin-top: 15px
    }
    .instal-instr p {
        font-size: 15px;
        line-height: 16px;
    }
    p.key-txt {
        line-height: 20px;
    }
}


@media (max-width: 1100px) {
    .instal-instr p {
        margin-top: 0px;
    }
    p.key-txt {
        margin-top: 15px;
    }
    #contact{
        left: 24vw;
        transform: translateY(-45%);
      }
    
}

@media (max-width: 1000px) {

    .ins-key {
       width: calc(100% - 50px);;
    }

    .inkey {
        width: 250px;
        max-height: 40px;    
        font-size: 12px;
        line-height: 14px;
        padding: 11px 0;
        margin-top: 8px;
    }

    .onkey {
        margin-top: 3px;
        font-size: 12px;
    }

    .wind {
        margin-top: 17px;
        font-size: 23px;
        
    }
    .instal-instr h1 {
        font-size: 18px;
        margin-top: 10px;
    }
}
@media (max-width: 958px) {
        .slide_counter{
            right: 25px;
          }

}

@media (max-width: 900px) {
    .instal-instr p {
        font-size: 13px;
    }

    .instal-instr h1 {
        font-size: 16px;
        margin-bottom: 6px;
    }


    p.key-txt {
        margin-top: 0px !important;
    }

    .h-btn {
        display: none;
    }

    .h-links {
        display: none;
    }

    .head {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .f-burg {
        height: 32px;
        display: flex; 
        justify-content: right;
    }

    .menu-btn {
        width: 32px;
        height: 32px;
        margin-right: 30px;
        z-index: 5;
    }

    .active{
        top: 60px;
    }

    .f-menu {
        display: flex; 
        align-items: center;  
        
        cursor: pointer;
        z-index: 4;
        width: 32px;
        height: 32px;
        margin-right: 30px;
    }

    .h-link-m {
        font-size: 16px;
    }

    #contact{
        left: 16vw;
        transform: translateY(-45%);
      }
        .slide_counter{
            right: 25px;
          }
          .wrapper {
            display: block;
        }
}


@media (max-width: 700px) {

    .verhnaya_linia {
        position: relative;
        z-index: 10;
    }
    .act-sne {
        box-shadow: none;
    }

    .active{
        top: 90px;
    }
          .slide_counter{
            display: none;
          }
}


@media (max-width: 670px) {
    .u-order {
        margin-top: 15px;
        width: 360px;
        height: 300px;
        
    }
    .ord-btn {
        width: 200px;
        padding: 10px 10px;
        font-size: 12px;
        height: 40px;
        margin-bottom: 20px;

    }
    .ur-prod {
        font-size: 14px;
        margin-top: 0;
    }
    .ent-ord {
        font-size: 22px;
        margin-top: 10px;
    }
    .nokey {
        height: 40px;
        line-height: 12px;
        font-size: 14px;
        padding: 12px 0;
    }

    .click-to-copy {
        font-size: 12px;
    }

    .u-key {
        margin-top: 15px;
        width: 350px;
        height: 160px;
    }

    .ent-key {
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 8px;
    }
    .inp-key {
        width: 200px;
        height: 34px;
        padding: 0 15px;
        font-size: 14px;
    }

    .key-btn {
        width: 160px;
        height: 40px;
        font-size: 13px;
        line-height: 16px;
    }
    .u-key p {
        font-size: 12px;
        margin-top: 2px;
        line-height: 15px;
    }
    #contact{
        width: 410px;
        min-height: 364px;
        background: #FFFFFF;
        box-shadow: 0px 5px 10px rgba(171, 190, 209, 0.45);
        border-radius: 10px;
        position: absolute;
        padding: 25px;    
        left: 5vw;
        transform: translateY(-45%);
        display: none;
        /* в обычном состоянии окна не должно быть */
        opacity: 0;
        /* полностью прозрачно для анимирования */
        z-index: 115;
      }
      .contact_block_network {
        display: flex;
        flex-direction: row;
      
        padding: 12px;
      
        width: 386px;
        min-height: 26px;
      
        border-radius: 10px;
        }
        .catalog_block {
            display: flex;
            flex-flow: row wrap;
            gap: 35px;
        
            margin: 0px auto;
            padding: 0px 30px;
            
            max-width: 670px;
        }
        .catalog_block_item {
            display: flex;
            flex-direction: column;
            align-items: center;
        
            margin-bottom: 30px;
            padding-top: 20px;
            
            min-height: 310px;
            width: 350px;
               
            background: #FFFFFF;
            box-shadow: 0px 6px 11px 1px rgba(171, 190, 209, 0.25);
            border-radius: 20px;
            font-family: 'Montserrat';
        
            color: #212121;
        
        }
        .catalog_block_item_img {
            margin: 0px auto;
        }
        
        .catalog_block_item_title {
            margin: 20px auto 20px auto;
        
            font-weight: 500;
            font-size: 23px;
            line-height: 20px;
        }
        .catalog_block_item_description {
            margin: 0px auto 28px auto;

            width: 319px;
        
            text-align: center;
        
            font-weight: 400;
            font-size: 17px;
            line-height: 20px;
        }
        .catalog_block_item_price {
            margin-bottom:21px;
        
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
        
        }
        .catalog_block_item_btn {
            position: relative;
            bottom: 0px;
        
            background: #7C61EF ;
            border: 2px #7C61EF;
            border-radius: 0px 0px 20px 20px;
        
            padding: 10px 70px;
        
            height: 40px;
            width: 350px;
        
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            font-family: 'Montserrat';
        
            color: #FFFFFF;
        }
}

@media (max-width: 530px) {
    #contact{ 
        width: 325px;
        left: 4vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 301px;
        }
}


@media (max-width: 500px) {
    .wind {
        font-size: 16px;
        margin-top: 10px;
    }

    .click-to-copy {
        font-size: 12px;
    }

    .inkey {
        width: 250px;
        max-height: 40px;    
        font-size: 12px;
        line-height: 14px;
        padding: 11px 0;
        margin-top: 0px;
    }

    .instal-instr p {
        margin-top: 0;
    }

    .instal-instr {
        margin-bottom: 5px;
    }

    .instal-instr h1 {
        font-size: 14px;
    }
    #contact{ 
        width: 320px;
        left: 2vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 296px;
        }
              
}
@media (max-width: 610px) {
    .slider_discription {
              display: none !important;
              }
}

@media (max-width: 475px) {
    .instal-instr p {
        font-size: 12px;
    }

    .instal-instr h1 {
        font-size: 12.8px;
    }
    #contact{ 
        min-height: 384px;
        width: 325px;
        left: 2vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 291px;
        }
    .contact_block {
    gap: 20px;
    }
}

@media (max-width: 420px) {
    #contact{ 
        min-height: 384px;
        width: 310px;
        left: 0vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 276px;
        }
              .catalog_block {
                display: flex;
                flex-flow: row wrap;
                gap: 35px;
            
                margin: 0px auto;
                padding: 0px 30px;
                
                max-width: 670px;
            }
            .catalog_block_item {
                width: 335px;
            }
            .catalog_block_item_btn {
                width: 335px;
            }
            #contact{ 
                min-height: 384px;
                width: 315px;
                left: 0.5vw;
                transform: translateY(-70%);
              }
              .contact_block_network {
                width: 281px;
                }
}

@media (max-width: 400px) {
    #contact{ 
        min-height: 384px;
        width: 305px;
        left: -0.75vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 271px;
        }
        .contact_block_network_text {
            font-size: 18px;
            }
}

@media (max-width: 380px) {
    #contact{ 
        min-height: 384px;
        width: 285px;
        left: -1.5vw;
        transform: translateY(-70%);
      }
      .contact_block_network {
        width: 261px;
        padding: 12px 12px 12px 7px;
        }
}
</style>
