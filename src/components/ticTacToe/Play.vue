<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex"
              :turnErrors="turnErrors" v-on:makeTurn="makeTurn"/>
    </div>
</template>

<script>
import axios from "axios";
import Game from "@/components/ticTacToe/Game";

export default {
    name: "Play",
    components: {Game},
    props: ['id'],
    data() {
        return {
            game: {},
            turnIndex: 0,
            board: [],
            turnErrors: '',
            fetchingHistory: true,
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
            this.turnIndex = this.game.history.length % this.game.players.length;
        },
        makeTurn(i, j) {
            this.$root.$emit(
                'patchWithJwt', `/api/v1/ticTacToe/game/${this.id}/turn`, {i, j},
                response => {
                    this.$set(this.board[i], j, this.turnIndex);
                    if (response.data.winner_index !== null) {
                        this.game.finished = true;
                        alert(`winner_index = ${response.data.winner_index}`);
                    }
                },
                errors => {
                    this.turnErrors = errors.response.data;
                }
            );
        },
        fetchHistory() {
            this.$root.$emit(
                'getWithJwt', `/api/v1/ticTacToe/game/${this.id}/historySuffix`, {
                    params: {
                        start_index: this.game.history.length
                    }
                }, response => {
                    response.data.history.forEach(turn => {
                        this.$set(
                            this.board[turn[0]], turn[1],
                            this.game.history.length % this.game.players.length
                        );
                        this.game.history.push(turn);
                    })

                    this.turnIndex = this.game.history.length % this.game.players.length;
                }, error => this.turnErrors = error.response.data
            )
        },
        fetchHistoryContinuously() {
            setTimeout(() => {
                this.fetchHistory();
                if (this.fetchingHistory) {
                    this.fetchHistoryContinuously();
                }
            }, 1000);
        }
    },
    beforeMount() {
        axios.get("/api/v1/ticTacToe/game/" + this.id).then(response => {
            this.game = response.data;
            this.fillBoard();
        });
    },
    mounted() {
        this.fetchHistoryContinuously();
    },
    beforeDestroy() {
        this.fetchingHistory = false;
    }
}
</script>

<style scoped>

</style>
