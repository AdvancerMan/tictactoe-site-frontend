<template>
    <table>
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
</style>
