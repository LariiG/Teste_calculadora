class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarCalculadora()
    }

    criarCalculadora() {
        const sql = 'CREATE TABLE IF NOT EXISTS Calculadora (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, numero_1 float NOT NULL, numero_2 float NOT NULL, operacao varchar(50) NOT NULL, resultado float NOT NULL, dataCriacao datetime NOT NULL, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Calculadora criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas