const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');

const {
  addQueValidator,
  idParamQueValidator,
} = require('../utils/validators/questionValidator');

const {
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion
} = require('../controller/questionController');

router.route('/')
  .post(
    authMiddleWare,
    allowTo('manager', 'admin'),
    addQueValidator,
    addQuestion
  )
  .get(authMiddleWare, getAllQuestions);

router.route('/:id')
  .patch(
    authMiddleWare,
    allowTo('manager', 'admin'),
    idParamQueValidator,
    updateQuestion,
)
  .delete(
    authMiddleWare,
    allowTo('manager', 'admin'),
    idParamQueValidator,
    deleteQuestion,
  )



module.exports = router;