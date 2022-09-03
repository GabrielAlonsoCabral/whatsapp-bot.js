const mongoose = require('mongoose');

const DatabaseHelper = {
async open (uri) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async close () {
    await mongoose.disconnect();
  }
};

module.exports = DatabaseHelper;