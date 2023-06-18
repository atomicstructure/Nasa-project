const http = require('http')
const app = require('./app')
const {
  mongoConnect
} = require('./services/mongo')
const {
  loadPlanetsData 
} = require('./models/planets.model')
const PORT = process.env.PORT || 8000
const server = http.createServer(app)

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready...')
});
mongoose.connection.on('error', err => {
  console.error(err);
})
async function serverStarts(){
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    /*Note that you can also use app.listen here which wont use the http method*/
    console.log(`Server listening on port ${PORT}`)
  })
}
serverStarts();
