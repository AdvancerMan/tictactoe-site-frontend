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
                ['ticTacToe-myGames', 'My games'],
            ];
        }
    },
}
</script>

<style scoped>

</style>
