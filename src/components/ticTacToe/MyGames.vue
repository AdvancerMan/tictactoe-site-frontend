<template>
    <div>
        <select v-model="gamesType">
            <option value="unfinished">Started or waiting</option>
            <option value="finished">Finished</option>
            <option value="all">All</option>
        </select>
        <ul>
            <li v-for="game in games" :key="game.id">
                {{ JSON.stringify(game) }}
            </li>
        </ul>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";

export default {
    name: "MyGames",
    data() {
        return {
            gamesType: 'unfinished',
            games: [],
        };
    },
    methods: {
        updateGames(type) {
            this.games = [];
            let url = '/api/v1/ticTacToe/games/my';
            if (type !== 'all') {
                url += `?finished=${type === 'finished'}`;
            }
            axiosGet(url).then(response => {
                if (type === this.gamesType) {
                    this.games = response.data;
                }
            });
        }
    },
    watch: {
        gamesType(type) {
            this.updateGames(type);
        }
    },
    beforeMount() {
        this.updateGames(this.gamesType);
    }
}
</script>

<style scoped>

</style>