const url = 'https://cdn.discordapp.com/app-icons/806475125959688213/0e836e108d0a7b026b6c5ee0c00b0335.png?size=64'

module.exports = {

    announceError: (message) => {
        return {
            color: '#D05353',
            title: 'Ocorreu um erro ❌',
            description: message,
        }
    },

    announceWarning: (message) => {
        return {
            color: '#D05353',
            title: 'Atenção ✋',
            description: message,
        }
    },

    announceSuccess: (message) => {
        return {
            color: '#00B295',
            title: 'Operação feita com sucesso ✅',
            description: message,
        }
    },

    tutorial: () => {
        return {
            color: '#00B295',
            author: {
                name: 'Games Bot',
                icon_url: url
            },
            description: 'Lista dos principais comandos para você começar a jogar',
            fields: [
                {
                    name: 'Para se registrar',
                    value: '.auth',
                },
                {
                    name: 'Para jogar Jokempo',
                    value: '.jokempo'
                },
            ],
            footer: {
                text: 'Davi Félix ©'
            }
        }
    }

}
