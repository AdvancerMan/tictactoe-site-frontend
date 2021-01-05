<template>
    <router-view :user="user"/>
</template>

<script>
export default {
    name: "TicTacToe",
    props: ['user'],
    methods: {
        getNavLinks() {
            return [
                ['index', 'Home'],
                ['ticTacToe-lobby', 'Lobby'],
                ['ticTacToe-create', 'Create a game'],
                ['ticTacToe-myGames', 'My games'],
            ];
        }
    },
}
</script>

<style scoped>

</style>
