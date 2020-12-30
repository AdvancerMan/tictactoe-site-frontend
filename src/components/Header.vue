<template>
    <header>
        <nav>
            <ul>
                <li><router-link :to="{name: 'index'}">Home</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>

</style>