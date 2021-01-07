<template>
    <div>
        <SelectColor @setColor="color = $event" @setManyColors="manyColors = $event"/>
        <img v-if="!manyColors" :src="picUrl('cross', color.slice(1))" alt="Your cross">
        <img v-if="!manyColors" :src="picUrl('circle', color.slice(1))" alt="Your circle">
    </div>
</template>

<script>
import SelectColor from "@/components/SelectColor";
import getCrossCirclePicUrl from "./getCrossCirclePicUrl";

export default {
    name: "TicTacToeSelectColor",
    components: {SelectColor},
    data() {
        return {
            color: '#000000',
            manyColors: false,
        }
    },
    watch: {
        color(value) {
            this.$emit('setColor', value);
        }
    },
    methods: {
        picUrl(type, color) {
            return getCrossCirclePicUrl(type, color);
        }
    },
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}

div > * {
    margin-right: 2rem;
}

div > *:last-child {
    margin-right: 0;
}

img {
    width: 64px;
    height: 64px;
}
</style>
