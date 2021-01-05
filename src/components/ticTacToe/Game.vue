<template>
    <div>
        <NotFound404 v-if="notFound"/>
        <div v-else class="game-root">
            <div class="players">
                Players:
                <ul>
                    <li v-for="(player, i) in game.players" :key="player.id">
                    <span class="marker" :style="playerMarkerStyle[player.id]">
                        {{ i % 2 ? 'O' : 'X' }}
                    </span>
                        <span class="username">
                        {{ player.username }}
                    </span>
                        <span class="turn-marker" v-if="i === turnIndex"
                              :style="playerMarkerStyle[player.id]">
                        ✔
                    </span>
                    </li>
                </ul>
            </div>
            <Board class='board' v-on:makeTurn="makeTurn"
                   :board="board" :colors="game.colors"/>
            <div>{{ turnErrors }}</div>
        </div>
    </div>
</template>

<script>
import Board from "@/components/ticTacToe/Board";
import NotFound404 from "@/components/NotFound404";

export default {
    name: "Game",
    components: {NotFound404, Board},
    props: ['game', 'board', 'turnIndex', 'turnErrors', 'notFound', 'winData'],
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
            if (winData.start[0] === -1) {
                alert(`It's a tie!`);
            } else {
                alert(`${winData.winner.username} won! win_data = ${JSON.stringify(winData)}`);
            }
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

.game-root .players ul {
    list-style-type: none;
    text-align: left;
}

.game-root .players ul li {
    position: relative;
}

.game-root .players ul li .marker {
    position: absolute;
}

.game-root .players ul li .username {
    margin-left: 1.5rem;
}

.game-root .players ul li .turn-marker {
    position: absolute;
    right: -1rem;
}

.game-root .players ul li:before {
    padding-right: 5px;
}

.game-root .board {
    margin-left: 5rem;
}
</style>
