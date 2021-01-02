<template>
    <form @submit.prevent="$root.$emit('onRegister', login, password, passwordAgain)">
        <label>Login <input type="text" v-model="login"></label>
        <br>
        <label>Password <input type="text" v-model="password"></label>
        <br>
        <label>Password again <input type="text" v-model="passwordAgain"></label>
        <br>
        <input type="submit" value="Register">
    </form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            login: '',
            password: '',
            passwordAgain: '',
        };
    },
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