<template>
    <div>
        <input @click.prevent="redirectToCreate" type="submit" value="Create a game"/>
        <GameList :games="games"/>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";
import GameList from "@/components/ticTacToe/GameList";

export default {
    name: "Lobby",
    components: {GameList},
    props: ['page', 'count'],
    data() {
        return {
            games: [],
            destroyed: false,
        };
    },
    methods: {
        redirectToCreate() {
            this.$router.push({name: 'ticTacToe-create'});
        },
        fetchGames() {
            axiosGet(`/api/v1/ticTacToe/games/waiting`, {
                params: {
                    page: this.page,
                    count: this.count
                }
            }).then(response => {
                this.games = response.data;
            });
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
