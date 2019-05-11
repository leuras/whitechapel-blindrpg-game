import State from './game.state.js'

export default class PausedState extends State {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)

		let dispatchEvent = false

        if (this.game.backgroundSound.playing()) {
            this.game.backgroundSound.pause()
            dispatchEvent = true
        }

		this.game.sounds.forEach((obj) => {
            if (obj.playing()) {
            	obj.pause()
            	dispatchEvent = true
            }
        })

		if (dispatchEvent && typeof this.game.onPause === 'function') {
			this.game.onPause.call(this.game)
		}
	}
}
