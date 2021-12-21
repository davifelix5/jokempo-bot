const challenge = require('./challengeController')
const register = require('./registrationContoller')
const ranking = require('./rankController')

module.exports = {
    actionList: [
        ...Array.from(Object.keys(challenge)).filter(key => !key.includes('Validate')),
        ...Array.from(Object.keys(register)).filter(key => !key.includes('Validate')),
        ...Array.from(Object.keys(ranking)).filter(key => !key.includes('Validate')),
    ],
    ...challenge,
    ...register,
    ...ranking,
}