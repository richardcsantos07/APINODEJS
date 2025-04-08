// config inicial chamar o express vai procurar o módulo

const express = require('express')

const app = express() // Inicializar as apps

// depois do db
const mongoose = require('mongoose')

const Person = require ('./models/Person')


//forma de ler JSON UTILIZAR MIDDLEWARES

app.use( //criando o MIDDLEWARES

express.urlencoded({

extended: true,

}),

)


app.use(express.json())

app.post('/person', async (req,res) => {
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {   
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso'})
    }catch (error){
        res.status(500).json({ erro: error })
    }    
})

// GET - Retornar todas as pessoas
app.get('/person', async (req, res) => {
    try {
      const people = await Person.find()
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  })

  // GET por ID
app.get('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const person = await Person.findById(id)
  
      if (!person) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  })
  
  // PUT - Atualizar pessoa
app.put('/person/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  })
  
  // DELETE - Remover pessoa
app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const deletedPerson = await Person.deleteOne({ _id: id })
  
      if (deletedPerson.deletedCount === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
  
      res.status(200).json({ message: 'Usuário removido com sucesso' })
    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  })
  
  


//rota inicial GET pegar algo so servidor endpoint
/*
app.get('/', (req, res) => {


//mostrar requisição mostrar a resposta que vai ser JSON

res.json({ message: 'Oi Express meu nome é Richard'})

})
*/
mongoose.connect('mongodb://localhost:27017/Arquivo')
    .then(() => {
        console.log('Conectado ao Banco!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


