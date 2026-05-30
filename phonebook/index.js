const express = require('express')
const app = express()
const morgan = require('morgan')

const port = 3001

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

morgan.token('body',(req,res)=>{
  return req.method==='POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
  const number = persons.length
  const now = new Date()

  res.send(`Phonebook has info for ${number} person <br>
    ${now}
    `)
})

app.get('/api/persons/:id',(req,res)=>{
  const id = req.params.id
  const person = persons.find(person=>person.id === id)

  if(!person) { 
    return res.status(404).send("Contact not found!")
  }

  res.json(person)
})

app.delete('/api/persons/:id',(req,res)=>{
  const id = req.params.id
  const person = persons.filter(person=>person.id != id)

  res.json(person)
})


app.post('/api/persons',(req,res)=>{
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const nameExist = persons.find(person=>person.name === body.name)

  if(nameExist){
    return res.status(400).json({error: 'name should be unique'})
  }

  const id = Math.floor(Math.random() * 10000)

  const newObject = {
    id: id,
    name: body.name,
    number: body.number
  }

  const updatedPersons = persons.concat(newObject)

  console.log(updatedPersons)

  res.json(newObject)
})

app.listen(port,()=>{
  console.log(`The server is running on http://localhost:${port}`)
})