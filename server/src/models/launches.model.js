const launches = new Map();

let latesFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Samantha Explorer I',
  rocket: 'Explorer IS35',
  launchDate: new Date('December 25, 2024'),
  destination: 'Kepler-442 b',
  customers: ['SMT', 'CHR'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
  return Array.from(launches.values())
}

function addNewlaunch(launch){
  latesFlightNumber ++
  launches.set(
    latesFlightNumber, 
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Samantha', 'NASA'],
      flightNumber: latesFlightNumber,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewlaunch,
}