<template lang="html">
    <section class="credits-container">
        <h1>{{ title }}</h1>
        <section class="credits-group" v-for="work in credits">
            <h2 class="credits-on">{{ work.on }}</h2>
            <span class="credits-team" v-for="name in work.team">{{ name }}</span>
        </section>
    </section>
</template>

<script>
    export default {
        name: 'GameCredits',
        data() {
            return {
                title: '',
                credits: []
            }
        },
        mounted: function () {
            this.title = BlindRPG.i18n.item('game.credits.title')
            this.buildCredits()

            // document.addEventListener('backbutton', () => {
            //     this.$router.replace({name: 'main'})
            // }, false)

            this.onBackButtonPressed = () => {
                this.$router.replace({name: 'main'})
            }
        },
        methods: {
            buildCredits: function () {
                this.credits = [
                    {
                        on: BlindRPG.i18n.item('game.credits.work.programming'),
                        team: ['Fernando Libório (Leuras)']
                    },
                    {
                        on: BlindRPG.i18n.item('game.credits.work.music'),
                        team: ['Nicolas Gasparini (Myuu)']
                    },
                    {
                        on: BlindRPG.i18n.item('game.credits.work.visual'),
                        team: ['Fernando Libório (Leuras)']
                    },
                    {
                        on: BlindRPG.i18n.item('game.credits.work.voice'),
                        team: ['Fernando Libório (Leuras)', 'Laís Ramos']
                    },
                    {
                        on: BlindRPG.i18n.item('game.credits.work.specialthanks'),
                        team: ['Carlos Orsi', 'Rafael Carrasco']
                    }
                ]
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.credits.css");
</style>
