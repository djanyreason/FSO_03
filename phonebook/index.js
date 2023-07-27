const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('postData', (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let entries = [
  {
    "name": "Aaron Donefuckedupnow",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Buh La'Kay",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dee Nice",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Jay Quellan",
    "number": "39-23-6423122",
    "id": 4
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
});

app.post('/api/persons', (request, response) => {
  if(!request.body.name || !request.body.number) {
    return response.status(400).json({error: 'content missing'});
  }

  if(entries.reduce(((check, entry) => 
    entry.name.toLowerCase() === request.body.name.toLowerCase() ?
    true : check), false)) {
      return response.status(400).json({error: 'name must be unique'});
  }

  const entry = {
    name: request.body.name,
    number: request.body.number,
    id: Math.floor((Math.random() * 1000000) + 1)
  };

  entries = entries.concat(entry);

  response.json(entry);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});