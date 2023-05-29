const { parse } = require('csv-parse')
const fs =require ('fs');
const path = require ('path');

const results = [];

const habitablePlanet = function(planet){
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv'))
      .pipe(parse({
         comment: '#',
         columns: true,
      }))
      .on('data', (data) => {
        if (habitablePlanet(data)){
          results.push(data)
         }
        })
        .on('error', (err) => {
          console.log(err)
          reject(err);
        })
        .on('end', () => {
          console.log(`The total number of planets that are habitable is ${results.length}!`);
          resolve();
        })
      });
}

function getAllPlanets(){
  return results
}
  module.exports = {
    loadPlanetsData,
    getAllPlanets,
  };