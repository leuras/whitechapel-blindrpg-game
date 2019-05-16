const mix = require('laravel-mix');

mix.options({
    processCssUrls: false
})

mix.js('www/js/app.js', 'www/assets/js/app.min.js')

mix.styles([
    'node_modules/@fortawesome/fontawesome-free/css/solid.css',
    'node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
    'node_modules/animate.css/animate.min.css'
], 'www/assets/css/vendor.css')

mix.styles(['www/css/app.css'], 'www/assets/css/app.min.css')

mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.*', 'www/assets/webfonts')
mix.copyDirectory('www/img', 'www/assets/img')

mix.extract(['vue', 'vue-router', 'axios', 'howler'])
