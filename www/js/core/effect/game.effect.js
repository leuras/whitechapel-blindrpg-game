import Constants from '../game.constants.js'

export default class Effects {

    static vibrate (timer) {
        if (window.isMobile && typeof timer !== 'undefined') {
            navigator.vibrate(timer)
        }
    }

    static fadeOut (sound, complete) {
        let duration = sound.delay || Constants.Sound.BACKGROUND_DELAY

        if (sound.playing()) {
            sound.loop(false)

            if (typeof complete === 'function') {
            	sound.once('fade', complete)
            }

            sound.fade(sound.volume(), 0, duration)
        }
    }
}
