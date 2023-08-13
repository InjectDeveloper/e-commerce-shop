<template>
    <div class="admin-wrap">
        <router-link to="/admin-choice-license" class="back-button">
            Назад
        </router-link>
        <div class="admin-menu">
            <router-link to="/admin-license" class="admin-menu-item" style="flex: 1 1 calc((100% / 1) - 2rem);">Обычный</router-link>
            <router-link to="/admin-license-group" class="admin-menu-item" style="flex: 1 1 calc((100% / 1) - 2rem);">С указанием группы</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'webAdminChoiceCreateLicense',
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
</style>