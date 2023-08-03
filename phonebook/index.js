require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Entry = require('./models/entry');

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('postData', (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.get('/api/persons', (request, response) => {
  Entry.find({})
    .then(notes => {
      response.json(notes);
    });
});

app.get('/info', (request, response) => {
  const now = Date();
  Entry.find({})
    .then(notes => {
      const size = notes.length;
      response.send(`<p>Phonebook has info for ${size} people</p>
      <p>${now}</p>`);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then(entry => {
      if(entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => response.status(400).send({error: 'malformatted id'}));
});

app.post('/api/persons', (request, response, next) => {
  /*if(entries.reduce(((check, entry) => 
    entry.name.toLowerCase() === request.body.name.toLowerCase() ?
    true : check), false)) {
      return response.status(400).json({error: 'name must be unique'});
  }*/

  const entry = new Entry({
    name: request.body.name,
    number: request.body.number
  });

  entry.save()
    .then(newEntry => response.json(entry))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const update = {
    name: request.body.name, 
    number: request.body.number 
  };

  Entry.findByIdAndUpdate(request.params.id, update, 
    {new: true, runValidators: true, context: 'query'})
    .then(updatedEntry => {
      response.json(updatedEntry);
    })
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});