const { validationResult } = require('express-validator');

// if there is an error during validation 422 unprocessable entity
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};
