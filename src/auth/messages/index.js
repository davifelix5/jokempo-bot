const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkPlOhVJ9iEblFpU4KuJwJtUX8RQjxV7ZyQ&usqp=CAU'

const base = {
    color: '#00B295',
    author: {
        name: 'Authentication',
        icon_url: url
    },
    footer: {
        text: 'Digite .auth para ajuda\n© Davi Félix'
    }
}


module.exports = {
  aksUnregisterConfirmation: () => {
    return {
        ...base,
        title: 'Apagar usuário 😢',
        description: 'Ao apagar o seu usuário, todos os seus dados de jogos anteriores',
        fields: [
            {
                name: '\u200B',
                value: '\u200B',
                inline: true
            },
            {
                name: 'Para confirmar',
                value: '.auth unregister'
            },
            {
                name: 'Para cancelar a operação',
                value: '.auth unregister cancel'
            },
            {
                name: '\u200B',
                value: '\u200B',
                inline: true
            },
        ]

    }
  },
  
  tutorial: () => {
    return {
        color: '#00B295',
        author: {
            name: 'Autenticação',
            icon_url: url
        },
        description: 'Lista dos principais comandos para você começar a jogar',
        fields: [
            {
                name: 'Para se cadastrar',
                value: '.auth register <nickname> '
            },
            {
                name: 'Para se descadastrar',
                value: '.auth unregister'
            }
        ],
        footer: {
            text: 'OBS: Os símbolos < e > não são necessários nos comandos'
        }
    }
  }
}