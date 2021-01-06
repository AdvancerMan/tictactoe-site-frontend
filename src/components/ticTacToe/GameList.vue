<template>
    <table class="tic-tac-toe-table">
        <thead>
        <tr>
            <th>Status</th>
            <th>Width</th>
            <th>Height</th>
            <th>Threshold</th>
            <th>Owner</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody v-if="games.length">
        <tr v-for="game in games" :key="game.id">
            <td>
                {{ !game.started ? 'waiting' : (game.finished ? 'finished' : 'started') }}
            </td>
            <td>{{ game.width }}</td>
            <td>{{ game.height }}</td>
            <td>{{ game.win_threshold }}</td>
            <td>{{ game.owner.username }}</td>
            <td class="table-button" @click="history(game)"
                v-if="myGames && game.finished || !myGames && game.started">
                History
            </td>
            <td class="table-button" v-else @click="enter(game)">
                Enter
            </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
            <td colspan="6">
                No games
            </td>
        </tr>
        </tbody>
    </table>
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
.tic-tac-toe-table {
    width: fit-content;
    margin: 0 auto;
}

.tic-tac-toe-table tr > * {
    padding: 0.5rem 1rem;
}
</style>
