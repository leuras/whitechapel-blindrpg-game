// JavaScript Libraries
import Vue from 'vue'
import VueRouter from 'vue-router'

import BlindRPG from './blindrpg.js'

Vue.use(VueRouter)

window.BlindRPG = BlindRPG

const Application = {
    initialize: function () {
        this.bindEvents()
    },
    bindEvents: function () {
        document.addEventListener('deviceready', () => {
            // Detect whether is a mobile device
            window.isMobile = device.platform.match(/android|ios/i) ? true : false

            // Turn on keep awake
            window.plugins.insomnia.keepAwake()

            // Look for screen reader
            if (window.isMobile) {
                window.MobileAccessibility.isScreenReaderRunning((value) => {
                    window.isScreenReaderRunning = value
                    this.setupVue()
                })
            } else {
                window.isScreenReaderRunning = false
                this.setupVue()
            }
        }, false)
    },
    setupVue: function() {
        // Routes
        const routes = [
            { name: 'advice', path: '/', component: require('../components/GameAdvice.vue').default },
            { name: 'main', path: '/main', component: require('../components/GameMain.vue').default },
            { name: 'credits', path: '/credits', component: require('../components/GameCredits.vue').default },
            { name: 'scene', path: '/scene', component: require('../components/GameScene.vue').default, props: true }
        ]

        const router = new VueRouter({
            routes: routes
        })

        // App instance
        const app = new Vue({
            router,
            mounted: function () {
                // configure back button behavior
                document.addEventListener('backbutton', () => {
                    switch (this.$route.path) {
                        case '/':
                            navigator.app.exitApp()
                            break;
                        case '/main':
                            Application.close()
                            break;
                        default:
                            this.$router.replace({name: 'main'})
                    }
                }, false)
            },
            methods: {
                exit: function () {
                    Application.close()
                }
            }
        }).$mount('#app')
    },
    close: function () {
        let title   = BlindRPG.i18n.item('game.confirmation.quit.title')
        let message = BlindRPG.i18n.item('game.confirmation.quit.message')

        navigator.notification.confirm(message, (source) => {
            if (source === 1 ) navigator.app.exitApp()
        }, title, [BlindRPG.i18n.item('game.button.yes'), BlindRPG.i18n.item('game.button.no')])
    }
}

Application.initialize()
