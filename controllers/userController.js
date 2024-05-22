const User = require('../models/User');

exports.getUserByGoogleId = async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.params.googleId });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user' });
  }
};
