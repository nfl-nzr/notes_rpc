var mongoose = require('mongoose');  
var UserProfileSchema = new mongoose.Schema({
  userId: String,  
  firstName: String,
  lastName: String,
  address: String
});
mongoose.model('UserProfile', UserProfileSchema);

module.exports = mongoose.model('UserProfile');