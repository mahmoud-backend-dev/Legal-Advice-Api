const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Info = require('../models/Info');



// @decs Add Videos Links
// @route POST /api/v1/info/links
// @ptotect Protected/Admin/Manager
exports.addLinksOfVideos = asyncHandler(async (req, res) => {
  const videos = await Info.findOneAndUpdate(
    { title: 'Videos' },
    { $addToSet: { videos: req.body.videos } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", videos: videos.videos });
});

// @decs Get Videos Links
// @route GET /api/v1/info/links
// @ptotect Protected/Admin/Manager
exports.getAllLinksOfVideos = asyncHandler(async (req, res) => {
  const allLinks = await Info.findOne({ title: 'Videos' });
  if (allLinks.videos.length === 0)
    res.status(StatusCodes.NOT_FOUND).json({ message: "No Links of videos" })
  res.status(StatusCodes.OK).json({ status: "Success", videos: allLinks.videos });
});


// @decs Delete Video Links
// @route DELETE /api/v1/info/links/
// @ptotect Protected/Admin/Manager
exports.deleteLink = asyncHandler(async (req, res) => {
  const linkes = await Info.findOneAndUpdate(
    { title: 'Videos' },
    { $pull: { videos: req.body.link } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", videos: linkes.videos });
});

// @decs Add Criminal Dictionary
// @route POST /api/v1/info/criminalDictionary
// @ptotect Protected/Admin/Manager
exports.addCriminalDictionary = asyncHandler(async (req, res) => {
  const criminalDictionary = await Info.create(req.body);
  criminalDictionary.videos = undefined;
  res.status(StatusCodes.OK).json({ status: "Success", criminalDictionary });
});


// @decs Get All Criminal Dictionary
// @route GET /api/v1/info/criminalDictionary
// @ptotect Protected/Admin/Manager
exports.getAllCriminalDictionary = asyncHandler(async (req, res) => {
  const allCriminalDictionary = await Info.find({ title: { $ne: "Videos" } }).select('-videos -__v');
  res.status(StatusCodes.OK)
    .json({ status: "Success", count: allCriminalDictionary.length, AllCriminalDictionary: allCriminalDictionary });
});


// @decs Get Specific Criminal Dictionary
// @route GET /api/v1/info/criminalDictionary/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificCriminalDictionary = asyncHandler(async (req, res) => {
  const criminalDictionary = await Info.findById(req.params.id).select('-videos -__v');
  res.status(StatusCodes.OK).json({ status: "Success", criminalDictionary });
});

// @decs Remove Criminal Dictionary
// @route DELET /api/v1/info/criminalDictionary/:id
// @ptotect Protected/Admin/Manager
exports.removeCriminalDictionary = asyncHandler(async (req, res) => {
  await Info.findByIdAndRemove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});
