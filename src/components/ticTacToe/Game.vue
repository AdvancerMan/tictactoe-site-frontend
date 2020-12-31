<template>
    <div>
        <Board :board="board" style="margin: 0 auto"/>
    </div>
</template>

<script>
import Board from "@/components/ticTacToe/Board";
import {CROSS, CIRCLE, NOTHING} from '@/components/ticTacToe/constants';

export default {
    name: "Game",
    data: function () {
        return {
            width: 10,
            height: 10,
            board: [],
            turn: CROSS,
            CROSS, CIRCLE, NOTHING
        }
    },
    created() {
        for (let i = 0; i < this.height; i++) {
            this.board.push([]);
            for (let j = 0; j < this.width; j++) {
                this.board[i].push(NOTHING);
            }
        }
    },
    components: {Board},
    beforeCreate() {
        this.$root.$on('ticTacToe-makeTurn', (i, j) => {
            this.$set(this.board[i], j, this.turn);
            this.turn = this.turn === CROSS ? CIRCLE : CROSS;
        })
    }
}
</script>

<style scoped>

</style>
