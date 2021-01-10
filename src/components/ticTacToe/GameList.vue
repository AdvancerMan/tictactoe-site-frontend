<template>
    <table class="tic-tac-toe-table">
        <thead>
        <tr>
            <th>Created</th>
            <th>Status</th>
            <th>Width</th>
            <th>Height</th>
            <th>Threshold</th>
            <th>Owner</th>
            <th v-if="showWinner">Winner</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody v-if="games.length">
        <tr v-for="game in games" :key="game.id">
            <td>
                {{
                    new Date(game.creation_time)
                        .toLocaleString(undefined, {hour12: false, timeZoneName: 'short'})
                }}
            </td>
            <td>
                {{ !game.started ? 'waiting' : (game.finished ? 'finished' : 'started') }}
            </td>
            <td>{{ game.width }}</td>
            <td>{{ game.height }}</td>
            <td>{{ game.win_threshold }}</td>
            <td>{{ game.owner.username }}</td>
            <td v-if="showWinner">{{ getWinner(game) }}</td>
            <td class="table-button" @click="history(game)"
                v-if="game.user_joined && game.finished || !game.user_joined && game.started">
                History
            </td>
            <td class="table-button" @click="enter(game)" v-else>
                Enter
            </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
            <td :colspan="showWinner ? 8 : 7">
                No games
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "GameList",
    props: ['games', 'showWinner'],
    methods: {
        enter(game) {
            this.$router.push({name: 'ticTacToe-room', params: {id: game.id}});
        },
        history(game) {
            this.$router.push({name: 'ticTacToe-history', params: {id: game.id}});
        },
        getWinner(game) {
            if (!game.finished) {
                return '';
            } else if (game.winner === null) {
                return "Tie!";
            } else {
                return game.winner.username;
            }
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
