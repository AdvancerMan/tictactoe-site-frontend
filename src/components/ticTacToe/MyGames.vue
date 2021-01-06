<template>
    <div>
        <select v-model="gamesType">
            <option value="unfinished">Started or waiting</option>
            <option value="finished">Finished</option>
            <option value="all">All</option>
        </select>
        <GameList class="game-list" :games="games" :user="user" :myGames="true"/>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";
import GameList from "@/components/ticTacToe/GameList";

export default {
    name: "MyGames",
    components: {GameList},
    props: ['user'],
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
.game-list {
    margin-top: 1rem;
}
</style>
