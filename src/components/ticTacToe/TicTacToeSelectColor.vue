<template>
    <div class="ttt-select-color-root">
        <SelectColor class="select-color" @setColor="color = $event"
                     @setManyColors="manyColors = $event"/>
        <img v-if="!manyColors" :src="picUrl('cross', color.slice(1))" alt="Your cross">
        <img v-if="!manyColors" :src="picUrl('circle', color.slice(1))" alt="Your circle">
        <span v-else>
            Preview is not available
        </span>
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
    mounted() {
        this.$emit('setColor', this.color);
    }
}
</script>

<style scoped>
.ttt-select-color-root {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}

.ttt-select-color-root > * {
    margin-right: 2rem;
}

.ttt-select-color-root > *:last-child {
    margin-right: 0;
}

.ttt-select-color-root > span {
    margin: auto 0;
}

.ttt-select-color-root .select-color {
    margin-top: 0.8rem;
}

img {
    width: 64px;
    height: 64px;
}
</style>
