import State from './game.state.js'
import PausedState from './game.pausedstate.js'

export default class ResumingState extends State {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)

		// Removes resuming state
		this.game.popState()

		// The current state must be paused state
		if (this.game.state() instanceof PausedState) {
			this.game.backgroundSound.play()
			this.game.sounds.forEach((obj) => {
	            if (obj.state() === 'loaded' && !obj.playing()) {
	            	obj.play()
	            }
	        })

			this.game.popState()

			if (typeof this.game.onResume === 'function') {
				this.game.onResume.call(this.game)
			}
		}
	}
}
