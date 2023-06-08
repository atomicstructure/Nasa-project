const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const {
  loadPlanetsData 
} = require('./models/planets.model')
const PORT = process.env.PORT || 8000
const MONGO_URL = 'mongodb+srv://ogundarearnold:jSRAyKqnLya8YRd2@nasa-project.h87rnyc.mongodb.net/nasa-project?retryWrites=true&w=majority'
const server = http.createServer(app)

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready...')
});
mongoose.connection.on('error', err => {
  console.error(err);
})
async function serverStarts(){
  await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
  });
  await loadPlanetsData();

  server.listen(PORT, () => {
    /*Note that you can also use app.listen here which wont use the http method*/
    console.log(`Server listening on port ${PORT}`)
  })
}
serverStarts();