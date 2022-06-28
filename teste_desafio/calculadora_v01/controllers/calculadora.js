const Calculadora = require('../models/calculadora')



module.exports = app => {
    app.get('/calculadora', (req, res) => {
        Calculadora.lista(res)
    })

    app.get('/calculadora/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Calculadora.buscaPorId(id, res)
    })

    app.post('/calculadora/soma', (req, res) => {
       const calculadora = req.body
       calculadora.operacao = "Soma"
       calculadora.resultado = parseFloat(calculadora.numero_1) + parseFloat(calculadora.numero_2)
       Calculadora.adiciona(calculadora, res)
    })

    app.post('/calculadora/sub', (req, res) => {
        const calculadora = req.body
        calculadora.operacao = "Subtração"
        calculadora.resultado = parseFloat(calculadora.numero_1) - parseFloat(calculadora.numero_2)
        Calculadora.adiciona(calculadora, res)
     }) 

     app.post('/calculadora/multi', (req, res) => {
        const calculadora = req.body
        calculadora.operacao = "Multiplicação"
        calculadora.resultado = parseFloat(calculadora.numero_1) * parseFloat(calculadora.numero_2)
        Calculadora.adiciona(calculadora, res)
     }) 

    app.post('/calculadora/div', (req, res) => {
        const calculadora = req.body
        calculadora.operacao = "Divisão"
        if (calculadora.numero_2 > 0){
            calculadora.resultado = parseFloat(calculadora.numero_1) / parseFloat(calculadora.numero_2)
        }else{
            calculadora.operacao = "erro"
        }
        Calculadora.adiciona(calculadora, res)
     }) 

}