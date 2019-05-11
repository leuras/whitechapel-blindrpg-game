import Game from './core/game.js'
import Constants from './core/game.constants.js'

import ptBR from './lang/bundle.pt-br.js'
import sounds from './resources/sounds.js'

const BlindRPG = {
    Game: Game,
    i18n: {
        language: ptBR,
        languages: [{lang:'pt-br', data: ptBR}],
        item: function (key) {
            let element = this.language.find(obj => obj.key === key)
            return element.value
        },
        changeLanguage: function (lang) {
            this.language = this.languages.find(obj => obj.lang === lang)
        }
    },
    sound: {
        entries: sounds,
        item: function (key) {
            let element = this.entries.find(obj => obj.key === key)
            return Constants.Sound.SYSTEM_SOUND_PATH + element.value
        }
    }
}

export default BlindRPG
