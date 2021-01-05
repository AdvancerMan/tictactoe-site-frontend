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
import {axiosPost, axiosGet, isAuthenticated} from "@/requests";

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
            axiosPost(
                '/api/v1/token/', {username, password},
                {}, true
            ).then(response => {
                localStorage.setItem('jwtAccess', response.data.access);
                localStorage.setItem('jwtRefresh', response.data.refresh);
                this.$root.$emit("getUser");
                this.$router.push({name: 'index'});
            }).catch(error => {
                this.$root.$emit('loginValidationError', error.data);
            });``
        });

        this.$root.$on("clearJwt", () => {
            localStorage.removeItem('jwtAccess');
            localStorage.removeItem('jwtRefresh');
            this.user = undefined;
        });

        this.$root.$on("logout", () => {
            this.$root.$emit('clearJwt');
            this.$router.push({name: 'index'});
        });

        this.$root.$on("getUser", () => {
            if (isAuthenticated()) {
                axiosGet('/api/v1/token/user/', {}, true).then(response => {
                    this.user = response.data;
                }).catch(error => {
                    this.user = undefined;
                    if (error.status !== 401) {
                        console.log("Error during getting user: " + JSON.stringify(error.data));
                    }
                })
            }
        });
    },
    mounted() {
        this.$root.$emit('getUser');
    }
}
</script>

<style>
#app {
    text-align: center;
    min-width: 800px;
}
</style>
