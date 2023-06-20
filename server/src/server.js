const http = require('http')
const app = require('./app')
const {
  mongoConnect
} = require('./services/mongo')
const {
  loadPlanetsData 
} = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000
const server = http.createServer(app)


async function serverStarts(){
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    /*Note that you can also use app.listen here which wont use the http method*/
    console.log(`Server listening on port ${PORT}`)
  })
}
serverStarts();
