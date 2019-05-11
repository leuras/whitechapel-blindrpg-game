import State from './game.state.js'

import Effects from '../effect/game.effect.js'

export default class EndSceneState extends State {

	constructor (game) {
		super(game)
		this._ending = false
	}

	update (timestamp) {
		super.update(timestamp)

		if (this._ending) return

		this._ending = true

		Effects.fadeOut(this.game.backgroundSound, () => {

            let choice = this.game.scene.choices.shift()

            this.game.backgroundSound.stop()
    		this.game.stop()
            this.game.dispose()

			if (typeof this.game.onEndScene === 'function') {
				this.game.onEndScene.call(this.game, choice.value)
			}
    	})
	}
}
