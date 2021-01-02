<template>
    <form @submit.prevent="login">
        <label>User name <input type="text" v-model="username"></label>
        <br>
        <label>Password <input type="password" v-model="password"></label>
        <br>
        <input type="submit" value="Login">
        <br>
        <div>{{ errors }}</div>
    </form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: '',
            password: '',
            errors: '',
        };
    },
    methods: {
        login() {
            this.$root.$emit('login', this.username, this.password);
            this.password = '';
        }
    },
    beforeCreate() {
        this.$root.$on('loginValidationError', errors => {
            this.errors = errors;
        });
    }
}
</script>

<style scoped>
    input {
        margin-top: 1rem;
    }
    form {
        text-align: right;
        margin-right: 20rem;
    }
</style>