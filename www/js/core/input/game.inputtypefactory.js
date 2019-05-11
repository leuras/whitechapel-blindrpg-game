import TalkInputType from './game.talkinputtype.js'

export default class InputTypeFactory {

    static factory (game, input) {
        if (input.type === 'TalkInputType') {
            return new TalkInputType(game, input.text)
        }

        return null
    }
}
