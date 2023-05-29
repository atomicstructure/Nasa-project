const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Samantha Explorer I',
  rocket: 'Explorer IS35',
  launchDate: new Date('December 25, 2024'),
  destination: 'Kepler-442 b',
  customer: ['SMT', 'CHR'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);


module.exports = {
  launches,
}