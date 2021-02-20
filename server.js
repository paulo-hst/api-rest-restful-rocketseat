const express = require('express')
const app = express()
const data = require('./data.json')

app.use(express.json())

// Dados Fake: http://jsonplaceholder.typicode.com/users
// Métodos HTTP: GET, POST, PUT e DELETE

app.get("/clients", (request, response) => {
    response.json(data)
})

app.get("/clients/:id", (request, response) => {
    const { id } = request.params
    const client = data.find(cli => cli.id == id)

    // Quando não existir usuário no ID pesquisado, retornar status 204
    if(!client) return response.status(204).json()

    response.json(client)
})

app.post("/clients", (request, response) => {
    const { name, email } = request.body

    response.json({ name, email })
})

app.put("/clients/:id", (request, response) => {
    const { id } = request.params
    const client = data.find(cli => cli.id == id)

    if(!client) return response.status(204).json()
    const { name, email } = request.body
    client.name = name    
    response.json(client)
    
})

app.delete("/clients/:id", (request, response) => {
    const { id } = request.params
    const clientsFiltered = data.filter(client => client.id != id)

    response.json(clientsFiltered)
    
})

app.listen(3000, () => {
    console.log('Servidor rodando!')
})