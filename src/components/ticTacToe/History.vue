<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex" :winData="winData"
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
            winData: {start: [null]},
            turnIndex: 0,
            board: [],
            fetchingGame: true,
        }
    },
    methods: {
        colorCell(index) {
            const players_cnt = this.game.players.length;
            const turn = this.game.history[index];
            this.$set(this.board[turn[0]], turn[1], index % players_cnt);

            if (index + 1 < this.game.history.length) {
                this.turnIndex = (index + 1) % players_cnt;
            }

            if (index + 1 === this.game.history.length) {
                if (this.game.win_data.start[0] !== null) {
                    this.game.win_data.winner = this.game.players[index % this.game.players.length];
                    this.winData = this.game.win_data;
                }
            } else {
                setTimeout(() => this.colorCell(index + 1), 500);
            }
        },
        fillBoard() {
            for (let i = 0; i < this.game.height; i++) {
                this.board.push([]);
                for (let j = 0; j < this.game.width; j++) {
                    this.board[i].push(-1);
                }
            }

            setTimeout(() => this.colorCell(0), 1000);
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
