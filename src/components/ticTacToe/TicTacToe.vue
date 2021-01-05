<template>
    <router-view/>
</template>

<script>
export default {
    name: "TicTacToe",
    methods: {
        getNavLinks() {
            return [
                ['index', 'Home'],
                ['ticTacToe-lobby', 'Lobby'],
                ['ticTacToe-create', 'Create a game'],
            ];
        }
    },
    mounted() {
        this.$root.navLinks = this.getNavLinks();
    },
    beforeUpdate() {
        this.$root.navLinks = this.getNavLinks();
    },
}
</script>

<style scoped>

</style>
