<template>
    <div class="admin-wrap">
        <router-link to="/admin" class="back-button">
            Назад
        </router-link>
        <div class="admin-menu">
            <router-link to="/admin-choice-create-license" class="admin-menu-item" style="flex: 1 1 calc((100% / 1) - 2rem);">Лицензии</router-link>
            <router-link to="/admin-codes" class="admin-menu-item" style="flex: 1 1 calc((100% / 1) - 2rem);">Коды</router-link>
            <router-link to="/admin-relations" class="admin-menu-item" style="flex: 1 1 calc((100% / 1) - 2rem);">Привязка</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'webAdminChoiceLicense',
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