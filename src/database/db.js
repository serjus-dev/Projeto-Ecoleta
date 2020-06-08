// IMPORTAR A DEPENDENCIA DO SQLITE 3

const sqlite3 = require("sqlite3").verbose()

// CRIAR O OBEJTO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS 

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db



// ABAIXO FORAM SÓ EXEMPLOS DE DE TESTE DE OPERAÇÕES NO DB
// utilizar o objeto de banco de dados, para nossas operações 

db.serialize(() => {
    //CRIAR TABELA COM SQL


    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT

        );

    `) 

})
