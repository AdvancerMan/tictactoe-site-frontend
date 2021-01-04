<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex"
        :notFound="!fetchingGame && Object.keys(game).length === 0"/>
    </div>
</template>

<script>
import Game from "@/components/ticTacToe/Game";
import {axiosGet} from "@/requests";

export default {
    name: "History",
    components: {Game},
    props: ['id'],
    data() {
        return {
            game: {},
            turnIndex: 0,
            board: [],
            fetchingGame: true,
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

            setTimeout(() => {
                for (let i = 0; i < this.game.history.length; i++) {
                    const turn = this.game.history[i];
                    setTimeout(() => {
                        this.$set(this.board[turn[0]], turn[1], i % this.game.players.length);
                        this.turnIndex = (i + 1) % this.game.players.length;
                    }, 500 * i);
                }
            }, 1000);
        },
    },
    beforeMount() {
        axiosGet(`/api/v1/ticTacToe/game/${this.id}`).then(response => {
            this.game = response.data;
            this.fillBoard();
        }).catch(() => {
            // no operations
        }).then(() => this.fetchingGame = false);
    }
}
</script>

<style scoped>

</style>
