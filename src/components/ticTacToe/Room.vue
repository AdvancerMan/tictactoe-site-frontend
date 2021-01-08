<template>
    <div>
        <NotFound404 v-if="!fetchingGame && Object.keys(game).length === 0"/>
        <div class="game-room" v-else>
            <PlayerList :players="game.players" :colors="game.colors"/>
            <form v-if="game.players !== undefined && user !== undefined
                        && !game.players.find(p => p.id === user.id)"
                  @submit.prevent="join" class="select-color-form">
                <TicTacToeSelectColor @setColor="color = $event"/>
                <input type="submit" value="Join"/>
            </form>
            <input v-else-if="user !== undefined && user.id === game.owner"
                   @click.prevent="start" type="submit" value="Start"/>
            <div>{{ error }}</div>
        </div>
    </div>
</template>

<script>
import {axiosGet, axiosPatch} from "@/requests";
import NotFound404 from "@/components/NotFound404";
import TicTacToeSelectColor from "@/components/ticTacToe/TicTacToeSelectColor";
import PlayerList from "@/components/ticTacToe/PlayerList";

export default {
    name: "Room",
    components: {PlayerList, TicTacToeSelectColor, NotFound404},
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
            const color = this.color;
            if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
                this.error = 'Invalid color, please, follow format #nnnnnn';
            } else {
                axiosPatch(`/api/v1/ticTacToe/game/${this.id}/join`, {
                    color: color
                }).then(() => {
                    this.game.players.push(this.user);
                    this.game.colors.push(color);
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
.game-room > * {
    margin: 0 auto 2rem;
    width: fit-content;
}

.game-room > *:last-child {
    margin-bottom: 0;
}

.select-color-form > input {
    margin-top: 1rem;
}
</style>
