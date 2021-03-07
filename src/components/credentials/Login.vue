<template>
    <form @submit.prevent="login">
        <p>
            Test logins (password is the same as login):
            <span v-for="(login, i) in testLogins" :key="login">
                <a href="" @click.prevent="testLogin(login)">{{ login }}</a>
                <span v-if="i < testLogins.length - 1">, </span>
            </span>
        </p>
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
            testLogins: ['user1', 'user2', 'user3', 'user4', 'user5']
        };
    },
    methods: {
        login() {
            this.$root.$emit('login', this.username, this.password);
            this.password = '';
        },
        testLogin(login) {
            this.username = login;
            this.password = login;
            this.login();
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
        width: fit-content;
        margin: 0 auto;
    }
</style>