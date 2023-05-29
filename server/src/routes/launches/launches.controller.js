const {
  getAllLaunches,
  addNewlaunch
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res){
  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate)
  addNewlaunch(launch);
  return res.status(201).json(launch)
}

module.exports = {
  httpAddNewLaunch,
  httpGetAllLaunches,
}