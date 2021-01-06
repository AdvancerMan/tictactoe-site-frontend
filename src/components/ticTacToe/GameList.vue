<template>
    <ul>
        <li v-for="game in games" :key="game.id">
            {{ JSON.stringify(game) }}
            <input v-if="myGames && game.finished || !myGames && game.started"
                   @click="history(game)" type="submit" value="History">
            <input v-else @click="enter(game)"
                   type="submit" value="Enter">
        </li>
    </ul>
</template>

<script>
export default {
    name: "GameList",
    props: ['games', 'myGames'],
    methods: {
        enter(game) {
            this.$router.push({name: 'ticTacToe-room', params: {id: game.id}});
        },
        history(game) {
            this.$router.push({name: 'ticTacToe-history', params: {id: game.id}});
        },
    },
}
</script>

<style scoped>
li {
    background-color: #F7D002;
    margin-top: 1rem;
}
</style>
