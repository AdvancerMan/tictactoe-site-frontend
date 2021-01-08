<template>
    <div>
        <NotFound404 v-if="notFound"/>
        <div v-else class="game-root">
            <PlayerList :players="game.players" :colors="game.colors"
                        :highlightIndex="turnIndex"/>
            <Board class='board' v-on:makeTurn="makeTurn"
                   :board="board" :colors="game.colors"
                   :highlightCell="highlightCells && game.history
                                       && game.history[game.history.length - 1]"/>
        </div>
    </div>
</template>

<script>
import Board from "@/components/ticTacToe/Board";
import NotFound404 from "@/components/NotFound404";
import PlayerList from "@/components/ticTacToe/PlayerList";

export default {
    name: "Game",
    components: {PlayerList, NotFound404, Board},
    props: ['game', 'board', 'turnIndex', 'notFound', 'winData', 'highlightCells'],
    computed: {
        playerMarkerStyle() {
            let colorEntries = [];
            if (this.game.started) {
                colorEntries = this.game.colors.map((c, i) => [this.game.order[i], c]);
            } else {
                colorEntries = Object.entries(this.game.colors);
            }

            return Object.fromEntries(colorEntries.map(([id, color]) => [id, `color: ${color};`]));
        }
    },
    methods: {
        makeTurn(i, j) {
            this.$emit('makeTurn', i, j);
        },
        finishGame(winData) {
            setTimeout(() => {
                if (winData.start[0] === -1) {
                    this.$snotify.info("It's a tie!", 'Tie');
                } else {
                    this.$snotify.info(`${winData.winner.username} won!`, 'Winner');
                }
            }, 500);
        }
    },
    watch: {
        winData(data) {
            if (data !== undefined && data.start[0] !== null) {
                this.finishGame(data);
            }
        }
    }
}
</script>

<style scoped>
.game-root {
    display: flex;
    flex-direction: row;
    margin-left: 2rem;
}

.game-root .board {
    margin-left: 5rem;
}
</style>
