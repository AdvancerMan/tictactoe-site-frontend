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
                @click="$emit('makeTurn', i - 1, j - 1)"
                :style="highlightCell && i - 1 === highlightCell[0]
                            && j - 1 === highlightCell[1]
                            && board[i - 1][j - 1] !== -1
                            ? `background-color: ${colors[board[i - 1][j - 1]]}50;`
                            : ''">
                <transition name="color-cell">
                    <img :src="picPath(board[i - 1][j - 1])"
                         :alt="`player ${board[i - 1][j - 1] + 1}`"
                         v-if="board[i - 1][j - 1] !== -1"/>
                    <div v-else/>
                </transition>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import getCrossCirclePicUrl from "./getCrossCirclePicUrl";

export default {
    name: "Board",
    props: ['board', 'colors', 'highlightCell'],
    methods: {
        picPath(i) {
            const type = i % 2 ? 'circle' : 'cross';
            return getCrossCirclePicUrl(type, this.colors[i].slice(1));
        },
    }
}
</script>

<style scoped>
.tic-tac-toe-table tr td *:last-child {
    width: var(--tic-tac-toe-cell-size);
    height: var(--tic-tac-toe-cell-size);
}

.tic-tac-toe-table tr td img {
    vertical-align: top;
}

.color-cell-enter-active,
.color-cell-leave-active {
    transition: opacity .5s;
}
.color-cell-enter,
.color-cell-leave-to {
    opacity: 0;
}
</style>
