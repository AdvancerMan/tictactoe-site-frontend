<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex"
              :turnErrors="turnErrors" v-on:makeTurn="makeTurn"/>
    </div>
</template>

<script>
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
            destroyed: false,
        }
    },
    computed: {
        fetchingHistory() {
            return !this.destroyed || !this.finished;
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
                'axiosPatch', `/api/v1/ticTacToe/game/${this.id}/turn`, {i, j}, {},
                response => {
                    this.$set(this.board[i], j, this.turnIndex);
                    if (response.data.win_line_start[0] !== null) {
                        this.game.win_data = response.data;
                        alert(`win_data = ${response.data}`);
                    }
                },
                error => {
                    this.turnErrors = error;
                }
            );
        },
        fetchHistory() {
            this.$root.$emit(
                'axiosGet', `/api/v1/ticTacToe/game/${this.id}/historySuffix`, {
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
                }, error => {
                    this.turnErrors = error;
                }
            );
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
        this.$root.$emit('axiosGet', `/api/v1/ticTacToe/game/${this.id}`, {}, response => {
            this.game = response.data;
            this.fillBoard();
        });
    },
    mounted() {
        this.fetchHistoryContinuously();
    },
    beforeDestroy() {
        this.destroyed = true;
    }
}
</script>

<style scoped>

</style>
