<template>
    <div class="game-list-root">
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
                <router-link class="table-button" :to="{name: 'ticTacToe-history', params: {id: game.id}}"
                             v-if="game.user_joined && game.finished || !game.user_joined && game.started">
                    History
                </router-link>
                <router-link v-else class="table-button" :to="{name: 'ticTacToe-room', params: {id: game.id}}">
                    Enter
                </router-link>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td :colspan="showWinner ? 8 : 7">
                    <span v-if="gamesAreFetching">Fetching...</span>
                    <span v-else>No games</span>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="game-list-buttons-root">
            <button v-if="prevPageLink" class="prev-page-button"
                    @click.prevent="$router.push(prevPageLink)">
                &lt;&lt;&lt; Previous page
            </button>
            <button v-if="nextPageLink" class="next-page-button"
                    @click.prevent="$router.push(nextPageLink)">
                Next page &gt;&gt;&gt;
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameList",
    props: ['games', 'showWinner', 'gamesAreFetching', 'nextPageLink', 'prevPageLink'],
    methods: {
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
.game-list-root {
    width: fit-content;
    height: auto;
    margin: 1rem auto;
}

.tic-tac-toe-table {
    width: fit-content;
    margin: 0 auto;
}

.tic-tac-toe-table tr > * {
    padding: 0.5rem 1rem;
}

.game-list-buttons-root {
    margin-top: 1rem;
    padding: 0 0.5rem;
    display: flow-root;
}

.next-page-button {
    float: right;
}

.prev-page-button {
    float: left;
}
</style>
