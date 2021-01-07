<template>
    <div>
        <div v-if="confirmSwitchIndex === switchPhrases.length" class="select-color-container">
            <ColorPicker :color="color" :visibleFormats="['rgb']"
                         v-on:color-change="color = $event.colors.hex.slice(0, 7)">
                <template #hue-range-input-label>
                    Choose color
                </template>
                <template #copy-button>
                    {{ '' }}
                </template>
            </ColorPicker>
            <!-- idk why just value="Less..." does not work, maybe because of caches -->
            <input type="submit" :value="'Less colors...'"
                   @click.prevent="confirmSwitchIndex = 0"/>
        </div>
        <div v-else class="select-color-container">
            <div class="swatches-container">
                <span>Choose color: </span>
                <VSwatches v-model="color" swatches="text-advanced"/>
            </div>
            <input type="submit" :value="switchPhrases[confirmSwitchIndex]"
                   @click.prevent="confirmSwitchIndex += 1"/>
        </div>
    </div>
</template>

<script>
import VSwatches from 'vue-swatches'

export default {
    name: "SelectColor",
    components: {VSwatches},
    data() {
        return {
            color: '#000000',
            confirmSwitchIndex: 0,
            switchPhrases: [
                'More colors...',
                'Seriously?',
                'You really want to pick one of 16777216 colors?!',
                'Confirm your craziness',
                'I am crazy!',
                "OK, let's go!",
            ]
        }
    },
    watch: {
        color(value) {
            this.$emit('setColor', value);
        },
        confirmSwitchIndex(value) {
            if (value === this.switchPhrases.length) {
                this.$emit('setManyColors', true);
            } else if (value === 0) {
                this.$emit('setManyColors', false);
            }
        }
    },
    mounted() {
        this.$emit('setColor', this.color);
        this.$emit('setManyColors', false);
    }
}
</script>

<style scoped>
.select-color-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    text-align: center;
}

.swatches-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.swatches-container span {
    margin-right: 2rem;
    margin-bottom: 0.4rem;
}

.select-color-container input {
    width: fit-content;
    margin: 0.5rem auto;
}
</style>

<style>
.select-color-container .vacp-range-input-label--alpha,
.select-color-container .vacp-color-input-label[for="color-picker-color-rgb-a"] {
    display: none;
}
</style>
