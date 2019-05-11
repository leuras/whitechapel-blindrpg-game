import State from './game.state.js'

import Constants from '../game.constants.js'

export default class GameOverState extends State {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)

        this.game.backgroundSound.volume(Constants.Sound.BACKGROUND_VOLUME_LOW)
        this.game.stop()

        if (typeof this.game.onGameOver === 'function') {
            this.game.onGameOver.call(this.game)
        }
	}
}
