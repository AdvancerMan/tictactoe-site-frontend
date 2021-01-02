<template>
    <div>
        <Game :game="game" :board="board" :turnIndex="turnIndex"/>
    </div>
</template>

<script>
import axios from "axios";
import Game from "@/components/ticTacToe/Game";

export default {
    name: "History",
    components: {Game},
    props: ['id'],
    data() {
        return {
            game: {},
            turnIndex: 0,
            board: []
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
        axios.get("/api/v1/ticTacToe/game/" + this.id).then(response => {
            this.game = response.data;
            this.fillBoard();
        });
    }
}
</script>

<style scoped>

</style>
