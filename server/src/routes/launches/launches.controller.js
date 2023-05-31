const {
  getAllLaunches,
  addNewlaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res){
  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate 
    || !launch.target){
    return res.status(400).json({
      error: 'Please check you have all datas supplied!'
    })
  }
  launch.launchDate = new Date(launch.launchDate)
  if(isNaN(launch.launchDate)){
    return res.status(400).json({
      error: 'Invalid launch date supplied'
    });
  }
  addNewlaunch(launch);
  return res.status(201).json(launch)
}

function httpAbortLaunch(req, res){
  const launchId = +req.params.id;

if(!existsLaunchWithId(launchId)){
  return res.status(404).json({
    error: 'Launch cannot be found',
  });
  
}
const aborted = abortLaunchById(launchId);
return res.status(200).json(aborted);
}

module.exports = {
  httpAddNewLaunch,
  httpGetAllLaunches,
  httpAbortLaunch,
}