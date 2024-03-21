This repository is for exercises in Part 3 of Full Stack Open (FSO), "Programming a server with NodeJS and Express" - https://fullstackopen.com/en/part3

The exercises in this part build a back-end server to connect to the phonebook project front-end developed in Part 2. The code for the front-end is in the subfolder '/phonebook_frontend', but was not developed as a part of this project. All of the new code is stored in the subfolder '/phonebook'.

The exercises for this part build a back-end server with NodeJS and Express. The exercises also involve deploying the full-stack application to the web through fly.io, and fetching and saving phonebook data in a MongoDB database. Login information to connect to the fly.io deployment and the MongoDB database are not included in this repository. Other topics relevant to this project include using nodemon for backend development, testing using Postman and the VSC REST client, developing middleware and ensuring the correct order of insertion, CORS, and linting.

The back-end of the application features an API that handles the following calls in the following manners:
* GET /info - returns date and number of entries in phonebook
* GET /api/persons - returns all entries
* GET /api/persons/:id - returns a single entry for id, or a 404 error if no such entry
* DELETE /api/persons/:id - deletes a single entry for id and returns 200, or returns 400 if no such entry
* POST /api/persons - if a new entry object is included as part of the request, adds the entry to the phonebook and returns the new entry
* PUT /api/persons/:id - updates the name and phone number for id with data included in the request

The front-end of the full-stack application displays a users contact list with names and phone numbers, along with the ability to search/filter the entries, add new entries, and delete entries.
