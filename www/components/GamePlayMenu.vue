<template lang="html">
    <section class="playmenu-container">
        <nav class="playmenu-bar">
            <button class="btn-playmenu" v-if="!paused" :aria-label="pause"
                @click="btnPauseOnClick()">
                <i class="playmenu-icon fas fa-pause"></i>
            </button>

            <button class="btn-playmenu" v-if="paused" :aria-label="resume"
                @click="btnResumeOnClick()">
                <i class="playmenu-icon fas fa-play"></i>
            </button>

            <button class="btn-playmenu" :disabled="!paused"
                :aria-disabled="!paused" :aria-label="exit"
                @click="btnExitOnClick()">
                <i class="playmenu-icon fas fa-tasks"></i>
            </button>
        </nav>
    </section>
</template>

<script>
    export default {
        name: 'GamePlayMenu',
        props: {
            paused: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                exit: BlindRPG.i18n.item('game.gameplay.actions.exit'),
                pause: BlindRPG.i18n.item('game.gameplay.actions.pause'),
                resume: BlindRPG.i18n.item('game.gameplay.actions.resume')
            }
        },
        methods: {
            btnExitOnClick: function () {
                let buttons = [
                    BlindRPG.i18n.item('game.button.yes'),
                    BlindRPG.i18n.item('game.button.no')
                ]

                let title   = BlindRPG.i18n.item('game.confirmation.openmenu.title')
                let message = BlindRPG.i18n.item('game.confirmation.openmenu.message')

                navigator.notification.confirm(message, (source) => {
                    if (source === 1 ) {
                        this.$emit('on-exit')
                    }
                }, title, buttons)
            },
            btnPauseOnClick: function () {
                this.$emit('on-pause')
            },
            btnResumeOnClick: function () {
                this.$emit('on-resume')
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.playmenu.css");
</style>
