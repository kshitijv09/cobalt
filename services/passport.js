const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const User=require("../models/User")


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  passReqToCallback:true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOrCreate(
      { googleId: profile.id },
      {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value
      }
    );
    return done(null, user);
  } catch (err) {
    console.log("Error while creating ",err)
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
