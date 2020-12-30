<template>
    <div>
        <div>
            Not found :(
        </div>
        <div>
            Try
            <router-link :to="{name: 'index'}">this</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound404"
}
</script>

<style scoped>

</style>