const rankServices = require('../services/ranking')

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZY199OBzS7khmT3BaCWkFzeqkck3HMH-Rg&usqp=CAU'

const base = {
    color: '#00B295',
    thumbnail: {
        url,
    },
    title: 'Ranking',
    author: {
        name: 'Jokempo Bot',
        icon_url: url
    },
}

module.exports = {

    announceRank: (column, rank, page, pages, asc, totalCount) => {
        const columns = {
            'wins': 'Vitórias',
            'losses': 'Derrotas',
            'draws': 'Empates',
            'refused': 'Jogos rejeitados',
        }
        const rankKeys = ['wins', 'losses', 'draws', 'refused']
        const mapUser = user => rankKeys.map(key => [columns[key], user[key]].join(': ')).join('\n')
        const getRankPosition = index => ((page - 1) * rankServices.pageSize) + (index + 1)
        const getRankPositionAsc = index => totalCount - ((page - 1) * rankServices.pageSize - index)
        const fields = rank.map((user, index) => {
            return {
                name: `${asc ? getRankPositionAsc(index) : getRankPosition(index)}º ${user.nickname}`,
                value: mapUser(user)
            }
        })

        return {
            ...base,
            description: `Ranking para a categoria **${columns[column]}**\nUse as reações pra mudar de página`,
            fields,
            footer: {text: `Página ${page}/${pages}\n© Davi Félix`}
        }
    },

    rankHelp: () => {
        return {
            ...base,
            description: 'Manual para usar o função **.jokempo rank**',
            fields: [
                {
                    name: '*.jokempo rank wins* ou *.jokempo rank*',
                    value: 'Mostra os jogadores ordenador por número de vitórias'
                },
                {
                    name: '.jokempo rank *draws*',
                    value: 'Mostra os jogadores ordenador por número de empates',
                    inline: true
                },
                {
                    name: '.jokempo rank *losses*',
                    value: 'Mostra os jogadores ordenador por número de derrotas'
                },
                {
                    name: '.jokempo rank *rejections*',
                    value: 'Mostra os jogadores ordenador por número de jogos rejeitados',
                    inline: true,
                },
                {
                    name: 'Parâmetro "asc"',
                    value: 'Faz o rank ser ordenado em ordem crescente. Ao usar o *asc* é preciso especificar a categoria do rank.\nExemplo: **.jokempo rank wins asc**'
                }
            ]
        }
    }

}