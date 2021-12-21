module.exports = {
    '.jokempo': require('./jokempo'),
    '.sum': {
        index(message, args) {
            const areAllNumbers = args.every(item => !isNaN(item))
            
            if (!areAllNumbers)
                return message.channel.send('[ATENÇÃO] Argumentos inválidos!')
            
            const sum = args.map(item => +item).reduce((acc, item) => acc += item)
            message.channel.send(`A soma dos números que você digitou é ${sum}`)
        },
    },
    '.fatorial': {
        operation: '',

        index(message, args) {
            const [number] = args
            if (number > 100)
                return message.channel.send('Operação muito grande! Sou preguiçoso')
            const result = this.factorial(number)
            message.channel.send(this.operation + result)
            this.operation = ''
        },

        factorial(number) {
            if (number == 1) {
                this.operation += '1 = '
                return number
            }
            this.operation += `${number} x `
            return number * this.factorial(number-1)
        }
    },
    '.multiplicar': {
        index(message, args) {
            const multiplicacao = args
                .map(item => Number(item))
                .reduce((acc, item) => item * acc)
            message.channel.send(`O resultado é ${multiplicacao}`)
        }
    },
    '.inverter': {
        index(message, args) {
            const palavra = args.join(' ')
            let novaPalavra = '';
            for (let c=palavra.length-1; c >= 0; c--)
                novaPalavra += palavra[c]
            message.channel.send(`A palavra "${palavra}" invertida é "${novaPalavra}"`)
        }
    },

}