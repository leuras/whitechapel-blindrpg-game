import InputType from './game.inputtype.js'

export default class TalkInputType extends InputType {

	constructor (game, text) {
        super(game)
        this.text = text
    }

	execute () {
        this.game.playingState.reset()
        this.game.popState()
    }
}
