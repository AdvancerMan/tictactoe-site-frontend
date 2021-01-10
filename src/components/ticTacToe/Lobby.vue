<template>
    <div>
        <GameList :games="games" :user="user" :myGames="false" :gamesAreFetching="initializingGames"/>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";
import GameList from "@/components/ticTacToe/GameList";

export default {
    name: "Lobby",
    components: {GameList},
    props: ['user', 'page', 'count'],
    data() {
        return {
            games: [],
            destroyed: false,
            initializingGames: true,
        };
    },
    methods: {
        fetchGames() {
            axiosGet(`/api/v1/ticTacToe/games/waiting`, {
                params: {
                    page: this.page,
                    count: this.count
                }
            }).then(response => {
                this.games = response.data;
            }).catch(() => {}).then(() => this.initializingGames = false);
        },
        fetchGamesContinuously() {
            this.fetchGames();
            setTimeout(() => {
                if (!this.destroyed) {
                    this.fetchGamesContinuously();
                }
            }, 2500);
        }
    },
    mounted() {
        this.fetchGamesContinuously();
    },
    beforeDestroy() {
        this.destroyed = true;
    }
}
</script>

<style scoped>

</style>
