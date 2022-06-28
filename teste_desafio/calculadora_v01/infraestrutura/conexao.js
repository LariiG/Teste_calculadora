const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '172.17.0.1',
    port: 3306,
    user: 'suporte',
    password: 'Ruby@2022',
    database: 'calculadora'
})

module.exports = conexao