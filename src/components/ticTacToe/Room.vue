<template>
    <div>
        <NotFound404 v-if="!fetchingGame && Object.keys(game).length === 0"/>
        <div v-else>
            Players:
            <ul>
                <li v-for="player in game.players" :key="player.id">
                    {{ player.username }}
                </li>
            </ul>
<!--            TODO if not joined -->
            <form @submit.prevent="join">
                <label>Take your color: <input v-model="color"/></label>
                <input type="submit" value="Join"/>
            </form>
            <input @click.prevent="start" type="submit" value="Start"/>
            <div>{{ error }}</div>
        </div>
    </div>
</template>

<script>
import {axiosGet, axiosPatch} from "@/requests";
import NotFound404 from "@/components/NotFound404";

export default {
    name: "Room",
    components: {NotFound404},
    props: ['id'],
    data() {
        return {
            game: {},
            fetchingGame: true,
            color: '',
            error: '',
        }
    },
    methods: {
        join() {
            if (!/^#[0-9a-fA-F]{6}$/.test(this.color)) {
                this.error = 'Invalid color, please, follow format #nnnnnn';
            } else {
                axiosPatch(`/api/v1/ticTacToe/game/${this.id}/join`, {
                    color: this.color
                }).then(() => {
                    // TODO username
                    this.game.players.push({username: 'me'});
                }).catch(error => {
                    this.error = error.data;
                });
            }
        },
        start() {
            axiosPatch(`/api/v1/ticTacToe/game/${this.id}/start`).then(() => {
                this.$router.push({name: 'ticTacToe-play', params: {id: this.id}});
            }).catch(error => {
                this.error = error.data;
            });
        }
    },
    beforeMount() {
        axiosGet(`/api/v1/ticTacToe/game/${this.id}`).then(response => {
            this.game = response.data;
        }).catch(() => {
            // no operations
        }).then(() => this.fetchingGame = false);
    }
}
</script>

<style scoped>
    form {
        margin-bottom: 1rem;
        margin-top: 1rem;
    }
</style>
