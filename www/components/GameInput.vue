<template>
    <section class="input-container">
        <div v-if="isDecision()" v-for="choice in source">
            <button type="button" role="button" class="btn-input"
                :aria-label="choice.text"
                @click="btnChoiceOnClick(choice)">
                {{ choice.text }}
            </button>
        </div>

        <div v-if="isTalk()">
            <button type="button" role="button" class="btn-input"
                :aria-label="source.text"
                @click="btnTalkOnClick()">
                {{ source.text }}
            </button>
        </div>
    </section>
</template>

<script>
    import TalkInputType from '../js/core/input/game.talkinputtype.js'

    export default {
        name: 'GameInput',
        props: ['source'],
        data() {
            return {}
        },
        methods: {
            isDecision: function () {
                return (this.source instanceof Array)
            },
            isTalk: function () {
                return (this.source instanceof TalkInputType)
            },
            btnChoiceOnClick: function (choice) {
                this.$emit('on-select', choice)
            },
            btnTalkOnClick: function () {
                this.$emit('on-click', this.source)
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.input.css");
</style>
