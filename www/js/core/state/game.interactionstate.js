import BlindRPG from '../../blindrpg.js'
import InputState from './game.inputstate.js'

export default class InteractionState extends InputState {

	constructor (game, input) {
		super(game)
        this._input = input
	}

	update (timestamp) {
		super.update(timestamp)
	}

    wait () {
        this._waiting = ! this.game.sounds.find((obj) => obj.playing())
    }

    notify () {
        if (this._waiting) {
            
            this.game.loadAudio(BlindRPG.sound.item('choose.notification'), false, 1, false).play()

            if (typeof this.game.onInputHandle === 'function') {
                this.game.onInputHandle.call(this.game, this._input)
            }
        }
    }
}
