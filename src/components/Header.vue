<template>
    <header>
        <router-link class="title" :to="{name: 'index'}">
            My Site
        </router-link>
        <nav>
            <ul>
                <li v-for="[routeName, title] in navLinks" :key="routeName">
                    <router-link :to="{name: routeName}">
                        {{ title }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            navLinks: [
                ['index', 'Home'],
                ['hello', 'Vue Greeting'],
            ]
        }
    }
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
    background-color: var(--header-color);
    padding: 1.2rem 0;
}

header nav ul {
    margin: 0;
}

header nav ul li {
    display: inline;
    margin-right: 1rem;
}

header nav ul li a {
    padding: 1.2rem 0;
    text-decoration: none;
    font-weight: bold;
    color: var(--header-link-color);
}

header nav ul li a:hover,
header .title:hover {
    color: var(--header-onlink-color);
}
</style>