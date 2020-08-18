const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Student = new Schema({
   name: {
      type: String
   },
   lastName: {
    type: String
   },
   email: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   address: {
    type: String
   },
   photo: {
    type: String
   }
}, {
   collection: 'students'
})

module.exports = mongoose.model('Student', Student)