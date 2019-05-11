import State from './game.state.js'

import Effects from '../effect/game.effect.js'

export default class EndState extends State {

	constructor (game) {
		super(game)
		this._stopping = false
	}

	update (timestamp) {
		super.update(timestamp)

		if (this._stopping) return

		this._stopping = true

		Effects.fadeOut(this.game.backgroundSound, () => {

    		this.game.backgroundSound.stop()
    		this.game.stop()
			this.game.dispose()

			if (typeof this.game.onEnd === 'function') {
				this.game.onEnd.call(this.game)
			}
    	})
	}
}
