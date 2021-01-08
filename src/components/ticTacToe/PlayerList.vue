<template>
    <div>
        Players:
        <ul class="players-list">
            <li v-for="(player, i) in players" :key="i">
                <span class="marker" :style="playerMarkerStyle[i]">
                    {{ i % 2 ? 'O' : 'X' }}
                </span>
                <span class="username">
                    {{ player.username }}
                </span>
                <span class="turn-marker" v-if="i === highlightIndex"
                      :style="playerMarkerStyle[i]">
                    ✔
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PlayerList",
    props: ['players', 'colors', 'highlightIndex'],
    computed: {
        playerMarkerStyle() {
            return this.colors.map(color => `color: ${color};`);
        },
    },
}
</script>

<style scoped>

.players-list {
    list-style-type: none;
    text-align: left;
}

.players-list li {
    position: relative;
}

.players-list li .marker {
    position: absolute;
}

.players-list li .username {
    margin-left: 1.5rem;
}

.players-list li .turn-marker {
    position: absolute;
    right: -1rem;
}

.players-list li:before {
    padding-right: 5px;
}

</style>