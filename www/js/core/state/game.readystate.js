import State from './game.state.js'
import EndState from './game.endstate.js'
import EndSceneState from './game.endscenestate.js'
import DecisionState from './game.decisionstate.js'
import GameOverState from './game.gameoverstate.js'
import InteractionState from './game.interactionstate.js'

import InputTypeFactory from '../input/game.inputtypefactory.js'

export default class ReadyState extends State {

	constructor (game) {
		super(game)
	}

	update (timestamp) {
		super.update(timestamp)

		let narrative = this.game.readQueue()

		if (typeof narrative !== 'undefined' && narrative !== null) {

            // this narrative has an interaction?
            if (typeof narrative.input !== 'undefined') {

                let input = InputTypeFactory.factory(this.game, narrative.input)

                if (input != null) {
                    // Creates an interaction state with your respective input
                    this.game.pushState(new InteractionState(this.game, input))
                }
            }

            // Sets the narrative
            this.game.playingState.narrative = narrative

            // Ready to play ... wait
            this.game.pushState(this.game.playingState)
        } else {

            let audioPlaying = this.game.sounds.find(obj => obj.playing())

            if (typeof audioPlaying === 'undefined') {
                if (this.game.hasChoices()) {

                    let choices = this.game.scene.choices

                    if (choices.length === 1 && choices[0].auto) {
                        // Has only one choice with autoplay enabled
                        this.game.pushState(new EndSceneState(this.game))
                    } else {
                        // Has one or more choices to interact
                        this.game.pushState(new DecisionState(this.game))
                    }
                } else {

                    let isGameOver = this.game.scene.gameover || false
                    let state = (isGameOver) ? new GameOverState(this.game) : new EndState(this.game)

                    this.game.popState()
    				this.game.pushState(state)
                }
            }
        }
	}
}
