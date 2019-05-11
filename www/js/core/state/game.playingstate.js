import State from './game.state.js'

import Effects from '../effect/game.effect.js'

const ONE_MILLISECONDS = 1000

export default class PlayingState extends State {

	constructor (game) {
		super(game)
		this.reset()

        this._audio = null
	}

	update (timestamp) {

        if (this._audio !== null && this._audio.playing())
            console.log(this._audio.seek())

		if (this._loading) return

		this._delay -= timestamp
		if (this._delay <= 0) {
			this.play()
		}
	}

	play() {

		this._loading = true

        let volume = this.narrative.volume || 1
		let audio  = this.game.loadAudio(this.narrative.src, this.narrative.loop, volume)

		audio.once('play', (id) => {

			this._delay = (this.narrative.async) ? this.narrative.delay : this.narrative.delay + (audio.duration() * ONE_MILLISECONDS)
            Effects.vibrate(this.narrative.vibrate)

			// Go back to the previous state. Can be Ready or Interaction.
			this.game.popState()

            if (typeof this.game.onPlay === 'function') {
    			this.game.onPlay.call(this.game, this.narrative)
    		}

            console.log('*** ' + this.narrative.src)

			this.narrative = null
			this._loading  = false
		})

		audio.once('end', (id) => {
            audio.unload()

            console.log('//-- ended')
		})

		audio.play()

        this._audio = audio
	}

    reset () {
        super.reset()

        this._delay = 0
		this._loading = false

        this.narrative = null
    }
}
