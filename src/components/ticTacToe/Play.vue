<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex"
              v-on:makeTurn="makeTurn" :winData="winData"
              :notFound="!fetchingGame && Object.keys(game).length === 0"/>
    </div>
</template>

<script>
import Game from "@/components/ticTacToe/Game";
import {axiosGet, axiosPatch} from "@/requests";

export default {
    name: "Play",
    components: {Game},
    props: ['id', 'user'],
    data() {
        return {
            game: {},
            winData: {start: [null]},
            turnIndex: 0,
            board: [],
            destroyed: false,
            fetchingGame: true,
        }
    },
    computed: {
        finished() {
            return this.winData.start[0] !== null;
        },
        fetchingHistory() {
            return !(this.destroyed || this.finished);
        }
    },
    methods: {
        fillBoard() {
            for (let i = 0; i < this.game.height; i++) {
                this.board.push([]);
                for (let j = 0; j < this.game.width; j++) {
                    this.board[i].push(-1);
                }
            }

            for (let i = 0; i < this.game.history.length; i++) {
                const turn = this.game.history[i];
                this.$set(this.board[turn[0]], turn[1], i % this.game.players.length);
            }
            if (this.finished) {
                this.turnIndex = Math.max(0, this.game.history.length - 1) % this.game.players.length;
            } else {
                this.turnIndex = this.game.history.length % this.game.players.length;
            }
        },
        makeTurn(i, j) {
            axiosPatch(`/api/v1/ticTacToe/game/${this.id}/turn`, {i, j}).then(response => {
                const userIndex = this.game.order.indexOf(this.user.id);
                this.$set(this.board[i], j, userIndex);
                if (!this.finished && response.data.start[0] !== null) {
                    response.data.winner = this.user;
                    this.winData = response.data;
                    this.turnIndex = userIndex % this.game.players.length;
                }
            }).catch(error => {
                this.$snotify.error(JSON.stringify(error.data), 'Error');
            });
        },
        fetchHistory() {
            axiosGet(`/api/v1/ticTacToe/game/${this.id}/historySuffix`, {
                params: {
                    start_index: this.game.history.length
                }
            }).then(response => {
                response.data.history.forEach(turn => {
                    this.$set(
                        this.board[turn[0]], turn[1],
                        this.game.history.length % this.game.players.length
                    );
                    this.game.history.push(turn);
                });

                this.turnIndex = this.game.history.length % this.game.players.length;

                if (!this.finished && response.data.win_data !== undefined) {
                    const winnerIndex = Math.max(0, this.game.history.length - 1) % this.game.players.length;
                    this.turnIndex = winnerIndex;
                    response.data.win_data.winner = this.game.players[winnerIndex];
                    this.winData = response.data.win_data;
                }
            }).catch(error => {
                this.$snotify.error(JSON.stringify(error.data), 'Error');
            });
        },
        fetchHistoryContinuously() {
            setTimeout(() => {
                if (this.fetchingHistory) {
                    this.fetchHistory();
                    this.fetchHistoryContinuously();
                }
            }, 1000);
        }
    },
    beforeMount() {
        axiosGet(`/api/v1/ticTacToe/game/${this.id}`).then(response => {
            this.game = response.data;
            this.winData = this.game.win_data;
            this.fillBoard();
            this.fetchHistoryContinuously();
        }).catch(() => {
            // no operations
        }).then(() => this.fetchingGame = false);
    },
    beforeDestroy() {
        this.destroyed = true;
    }
}
</script>

<style scoped>

</style>
