const { parse } = require('csv-parse')
const fs =require ('fs');
const path = require ('path');

const planets = require('./planets.mongo')


const habitablePlanet = function(planet){
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6
}

async function savePlanet(planet){
  try {
   await planets.updateOne({
     keplerName: planet.kepler_name,
   }, {
     keplerName: planet.kepler_name,
   }, {
     upsert: true,
   });
  } catch (error) {
   console.error(`Could not save a Planet ${error}`)
  }
 }


function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv'))
      .pipe(parse({
         comment: '#',
         columns: true,
      }))
      .on('data', async (data) => {
        if (habitablePlanet(data)){
          savePlanet(data);
         }
        })
        .on('error', (err) => {
          console.log(err)
          reject(err);
        })
        .on('end', async () => {
          const planetsFound = (await getAllPlanets()).length
          console.log(`The total number of habitable planets is ${planetsFound}!`);
          resolve();
        })
      });
}

async function getAllPlanets(){
  return await planets.find({}, {
    '__v': 0,
    '_id': 0,
  });
}


  module.exports = {
    loadPlanetsData,
    getAllPlanets,
  };