const User = require('../models/user');
const shortId = require('shortid');

exports.signup = (req, res) => {
  //   res.json({
  //     user: { name, email, password },
  //   });
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    // create the user profile
    const { name, email, password } = req.body;
    let username = shortId.generate(); // unique short id
    let profile = `${process.env.CLIENT_URL}/profile/${username}`; // profile url

    let newUser = new User({ name, email, password, profile, username }); // new User instance
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json({ message: 'Signed up successfully! Please signin.' });
      //   res.json({ user: success });
    });
  });
};
