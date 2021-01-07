<template>
    <div>
        <h2>Create your own game!</h2>
        <form @submit.prevent="create">
            <label>Width <input type="text" v-model="width"></label>
            <label>Height <input type="text" v-model="height"></label>
            <label>Win threshold <input type="text" v-model="win_threshold"></label>
            <TicTacToeSelectColor @setColor="color = $event"/>
            <input type="submit" value="Create"/>
        </form>
        <div>
            {{ error }}
        </div>
    </div>
</template>

<script>
import {axiosPost} from "@/requests";
import TicTacToeSelectColor from "@/components/ticTacToe/TicTacToeSelectColor";

export default {
    name: "Create",
    components: {TicTacToeSelectColor},
    data() {
        return {
            width: 0,
            height: 0,
            win_threshold: 0,
            color: 0,
            error: '',
        }
    },
    methods: {
        create() {
            axiosPost('/api/v1/ticTacToe/games/create', {
                width: this.width,
                height: this.height,
                win_threshold: this.win_threshold,
                owner_color: this.color,
            }).then(response => {
                this.$router.push({name: 'ticTacToe-room', params: {id: response.data.id}});
            }).catch(error => {
                this.error = error.data;
            });
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    text-align: right;
    width: fit-content;
    margin: 0 auto;
}

input {
    margin-left: 1rem;
    margin-bottom: 1rem;
}

input[type=submit] {
    width: fit-content;
    margin: 1rem auto;
}
</style>
