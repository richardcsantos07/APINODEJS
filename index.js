// config inicial chamar o express vai procurar o módulo

const express = require('express')

const app = express() // Inicializar as apps


//forma de ler JSON UTILIZAR MIDDLEWARES

app.use( //criando o MIDDLEWARES

express.urlencoded({

extended: true,

}),

)


app.use(express.json())


//rota inicial GET pegar algo so servidor endpoint

app.get('/', (req, res) => {


//mostrar requisição mostrar a resposta que vai ser JSON

res.json({ message: 'Oi Express meu nome é Richard'})

})

//entregar a porta

app.listen(3000)