const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const { 
  allowTo
} = require('../controller/userController');
const {
  addLinkValidator,
  deleteLinkValidator,
  addcriminalDictionaryValidator,
  deleteCriminalDictionaryValidator,
  getCriminalDictionaryValidator,
} = require('../utils/validators/infoValidator');

const {
  addLinksOfVideos,
  getAllLinksOfVideos,
  deleteLink,
  addCriminalDictionary,
  getAllCriminalDictionary,
  removeCriminalDictionary,
  getSpecificCriminalDictionary
} = require('../controller/infoController');

router.route('/links')
  .post(authMiddleWare, allowTo('manager', 'admin'), addLinkValidator, addLinksOfVideos)
  .get(getAllLinksOfVideos)
  .delete(authMiddleWare, allowTo('manager', 'admin'), deleteLinkValidator, deleteLink);

  
router.route('/criminalDictionary')
  .post(authMiddleWare, allowTo('manager', 'admin'), addcriminalDictionaryValidator, addCriminalDictionary)
  .get(getAllCriminalDictionary);

router.route('/criminalDictionary/:id')
  .get(getCriminalDictionaryValidator, getSpecificCriminalDictionary)
  .delete(
  authMiddleWare, allowTo('manager', 'admin'),
  deleteCriminalDictionaryValidator,
  removeCriminalDictionary
);



module.exports = router;