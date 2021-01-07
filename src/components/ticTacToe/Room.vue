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
            <form v-if="game.players !== undefined && user !== undefined
                        && !game.players.find(p => p.id === user.id)"
                  @submit.prevent="join">
                <SelectColor @setColor="color = $event"/>
                <input type="submit" value="Join"/>
            </form>
            <input v-else-if="user !== undefined && user.id === game.owner" @click.prevent="start"
                   type="submit" value="Start"/>
            <div>{{ error }}</div>
        </div>
    </div>
</template>

<script>
import {axiosGet, axiosPatch} from "@/requests";
import NotFound404 from "@/components/NotFound404";
import SelectColor from "@/components/SelectColor";

export default {
    name: "Room",
    components: {SelectColor, NotFound404},
    props: ['id', 'user'],
    data() {
        return {
            game: {},
            fetchingGame: true,
            color: '',
            error: '',
            destroyed: false,
        }
    },
    computed: {
        fetchingPlayers() {
            return !this.destroyed && !this.game.started;
        },
        fetchingStarted() {
            return this.fetchingPlayers &&
                (this.game === undefined || this.user === undefined || this.game.owner !== this.user.id);
        },
    },
    methods: {
        join() {
            if (!/^#[0-9a-fA-F]{6}$/.test(this.color)) {
                this.error = 'Invalid color, please, follow format #nnnnnn';
            } else {
                axiosPatch(`/api/v1/ticTacToe/game/${this.id}/join`, {
                    color: this.color
                }).then(() => {
                    this.game.players.push({username: this.user.username});
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
        },
        fetchStarted() {
            axiosGet(`/api/v1/ticTacToe/game/${this.id}/started`).then(response => {
                this.game.started = response.data.started;
                if (this.game.started) {
                    this.$router.push({name: 'ticTacToe-play', params: {id: this.id}});
                }
            });
        },
        fetchPlayers() {
            axiosGet(`/api/v1/ticTacToe/game/${this.id}/players`).then(response => {
                this.game.players = response.data.players;
                this.game.colors = response.data.colors;
            });
        },
        fetchStartedContinuously() {
            setTimeout(() => {
                if (this.fetchingStarted) {
                    this.fetchStarted();
                    this.fetchStartedContinuously();
                }
            }, 1000);
        },
        fetchPlayersContinuously() {
            setTimeout(() => {
                if (this.fetchingPlayers) {
                    this.fetchPlayers();
                    this.fetchPlayersContinuously();
                }
            }, 5000);
        },
        redirectIfStarted(game, user) {
            if (game.started) {
                if (game.players.find(p => p.id === user.id) && !game.finished) {
                    this.$router.push({name: 'ticTacToe-play', params: {id: this.id}});
                } else {
                    this.$router.push({name: 'ticTacToe-history', params: {id: this.id}});
                }
            }
        }
    },
    watch: {
        game(value) {
            if (this.user !== undefined) {
                this.redirectIfStarted(value, this.user);
            }
        },
        user(value) {
            if (this.game !== {}) {
                this.redirectIfStarted(this.game, value);
            }
        }
    },
    beforeMount() {
        axiosGet(`/api/v1/ticTacToe/game/${this.id}`).then(response => {
            this.game = response.data;
        }).catch(() => {
            // no operations
        }).then(() => this.fetchingGame = false);
    },
    mounted() {
        this.fetchPlayersContinuously();
        this.fetchStartedContinuously();
    },
    beforeDestroy() {
        this.destroyed = true;
    }
}
</script>

<style scoped>
form {
    margin-bottom: 1rem;
    margin-top: 1rem;
}
</style>
