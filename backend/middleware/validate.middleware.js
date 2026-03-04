// validate.js
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // capture all errors
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    // Send all errors as array
    return res.status(400).json({
      success: false,
      errors, // <-- send array of specific error messages
    });
  }

  req.body = value; // sanitized input
  next();
};

module.exports = validate;
