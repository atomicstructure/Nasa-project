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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId){
  return launches.has(launchId)
}

function getAllLaunches(){
  return Array.from(launches.values())
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

module.exports = {
  getAllLaunches,
  addNewlaunch,
  existsLaunchWithId,
}