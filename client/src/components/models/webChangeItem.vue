<template>
    <div class="admin-change-item">
        <div class="admin-item-showed" v-bind:class="{ 'item-flex': !showItemBlocks }" style="display: none">
            <div class="admin-iten-id">{{ item.id }}</div>
            <div class="admin-iten-title">{{ item.title }}</div>
            <div class="admin-item-show-button" v-on:click="this.showItemBlocks = true">
                <img src="../pages/client/img/down-arrow.svg">
            </div>
        </div>
        <div class="admin-item-hidden" v-bind:class="{ 'item-flex': showItemBlocks }" style="display: none">
            <div class="admin-item-show-button absolute-item-button" v-on:click="this.showItemBlocks = false">
                <img src="../pages/client/img/down-arrow.svg">
            </div>
            <input placeholder="Название..." v-bind:class="{ errorRedInput: titleError, successGreenInput: successChange }" v-model="title" class="admin-item-input">
            <div v-bind:class="{ errorBlock: titleError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите название</div>
            <div v-bind:class="{ errorBlock: sameNameError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Продукт с таким названием уже существует</div>
            <input placeholder="Короткое описание..." v-bind:class="{ errorRedInput: shortDescriptionError, successGreenInput: successChange }" v-model="shortDescription" class="admin-item-input">
            <div v-bind:class="{ errorBlock: shortDescriptionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите короткое описание</div>
            <input placeholder="Длинное описание..." v-bind:class="{ errorRedInput: fullDescriptionError, successGreenInput: successChange }" v-model="fullDescription" class="admin-item-input">
            <div v-bind:class="{ errorBlock: fullDescriptionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите длинное описание</div>
            <input placeholder="Ссылку на картинку..." v-bind:class="{ errorRedInput: imageError, successGreenInput: successChange }" v-model="image" class="admin-item-input">
            <div v-bind:class="{ errorBlock: imageError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите ссылку на картинку</div>
            <div v-bind:class="{ errorBlock: imgUrlError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Картинка должна быть ссылкой</div>
            <input placeholder="Инструкции..." v-bind:class="{ errorRedInput: instructionError, successGreenInput: successChange }" v-model="instruction" class="admin-item-input">
            <div v-bind:class="{ errorBlock: instructionError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите инструкции</div>
            <input placeholder="Цена..." v-bind:class="{ errorRedInput: priceError, successGreenInput: successChange }" v-model="price" class="admin-item-input">
            <div v-bind:class="{ errorBlock: priceError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Введите цену</div>
            <div v-bind:class="{ errorBlock: priceNumberError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Цена должна быть числом</div>
            <div v-bind:class="{ errorBlock: serverError }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Ошибка сервера. Попробуйте позже</div>
            <div v-bind:class="{ errorBlock: successChange }" class="admin-all-item-title" style="display: none; margin: -10px 0px 5px 0px">Товар успешно изменен</div>
            <div class="admin-item-button" v-on:click="changeItem()">Сохранить</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ["item"],
    name: 'webChangeItem',
    data() {
        return {
            showItemBlocks: false,
            title: this.item.title,
            shortDescription: this.item.shortDescription,
            fullDescription: this.item.fullDescription,
            image: this.item.image,
            instruction: this.item.instruction,
            price: this.item.price,
            // success
            successChange: false,
            // errors
            titleError: false,
            shortDescriptionError: false,
            fullDescriptionError: false,
            imageError: false,
            instructionError: false,
            priceError: false,
            serverError: false,
            imgUrlError: false,
            priceNumberError: false,
            sameNameError: false,
        }
    },
    methods: {
        async changeItem() {
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
            } else {
                try {
                    const headers = {
                        "Authorization": localStorage.getItem('password')
                    };

                    const response = await axios.put('product', {
                        id: Number(this.item.id),
                        title: this.title,
                        shortDescription: this.shortDescription,
                        fullDescription: this.fullDescription,
                        image: this.image,
                        instruction: this.instruction,
                        price: Number(this.price)
                    }, {  headers: headers  })
                    if (response.status < 300) {
                        this.titleError = false
                        this.shortDescriptionError = false
                        this.fullDescriptionError = false
                        this.imageError = false
                        this.instructionError = false
                        this.priceError = false
                        this.successChange = true
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
                        }
                    }
                    if (error.response.status >= 500) {
                        this.serverError = true
                    }
                }
            }
        }
    }
}
</script>

<style>
.admin-change-item {
    position: relative;
    width: 350px;
    border: 1px solid blue;
    border-radius: 15px;
    padding: 15px;
    margin: 0px 0px 10px 0px;
}
.admin-item-showed {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.admin-item-show-button {
    cursor: pointer;
}
.admin-item-show-button img {
    width: 12px;
    height: 12px;
}
.absolute-item-button {
    position: absolute;
    display: inline-block;
    transform: rotate(180deg);
    top: 15px;
    right: 15px;
}
.item-flex {
    display: flex !important;
}
.admin-item-hidden {
    display: flex;
    flex-direction: column;
    padding: 0px 45px 0px 0px;
}
.admin-item-input {
    width: 100%;
    height: 35px;
    margin: 0px 0px 8px 0px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
    border-radius: 10px;
    border: 1px solid blue;
}
.admin-item-button {
    cursor: pointer;
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: white;
    border-radius: 10px;
    background-color: blue;
}
</style>