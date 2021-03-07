<template>
    <div>
        Hello! To test site functionality you need to
        <router-link :to="{name: 'login'}">login</router-link>
        using test username and password (provided on login page).

        Then you can
        <router-link :to="{name: 'ticTacToe-create'}">create a game</router-link>
        or join some existing in a
        <router-link :to="{name: 'ticTacToe-lobby'}">lobby</router-link>.

        When all players joined the room the creator can start the game. If you lost your game you can find it
        <router-link :to="{name: 'ticTacToe-myGames', query: {type: 'unfinished'}}">here</router-link>
        or
        <router-link :to="{name: 'ticTacToe-myGames'}">here</router-link>.

        If you are testing this site alone, you can open it twice (in private mode or another browser) to simulate second player.

        Also
        <router-link :to="{name: 'ticTacToe-myGames', query: {type: 'finished'}}">here</router-link>
        you can see a history of every game you have played.
        <router-link :to="{name: 'ticTacToe-history', params: {id: 3}}">Example</router-link>.
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped>
    div {
        max-width: 60rem;
        text-align: center;
        margin: 1rem auto;
    }
</style>