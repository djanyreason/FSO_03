const express = require('express');
const app = express();

app.use(express.json());

let entries = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.json(entries);
});

app.get('/info', (request, response) => {
  const now = Date();
  const size = entries.length;
  response.send(`<p>Phonebook has info for ${size} people</p>
    <p>${now}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const entry = entries.find(entry => entry.id === Number(request.params.id));

  entry ? response.json(entry) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
  entries = entries.filter(entry => entry.id !== Number(request.params.id));

  response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});