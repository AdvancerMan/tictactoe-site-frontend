<template>
    <div>
        <select v-model="selectedType">
            <option value="all">All</option>
            <option value="unfinished">Started or waiting</option>
            <option value="finished">Finished</option>
        </select>
        <GameList class="game-list" :games="games" :user="user"
                  :showWinner="true" :gamesAreFetching="gamesAreFetching"
                  :prevPageLink="prevPageLink" :nextPageLink="nextPageLink"/>
    </div>
</template>

<script>
import {axiosGet} from "@/requests";
import GameList from "@/components/ticTacToe/GameList";

export default {
    name: "MyGames",
    components: {GameList},
    props: ['user', 'page', 'count', 'type'],
    data() {
        return {
            games: [],
            gamesAreFetching: true,
            selectedType: 'all',
        };
    },
    computed: {
        intPage() {
            return this.myParseInt(this.page, 1);
        },
        intCount() {
            return this.myParseInt(this.count, 10);
        },
        parsedType() {
            return ["unfinished", "finished", "all"].includes(this.type) ? this.type : "all";
        },
        prevPageLink() {
            if (this.intPage <= 1) {
                return undefined;
            }
            return {
                name: 'ticTacToe-myGames',
                query: {
                    page: this.intPage - 1,
                    count: this.count,
                    type: this.type,
                }
            };
        },
        nextPageLink() {
            return {
                name: 'ticTacToe-myGames',
                query: {
                    page: this.intPage + 1,
                    count: this.count,
                    type: this.type,
                }
            };
        },
    },
    methods: {
        myParseInt(value, default_value) {
            const result = parseInt(value);
            return isNaN(result) ? default_value : result;
        },
        fetchGames() {
            let url = '/api/v1/ticTacToe/games/my?';
            if (this.parsedType !== 'all') {
                url += `finished=${this.parsedType === 'finished'}&`;
            }
            url += `page=${this.intPage}&`;
            url += `count=${this.intCount}`;
            axiosGet(url).then(response => {
                this.games = response.data;
            }).catch(() => {}).then(() => this.gamesAreFetching = false);
        }
    },
    watch: {
        selectedType(value) {
            if (value !== this.parsedType) {
                this.$router.push({name: 'ticTacToe-myGames', query: {type: value}});
            }
        },
        $route() {
            this.fetchGames();
        }
    },
    beforeMount() {
        this.selectedType = this.parsedType;
        this.fetchGames();
    },
}
</script>

<style scoped>
.game-list {
    margin-top: 1rem;
}
</style>
