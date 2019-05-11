import State from './game.state.js'
import PausedState from './game.pausedstate.js'

export default class MenuState extends State {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)

        // Removes menu state
		this.game.popState()

		// The current state must be paused state
		if (this.game.state() instanceof PausedState) {
            this.game.backgroundSound.stop()
    		this.game.stop()
    		this.game.dispose()

            if (typeof this.game.onQuit === 'function') {
                this.game.onQuit.call(this.game)
            }
        }
	}
}
