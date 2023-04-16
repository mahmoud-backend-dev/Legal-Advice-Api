const fs = require('fs');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const New = require('../models/New');

// @decs Add New
// @route POST /api/v1/news
// @ptotect Protected/Admin/Manager
exports.addNew = asyncHandler(async (req, res) => {
  req.body.image = `${process.env.BASE_URL}/News/${req.file.filename}`;
  const newL = await New.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", new: newL });
});

// @decs Update New
// @route PATCH /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.updateNew = asyncHandler(async (req, res) => {
  if (req.file) {
    const newToUp = await New.findById(req.params.id);
    const path = `./uploads/News/${newToUp.image.split('/')[4]}`;
    fs.unlinkSync(path);
    req.body.image = `${process.env.BASE_URL}/News/${req.file.filename}`;
  }
  const updatedNew = await New.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", new: updatedNew });
});

// @decs Get Specific New
// @route GET /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificNew = asyncHandler(async (req, res) => {
  const specificNew = await New.findById(req.params.id);
  res.status(StatusCodes.OK).json({ status: "Success", new: specificNew });
});


// @decs Delete Specific New
// @route DELETE /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.deleteSpecificNew = asyncHandler(async (req, res) => {
  const specificNew = await New.findByIdAndRemove(req.params.id);
  const path = `./uploads/News/${specificNew.image.split('/')[4]}`;
  fs.unlinkSync(path);
  res.status(StatusCodes.NO_CONTENT).send();
});

// @decs Get All New
// @route GET /api/v1/news
// @ptotect Protected/Admin/Manager
exports.getAllNews = asyncHandler(async (req, res) => {
  const allNews = await New.find({}).select(' -__v');
  res.status(StatusCodes.OK).json({ status: "Success", count: allNews.length, allNews });
});


