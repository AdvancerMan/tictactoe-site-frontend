<template>
    <table class="tic-tac-toe-table">
        <tbody>
        <tr v-for="i in board.length" :key="i">
            <td v-for="j in board[i - 1].length" :key="j"
                @click="$emit('makeTurn', i - 1, j - 1)">
                <div :style="styles[board[i - 1][j - 1]]"
                     v-if="board[i - 1][j - 1] !== -1"/>
                <div v-else/>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Board",
    props: ['board', 'colors'],
    computed: {
        styles() {
            return this.colors.map(color => 'background-color: ' + color);
        }
    }
}
</script>

<style scoped>
.tic-tac-toe-table tr td *:first-child {
    width: var(--tic-tac-toe-cell-size);
    height: var(--tic-tac-toe-cell-size);
}
</style>
