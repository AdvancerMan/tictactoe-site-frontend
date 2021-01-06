<template>
    <table class="tic-tac-toe-table">
        <thead hidden v-if="colors !== undefined">
        <!-- hidden images to load them at page init -->
        <tr v-for="i in colors.length" :key="i">
            <th>
                <img :src="picPath(i - 1)" alt=""/>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in board.length" :key="i">
            <td v-for="j in board[i - 1].length" :key="j"
                @click="$emit('makeTurn', i - 1, j - 1)">
                <img :src="picPath(board[i - 1][j - 1])"
                     :alt="`player ${board[i - 1][j - 1] + 1}`"
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
    methods: {
        picPath(i) {
            const type = i % 2 ? 'circle' : 'cross';
            return `/api/v1/ticTacToe/pics/${type}/${this.colors[i].slice(1)}`;
        },
    }
}
</script>

<style scoped>
.tic-tac-toe-table tr td *:first-child {
    width: var(--tic-tac-toe-cell-size);
    height: var(--tic-tac-toe-cell-size);
}

.tic-tac-toe-table tr td img {
    vertical-align: top;
}
</style>
