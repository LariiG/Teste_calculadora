const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Calculadora {
    adiciona(calculadora, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM')
        const nomeEhValido = calculadora.nome.length >= 5
        const denominadorValido = calculadora.operacao != 'erro'

        const validacoes = [
            {
                nome: 'Denominador Inválido',
                valido: denominadorValido,
                mensagem: 'Denominador igual ou menor a zero!'
            },
            {
                nome: 'nome',
                valido: nomeEhValido,
                mensagem: 'Nome deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const calculadoraDatado = {...calculadora, dataCriacao}

            const sql = 'INSERT INTO Calculadora SET ?'
    
            conexao.query(sql, calculadoraDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(calculadora)
                }
            })
        }
       
    }

    lista(res) {
        const sql = 'SELECT * FROM Calculadora'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Calculadora WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(calculadora)
            }
        })
    }

    altera(id, valores, res) {

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Calculadora WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Calculadora