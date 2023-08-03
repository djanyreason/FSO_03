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
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: [
      {
        validator: (theNumber) => {
          return theNumber.length >= 8;
        },
        message: reject => `Phone number ${reject.value} is too short, minimum size is 8 characters`
      },
      {
        validator: (theNumber) => {
          const dash = theNumber.search('-');

          const checkStr = (str) => {
            return str.split('').reduce((check, digit) =>
              (check && ((1 + parseInt(digit)) ? true : false)), true);
          };

          return dash >= 2 &&
            dash <= 3 &&
            checkStr(theNumber.substring(0,dash)) &&
            checkStr(theNumber.substring(dash+1,theNumber.length));

        },
        message: reject => `Phone number ${reject.value} is not correctly formatted`
      }
    ],
    required: true
  }
});

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Entry', entrySchema);