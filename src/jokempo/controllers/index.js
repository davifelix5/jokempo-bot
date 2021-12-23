const challenge = require('./challengeController')
const ranking = require('./rankController')

module.exports = {
    ...challenge,
    ...ranking,
}