const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://ogundarearnold:jSRAyKqnLya8YRd2@nasa-project.h87rnyc.mongodb.net/nasa-project?retryWrites=true&w=majority'


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready...')
  });
  mongoose.connection.on('error', err => {
    console.error(err);
  })


  async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
      });
  }

  async function disconnectMongoose() {
    await mongoose.disconnect();
  }
  module.exports = {
    mongoConnect,
    disconnectMongoose,
  }