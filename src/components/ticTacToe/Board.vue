<template>
    <table>
        <tbody>
        <tr v-for="i in board.length" :key="i">
            <td v-for="j in board[i - 1].length" :key="j"
                @click="makeTurn(i - 1, j - 1)">
                <img src="@/assets/img/cross.png" alt="cross"
                     v-if="board[i - 1][j - 1] === CROSS">
                <img src="@/assets/img/circle.png" alt="circle"
                     v-else-if="board[i - 1][j - 1] === CIRCLE">
                <div v-else/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import {CROSS, CIRCLE, NOTHING} from '@/components/ticTacToe/constants';

export default {
    name: "Board",
    props: ['board'],
    data: function () {
        return {
            CROSS, CIRCLE, NOTHING
        };
    },
    methods: {
        makeTurn(i, j) {
            this.$root.$emit('ticTacToe-makeTurn', i, j);
        }
    }
}
</script>

<style scoped>
table {
    border: var(--tic-tac-toe-table-border);
    border-collapse: collapse;
}

table tr td {
    border: var(--tic-tac-toe-cell-border);
}

table tr td *:first-child {
    width: var(--tic-tac-toe-cell-size);
    height: var(--tic-tac-toe-cell-size);
}

table tr td img {
    vertical-align: top;
}
</style>
