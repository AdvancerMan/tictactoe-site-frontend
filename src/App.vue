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
    methods: {
        requestWithJwt(axiosRequest, config, then, catchError, withoutRedirect, _again) {
            axiosRequest(config).then(response => {
                then(response);
            }).catch(error => {
                if (error.response.data.code === "token_not_valid" && !_again) {
                    this.refreshJwt(axiosRequest, config, then, catchError, withoutRedirect);
                } else {
                    if (catchError !== undefined) {
                        catchError(error);
                    }
                }
            });
        },
        refreshJwt(axiosRequest, config, then, catchError, withoutRedirect) {
            const refresh = localStorage.getItem('jwtRefresh');
            if (!refresh) {
                if (!withoutRedirect) {
                    this.$router.push({name: 'login'});
                }
                return;
            }

            axios.post('/api/v1/token/refresh/', {refresh}).then(response => {
                localStorage.setItem('jwtAccess', response.data.access);
                config['headers']['Authorization'] = 'Bearer ' + response.data.access;
                this.requestWithJwt(axiosRequest, config, then, catchError, withoutRedirect, true);
            }).catch(() => {
                this.$root.$emit('clearJwt');
                if (!withoutRedirect) {
                    this.$router.push({name: 'login'});
                }
            });
        },
        prepareRequest(url, data, config) {
            let _config = config === undefined ? {} : config;
            if (!('headers' in _config)) {
                _config['headers'] = {};
            }
            _config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('jwtAccess');
            return [
                url === undefined ? '/' : url,
                data === undefined ? {} : data,
                config,
            ];
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
            this.$root.$emit(
                'getWithJwt', '/api/v1/token/user/', {},
                response => {
                    this.user = response.data;
                }, error => alert(JSON.stringify(error.response.data)), true
            );
        });

        this.$root.$on("postWithJwt", (url, data, config, then, catchError, withoutRedirect) => {
            const [_url, _data, _config] = this.prepareRequest(url, data, config);
            this.requestWithJwt(
                (config) => axios.post(_url, _data, config),
                _config, then, catchError, withoutRedirect
            );
        });

        this.$root.$on("patchWithJwt", (url, data, config, then, catchError, withoutRedirect) => {
            const [_url, _data, _config] = this.prepareRequest(url, data, config);
            this.requestWithJwt(
                (config) => axios.patch(_url, _data, config),
                _config, then, catchError, withoutRedirect
            );
        });

        this.$root.$on("getWithJwt", (url, config, then, catchError, withoutRedirect) => {
            // eslint-disable-next-line no-unused-vars
            const [_url, _, _config] = this.prepareRequest(url, undefined, config);
            this.requestWithJwt(
                (config) => axios.get(_url, config),
                _config, then, catchError, withoutRedirect
            );
        });
    },
    mounted() {
        if (localStorage.getItem('jwtAccess') !== undefined) {
            this.$root.$emit('getUser');
        }
    }
}
</script>

<style>
#app {
    text-align: center;
}
</style>
