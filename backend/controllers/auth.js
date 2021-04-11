const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
// check if the token is valid
const expressJwt = require('express-jwt');

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

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User with that email does not exist. Please signup' });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match',
      });
    }
    // generate a json web token and send it to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role }, // only return these fields, not hashed password
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Signout successfully' });
};

//  protected routes with middleware
exports.requireSignin = (req, res) =>
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['RS256'],
  });
