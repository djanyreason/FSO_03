const mongoose = require('mongoose');

if (process.argv.length<3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://djanyreason:${password}@jfa-fso.vjbbcyf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model('Entry', entrySchema);

if(process.argv.length === 3) {
  console.log('phonebook:');
  Entry.find({})
    .then(result => {
      result.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`);
      })
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4]
  });
  entry.save().then(result => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Incorrect number of arguments");
  mongoose.connection.close();
}