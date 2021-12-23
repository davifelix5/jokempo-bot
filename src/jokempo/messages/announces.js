const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZY199OBzS7khmT3BaCWkFzeqkck3HMH-Rg&usqp=CAU'

const thumbnail = {
    thumnail: {
        url,
    },
}

const base = {
    color: '#00B295',
    author: {
        name: 'Jokempo Bot',
        icon_url: url
    },
    footer: {
        text: 'Digite .jokempo para ajuda\n© Davi Félix'
    }
}

module.exports = {

    announceChallange: (challenger, challenged) => {
        return {
            ...base,
            title: 'Ocorreu um desafio!',
            thumbnail,
            description: `Atenção, ${challenged}! ${challenger} te desafiou para um jogo`,
            fields: [
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Para aceitar',
                    value: '.jokempo accept <mencionar desafiante> <sua jogada>',
                },
                {
                    name: 'Para recusar',
                    value: '.jokempo refuse <mencionar desafiante>',
                },
                {
                    name: 'Caso o desanfiante desista do desafio',
                    value: '.jokempo cancel',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            ]
        }
    },

    announceResults: (winner, looser, winningPlay, loosingPlay) => {
        return {
            ...base,
            title: `Resultados do jogo`,
            description: `${winner} ganhou!`,
            thumbnail,
            fields: [
                {
                    name: 'Jogador 1',
                    value: `${winner}\n${winningPlay}`,
                    inline: true
                },
                {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true
                },
                {
                    name: 'Jogador 2',
                    value: `${looser}\n${loosingPlay}`,
                    inline: true
                },
            ]
        }
    },

    announceDraw: (player1, player2, play) => {
        return {
            ...base,
            title: `Resultados do jogo`,
            description: `Houve um empate. Ambos jogaram ${play}`,
        }
    },

    announceCancel: (challenger, challenged) => {
        return {
            ...base,
            title: 'Alguém arregou! 🐔',
            description: `${challenger} cancelou o desafio contra ${challenged}`
        }
    },

    announceRefuse: (challenger, challenged) => {
        return {
            ...base,
            title: 'Alguém arregou! 🐔',
            description: `${challenged} recusou o desafio de ${challenger}`
        }
    },

    tutorial: () => {
        return {
            color: '#00B295',
            author: {
                name: 'Jokempo Bot',
                icon_url: url
            },
            description: 'Lista dos principais comandos para você começar a jogar',
            fields: [
                {
                    name: 'Para desafiar alguém',
                    value: '.jokempo challenge <mencionar adversário> <sua jogada>'
                },
                {
                    name: 'Para ver as opções de ranking',
                    value: '.jokempo rank help'
                }
            ],
            footer: {
                text: 'OBS: Os símbolos < e > não são necessários nos comandos'
            }
        }
    }

}