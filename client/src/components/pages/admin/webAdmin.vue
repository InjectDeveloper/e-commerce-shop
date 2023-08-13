<template>
    <div class="admin-wrap">
        <div class="admin-menu">
            <router-link to="/admin-item" class="admin-menu-item">Товары</router-link>
            <router-link to="/admin-choice-license" class="admin-menu-item">Лицензии</router-link>
            <router-link to="/admin-contacts" class="admin-menu-item">Контакты</router-link>
            <router-link to="/admin-group" class="admin-menu-item">Группы</router-link>
            <router-link to="/api/license/history/activations" target="_blank" class="admin-menu-item">История активаций</router-link>
            <router-link to="/api/license/history/orders" target="_blank" class="admin-menu-item">История покупок</router-link>
            <router-link to="/api/license/download/code" target="_blank" class="admin-menu-item">Свободные коды</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'webAdmin',
    methods: {
        async toLogin() {
            if (!localStorage.getItem('password')) {
                this.$router.push('/admin-login')
            }
        }
    },
    mounted() {
        this.toLogin()
    }
}
</script>

<style>
.admin-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0px 15px 0px 15px;
}
.admin-menu-item {
    flex: 1 1 calc((100% / 2) - 2rem);
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: blue;
    color: white;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    border-radius: 15px;
    text-decoration: none;
}
@media (max-width: 700px) {
    .admin-menu-item {
        flex: 1 1 calc((100% / 1) - 2rem);
    }
}
</style>