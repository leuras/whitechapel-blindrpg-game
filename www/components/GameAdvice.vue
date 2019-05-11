<template lang="html">
    <section class="advice-container">
        <span class="advice-icon">
            <i class="fas fa-headphones-alt"></i>
        </span>
        <span class="advice-message">{{ advice }}</span>
        <button type="button" class="btn-advice" @click="btnContinueOnClick">{{ button.continue }}</button>
    </section>
</template>

<script>
export default {
    name: 'GameAdvice',
    data() {
        return {
            advice: '',
            button: {
                continue: ''
            }
        }
    },
    mounted: function () {
        this.advice = BlindRPG.i18n.item('game.advice.message')
        this.button.continue = BlindRPG.i18n.item('game.advice.button.continue')
    },
    methods: {
        btnContinueOnClick: function () {
            this.$router.replace({name:'main'})
        }
    }
}
</script>

<style lang="css" scoped>
    @import url("../css/game.advice.css");
</style>
