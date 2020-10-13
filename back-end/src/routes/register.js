const router = require('express').Router();
const signupController = require('../controllers/signupController');
 
 
router.get('/register', signupController.register);
 
 
module.exports = router;
