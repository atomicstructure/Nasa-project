const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo')

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Samantha Explorer I',
  rocket: 'Explorer IS35',
  launchDate: new Date('December 25, 2024'),
  target: 'Kepler-442 b',
  customers: ['SMT', 'CHR'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId){
  return launches.has(launchId)
}

async function getAllLaunches(){
  return await launchesDatabase.find({}, {
    '__v': 0,
    '_id': 0,
  });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  })

  if(!planet){
    throw new Error('No matching planet found!')
  }

  await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true,
  });
}

function addNewlaunch(launch){
  latestFlightNumber ++
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Samantha', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId){
  const aborted =launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewlaunch,
  abortLaunchById,
}