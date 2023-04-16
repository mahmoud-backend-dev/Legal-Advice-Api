const mongoose = require('mongoose');

const infoSchame = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  videos: [String],
}, { timestamps: true });


module.exports = mongoose.model('Info', infoSchame);