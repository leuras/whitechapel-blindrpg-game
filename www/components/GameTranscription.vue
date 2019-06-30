<template>
    <section :aria-label="description" class="transcription-container">
        <p v-for="item in transcriptions" :aria-hidden="readonly"
                :class="item.answered ? 'transcription-text answered': 'transcription-text'">
            {{ item.text }}
        </p>
    </section>
</template>

<script>
    export default {
        name: 'GameTranscription',
        props: {
            'max': {
                type: Number,
                default: 3
            },
            'items': {
                type: Array,
                default: []
            },
            'readonly': {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                description: BlindRPG.i18n.item('game.scene.aria.label.transcription')
            }
        },
        computed: {
            transcriptions () {
                return this.items.slice(this.max * -1)
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.transcription.css");
</style>
