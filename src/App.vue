<template>
    <div id="app">
        <Header :user="user"/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
export default {
    name: 'App',
    components: {Header, Footer},
    data() {
        return {
            user: undefined,
        }
    },
    beforeCreate() {
        this.$root.$on("register", (login, password, passwordAgain) => {
            if (password !== passwordAgain) {
                this.$root.$emit('registerValidationError', 'Passwords should be equal');
            }
            console.log(login);
            alert('TODO');  // TODO register
        });

        this.$root.$on("login", (username, password) => {
            axios.post('/api/v1/token/', {username, password}).then(response => {
                localStorage.setItem('jwtAccess', response.data.access);
                localStorage.setItem('jwtRefresh', response.data.refresh);
                this.$root.$emit("getUser");
                this.$router.push({name: 'index'});
            }).catch(error => {
                this.$root.$emit('loginValidationError', error.response.data);
            })
        });

        this.$root.$on("logout", () => {
            localStorage.removeItem('jwtAccess');
            localStorage.removeItem('jwtRefresh');
            this.user = undefined;
            this.$router.push({name: 'index'});
        });

        this.$root.$on("getUser", () => {
            axios.get('/api/v1/token/user/', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwtAccess')
                }
            }).then(response => {
                this.user = response.data;
            }).catch(error => {
                // TODO Unexpected error
                alert("Unexpected error: " + JSON.stringify(error.response.data));
            })
        });
    }
}
</script>

<style>
#app {
    text-align: center;
}
</style>
