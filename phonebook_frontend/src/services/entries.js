import axios from 'axios';
//const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data);
}

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data);
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data);
};

const phonebookService = { 
  getAll, 
  create, 
  remove,
  update
};

export default phonebookService