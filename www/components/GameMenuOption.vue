<template>
    <li role="menuitem" tabindex="0" :aria-label="text" class="menu-option" @click="menuOptionOnClick">
        <span class="menu-option-text">
            {{ text }}
        </span>
    </li>
</template>

<script>
    export default {
        name: 'GameMenuOption',
        props: {
            'text': {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {
            menuOptionOnClick: function () {
                this.$emit('on-click')
            }
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.menuoption.css")
</style>
