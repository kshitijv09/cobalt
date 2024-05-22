const express = require('express');
const passport = require('passport');
const loggedIn=require("../middleware/loggedIn")
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/google', authController.login);

router.get('/google/callback', passport.authenticate("google",{
    successRedirect:'/auth/profile',
    failureRedirect:'/auth/google/failure'
  }))

router.get('/profile',loggedIn.isLoggedIn, authController.getProfile);
router.get('/google/failure',authController.failureHandler)
router.post('/logout', authController.logout);

module.exports = router;
