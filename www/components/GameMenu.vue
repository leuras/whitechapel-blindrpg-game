<template>
    <main class="menu-container" role="main">
        <nav role="navigation">
            <ul role="menu">
                <slot></slot>
            </ul>
        </nav>
    </main>
</template>

<script>
    export default {
        name: 'GameMenu',
        props: {
            'title': {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="css" scoped>
    @import url("../css/game.menu.css");
</style>
