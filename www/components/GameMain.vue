<template lang="html">
    <game-menu :title="menu.title">
        <game-menu-option v-if="hasSaveGame" :text="menu.continue"
            @on-click="menuContinueOnClick">
        </game-menu-option>

        <game-menu-option :text="menu.new"
            @on-click="menuNewOnClick">
        </game-menu-option>

        <game-menu-option :text="menu.tutorial"
            @on-click="menuTutorialOnClick">
        </game-menu-option>

        <game-menu-option :text="menu.credits"
            @on-click="menuCreditsOnClick">
        </game-menu-option>

        <game-menu-option :text="menu.quit"
            @on-click="menuQuitOnClick">
        </game-menu-option>
    </game-menu>
</template>

<script>
import axios from 'axios'
import Constants from '../js/core/game.constants.js'

import GameMenu from '../components/GameMenu.vue'
import GameMenuOption from'../components/GameMenuOption.vue'

require ('howler')

export default {
    name: 'GameMain',
    components: {
        'game-menu': GameMenu,
        'game-menu-option': GameMenuOption
    },
    data() {
        return {
            menu: {
                new: '',
                continue: '',
                tutorial: '',
                credits: '',
                quit: ''
            },
            menuSound: {},
            saveGame: null,
            hasSaveGame: false
        }
    },
    created: function () {
        this.menuSound = new Howl({
            src: BlindRPG.sound.item('menu.song'),
            html5: true,
            mobileAutoEnable: true,
            volume: Constants.Sound.MENU_SOUND_VOLUME,
            loop: true
        })
    },
    mounted: function () {
        this.menu.new = BlindRPG.i18n.item('game.menu.new')
        this.menu.continue = BlindRPG.i18n.item('game.menu.continue')
        this.menu.tutorial = BlindRPG.i18n.item('game.menu.tutorial')
        this.menu.credits = BlindRPG.i18n.item('game.menu.credits')
        this.menu.quit = BlindRPG.i18n.item('game.menu.quit')

        this.menuSound.play()
        this.verifySaveGame()
    },
    methods: {
        menuContinueOnClick: function () {
            this.menuSound.stop()
            this.$router.push({name:'scene', params:{
                data:this.saveGame,
                mode:Constants.Game.MODE_CAMPAIGN
            }})
        },
        menuNewOnClick: function () {
            // loads game data in campaign mode (default mode)
            this.loadData(Constants.System.GAME_DATA_FILE, Constants.Game.MODE_CAMPAIGN)
        },
        menuTutorialOnClick: function () {
            // loads game data in tutorial mode
            this.loadData(Constants.System.GAME_TUTORIAL_DATA_FILE, Constants.Game.MODE_CAMPAIGN)
        },
        menuCreditsOnClick: function () {
            this.menuSound.stop()
            this.$router.replace({name: 'credits'})
        },
        menuQuitOnClick: function () {
            this.$root.exit()
        },
        verifySaveGame: function () {
            this.saveGame = BlindRPG.Game.load()

            if(this.saveGame !== null) {
                this.hasSaveGame = true
            }
        },
        loadData: function (url, mode) {
            axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                this.menuSound.stop()
                this.$router.push({name:'scene', params:{
                    data:response.data,
                    mode:mode
                }})
            })
            .catch(() => {
                navigator.notification.alert(
                    BlindRPG.i18n.item('game.error.connection'),
                    null,
                    BlindRPG.i18n.item('game.error.title')
                )
            })
        }
    }
}
</script>

<style lang="css" scoped>
    @@import url("../css/game.main.css");
</style>
