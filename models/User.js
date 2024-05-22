const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  }
});


UserSchema.statics.findOrCreate = async function(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
  };
  
module.exports = mongoose.model('User', UserSchema);
