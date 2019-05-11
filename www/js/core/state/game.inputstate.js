import State from './game.state.js'

export default class InputState extends State {

    constructor (game) {
        super(game)
        this._waiting = false
    }

    update (timestamp) {
        super.update(timestamp)

        if (this._waiting) return

        this.wait()
        this.notify()
    }

    wait () {}

    notify () {}

    timeover () {}
}
