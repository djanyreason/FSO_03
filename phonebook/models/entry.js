const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.PHONEBOOKDB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});

module.exports = mongoose.model('Entry', entrySchema);