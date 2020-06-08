const express = require("express")

const server = express();

// PEGAR O BANCO DE DADOS
const db = require("./database/db")

//CONFIGURAR PASTA PUBLIC
server.use(express.static("public"))

//ABILITAR O USO DO req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))


// UTILIZANDO TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//CONFIGURAR CAMINHOS DA MINHA APLICAÇÃO
//PAGINA INICIAL 
// são as rotas 
server.get("/", (req,res) => {
    return res.render("index.html")
})


// ESTA ROTA PEGA OS DADOS DO FORMULÁRIO
server.get("/create-point", (req,res) => {

    // req query: Query strings da nossa url
    //console.log(req.query)



    return res.render("create-point.html")
})

// usando POST ESTA ROTA PEGA OS DADOS DO FORMULÁRIO
server.post("/savepoint", (req, res) => {
  
   // INSERIR DADOS NO BANCO DE DADOS
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadatrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)



    
})



server.get("/search", (req,res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    // PEGAR OS DADOS DO BANCO DE DADOS
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    })
   
})

// LIGAR O SERVIDOR
server.listen(3000)


