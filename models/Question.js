const mongoose = require('mongoose');

const subTitleSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, { _id: false });


const queSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: [subTitleSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', queSchema);