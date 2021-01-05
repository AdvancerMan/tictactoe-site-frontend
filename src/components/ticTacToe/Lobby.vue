<template>
    <div>
        <input @click.prevent="redirectToCreate" type="submit" value="Create a game"/>
        <ul>
            <li v-for="game in games" :key="game.id">
                {{ JSON.stringify(game) }}
                <input @click="enter(game)" type="submit" value="Enter">
            </li>
        </ul>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";

export default {
    name: "Lobby",
    props: ['page', 'count'],
    data() {
        return {
            games: [],
        };
    },
    methods: {
        enter(game) {
            this.$router.push({name: 'ticTacToe-room', params: {id: game.id}});
        },
        redirectToCreate() {
            this.$router.push({name: 'ticTacToe-create'});
        }
    },
    beforeMount() {
        axiosGet(`/api/v1/ticTacToe/games/waiting`, {
            params: {
                page: this.page,
                count: this.count
            }
        }).then(response => {
            this.games = response.data;
        });
    }
}
</script>

<style scoped>
li {
    background-color: #F7D002;
    margin-top: 1rem;
}
</style>
