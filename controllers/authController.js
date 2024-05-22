const passport = require('passport');

exports.login = (req, res) => {
  try {
    console.log("Coming here")
    
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
  } catch (error) {
    console.error('Error initiating Google OAuth process:', error);
    res.status(500).send({ error: 'Failed to initiate Google OAuth process' });
  }
};

exports.googleCallback = (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to handle Google callback' });
  }
};

exports.getProfile = (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('http://localhost:3000/login');
    }
    console.log("req is ",req.user)
    res.redirect(`http://localhost:3000/profile/${req.user.googleId}`);
   
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve profile' });
  }
};

exports.failureHandler = (req, res) => {
  try {
   console.log("Error while handling")
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve profile' });
  }
};

exports.logout = (req, res) => {
  try {
    req.logout(err => {
      if (err) {
        return res.status(500).send({ error: 'Failed to log out' });
      }
      res.redirect('/');
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to log out' });
  }
};
