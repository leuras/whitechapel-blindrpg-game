<template>
    <main class="scene-container">
        <div class="scene-title">
            <i class="fas fa-gem scene-title-icon"></i>
            <span class="scene-title-text">{{ scene.name }}</span>
        </div>
        <div class="stage-container">
            <game-transcription :items="transcriptions" :readonly="!isPaused"></game-transcription>
            <game-input v-if="hasInput" :source="input" @on-click="talk" @on-select="choose"></game-input>
        </div>
        <game-playmenu :paused="isPaused" @on-exit="exit" @on-pause="pause" @on-resume="resume"></game-playmenu>
    </main>
</template>

<script>
    import BlindRPG from '../js/blindrpg.js'
    import Constants from '../js/core/game.constants.js'

    import GameInput from './GameInput.vue'
    import GameTranscription from './GameTranscription.vue'
    import GamePlayMenu from './GamePlayMenu.vue'

    export default {
        name: 'GameScene',
        props: {
            'data': {
                type: Object
            },
            'mode': {
                type: String,
                default: Constants.Game.MODE_CAMPAIGN
            }
        },
        components: {
            'game-transcription': GameTranscription,
            'game-input': GameInput,
            'game-playmenu': GamePlayMenu
        },
        data () {
            return {
                game: {},
                scene: {},
                isPaused: false,
                hasInput: false,
                input: undefined,
                transcriptions: []
            }
        },
        mounted : function () {
            this.scene = this.data
            this.start()
        },
        methods: {
            start: function () {
                this.game = new BlindRPG.Game(this.scene, this, {
                    onplay: this.onPlay,
                    onquit: this.onQuit,
                    onend: this.onEndGame,
                    ongameover: this.onGameOver,
                    onpause: this.onPausedResumed,
                    onresume: this.onPausedResumed,
                    ondecision: this.onInputHandle,
                    onendscene: this.onEndGameScene,
                    oninputhandle: this.onInputHandle
                })

                this.game.run()
            },
            play(scene) {
                this.input = null
                this.hasInput = false
                this.transcriptions = []

                this.scene = scene
                this.game.dispose()
                this.start()
            },
            choose: function (choice) {
                this.saveHandler(scene)
                this.addTranscription(choice.text, true)
                this.play(choice.value)
            },
            talk: function (input) {
                this.hasInput = false
                this.addTranscription(input.text, true)
                input.execute()
            },
            exit: function () {
                this.game.quit()
            },
            pause: function () {
                this.game.pause()
            },
            resume: function () {
                this.game.resume()
            },
            onPlay: function (narrative) {
                this.addTranscription(narrative.subtitle, false)
            },
            onEndGameScene: function (scene) {
                this.saveHandler(scene)
                this.play(scene)
            },
            onInputHandle: function (input) {
                this.input = input
                this.hasInput = true
            },
            onPausedResumed: function () {
                this.isPaused = !this.isPaused
            },
            onQuit: function () {
                this.$router.replace({name: 'main'})
            },
            onEndGame: function () {
                // TODO: show a thank you, congratulations message or play some great sound of victory'
                this.$router.replace({name: 'credits'})
            },
            onGameOver: function () {
                let buttons = [
                    BlindRPG.i18n.item('game.button.no'),
                    BlindRPG.i18n.item('game.button.yes')
                ]

                let title   = BlindRPG.i18n.item('game.confirmation.gameover.title')
                let message = BlindRPG.i18n.item('game.confirmation.gameover.message')

                navigator.notification.confirm(message, (source) => {
                    switch (source) {
                        case 2:
                            this.play(BlindRPG.Game.load())
                            break;
                        default:
                            this.game.backgroundSound.stop()
                            this.game.dispose()
                            this.$router.replace({name: 'main'})
                    }
                }, title, buttons)
            },
            saveHandler: function (scene) {
                if (Constants.Game.MODE_TUTORIAL !== this.mode && ! scene.gameover) {
                    BlindRPG.Game.save(scene)
                }
            },
            addTranscription: function (transcription, answered) {
                if (typeof transcription !== 'undefined' && transcription.trim()) {
                    this.transcriptions.push({
                        text: transcription,
                        answered: answered
                    })
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.scene.css");
</style>
