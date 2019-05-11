import Constants from './game.constants.js'

import MenuState from './state/game.menustate.js'
import ReadyState from './state/game.readystate.js'
import PausedState from './state/game.pausedstate.js'
import PlayingState from './state/game.playingstate.js'
import ResumingState from './state/game.resumingstate.js'

require('howler')

const MAX_UPDATE_RATE = 1000/60
const SAVE_POINT = "blindrpg_save_point"

export default class Game {

	constructor (scene, context, options = {}) {

        // public attributes
        this.scene   = scene
        this.context = context

        this.sounds = []
        this.backgroundSound = null

        this.readyState    = new ReadyState(this)
		this.playingState  = new PlayingState(this)
		this.pausedState   = new PausedState(this)
		this.resumingState = new ResumingState(this)

        // private attributes
		this._hnd = 0
		this._states = []
		this._timestamp = 0

		this._queue = scene.narratives

        // events
        this.onPlay        = options.onplay
		this.onPause       = options.onpause
		this.onResume      = options.onresume
		this.onEnd         = options.onend
        this.onEndScene    = options.onendscene
        this.onDecision    = options.ondecision
        this.onInputHandle = options.oninputhandle
        this.onQuit        = options.onquit
        this.onGameOver    = options.ongameover
	}

	run () {
		this.init()
		this.loop()
	}

    init () {
        this.scene.background.volume = this.scene.background.volume || Constants.Sound.BACKGROUND_VOLUME

		this.backgroundSound = this.loadAudio(
            this.scene.background.src,
            this.scene.background.loop,
            this.scene.background.volume,
            false
        )

		this.backgroundSound.play()

		this._states = []
		this.pushState(this.readyState)
	}

	loop (timestamp) {
		this._hnd = window.requestAnimationFrame((t) => this.loop(t))

		let delta = timestamp - this._timestamp

		if (delta > MAX_UPDATE_RATE) {
            this._timestamp = timestamp
			this.state().update(delta)
		}
	}

    pause () {
        this.pushState(this.pausedState)
    }

    resume () {
        this.pushState(this.resumingState)
    }

    quit () {
        this.pushState(new MenuState(this))
    }

    static save (scene) {
        window.localStorage.setItem(SAVE_POINT, JSON.stringify(scene))
    }

    static load () {
        let savePoint = window.localStorage.getItem(SAVE_POINT)
        return (typeof savePoint !== 'undefined') ? JSON.parse(savePoint) : null
    }

	state () {
		return this._states[this._states.length - 1]
	}

	pushState (state) {
		this._states.push(state)
	}

	popState () {
		this._states.pop()
	}

	readQueue () {
		return this._queue.shift()
	}

    hasChoices () {
        return (Array.isArray(this.scene.choices) && this.scene.choices.length > 0)
    }

	loadAudio (src, loop = false, volume = 1, queue = true) {
		let audio = new Howl({
	        src: src,
	        html5: true,
	        mobileAutoEnable: true,
	        volume: volume,
	        loop: loop
	    })

		if (queue) this.sounds.push(audio)

	    return audio
	}

    stop () {
		window.cancelAnimationFrame(this._hnd)
	}

	dispose() {
        if (typeof this.backgroundSound !== 'undefined' && this.backgroundSound !== null) {
            this.backgroundSound.unload()
        }

        this.sounds.forEach((obj) => {
            if (obj.state() !== 'unloaded') {
                obj.unload()
            }
        })

        this.sounds = []
        this.backgroundSound = null
    }
}
