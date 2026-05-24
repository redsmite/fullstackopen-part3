const express = require('express')
const app = express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request,response)=>{
  response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
  const id = request.params.id
  const note = notes.find(n=>n.id===id)
  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id',(request,response)=>{
  const id = request.params.id
  const note = notes.filter(n=>n.id!=id)
  
  response.status(204).end()
  response.json(note)
})

app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0 ?
  Math.max(...notes.map(n=>n.id))
  : 0

  return String(maxId + 1)
}

app.post('/api/notes/',(request,response)=>{
  const body = request.body

  if(!request.body){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content : body.content,
    important: body.important || false,
    id: generateId() 
  }

  notes = notes.concat(note)

  console.log(notes)

  response.json(notes)
})

const PORT = 3001

app.listen(PORT)

console.log(`Server running on Port http://127.0.0.1:${PORT}`)