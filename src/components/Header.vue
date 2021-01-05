<template>
    <header>
        <router-link class="title" :to="{name: 'index'}">
            My Site
        </router-link>
        <nav>
            <ul>
                <li v-for="[routeName, title] in $root.navLinks" :key="routeName">
                    <router-link :to="{name: routeName}">
                        {{ title }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="login-register" v-if="user === undefined">
            <router-link :to="{name: 'register'}">
                Register
            </router-link>
            <router-link :to="{name: 'login'}">
                Login
            </router-link>
        </div>
        <div class="login-register" v-else>
            <span>Hello, {{ user.username }}!</span>
            <a href='' @click.prevent="$root.$emit('logout')">
                Logout
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: ["user"],
}
</script>

<style scoped>
header {
    position: relative;
    margin-bottom: 1rem;
}

header .title {
    position: absolute;
    left: 1rem;
    top: 10%;
    font-weight: bold;
    font-size: 2rem;
    color: var(--header-link-color);
    text-decoration: none;
}

header nav {
    width: auto;
    background-color: var(--main-yellow);
    padding: 1.2rem 0;
}

header nav ul {
    margin: 0;
}

header nav ul li {
    display: inline;
}

header .login-register {
    position: absolute;
    right: 2rem;
    top: 1.2rem;
}

header nav ul li a,
header .login-register * {
    text-decoration: none;
    font-weight: bold;
    color: var(--header-link-color);
    padding: 1.2rem 0.5rem;
}

header a:hover {
    color: var(--header-onlink-color);
}
</style>
