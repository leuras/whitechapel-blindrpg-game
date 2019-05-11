import BlindRPG from '../../blindrpg.js'
import InputState from './game.inputstate.js'

export default class DecisionState extends InputState {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)
	}

    wait () {
        this._waiting = true
    }

    notify () {
        this.game.loadAudio(BlindRPG.sound.item('choose.notification'), false, 1, false).play()

        if (typeof this.game.onDecision === 'function') {
            this.game.onDecision.call(this.game, this.game.scene.choices)
        }
    }
}
