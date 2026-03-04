const Joi = require("joi");

const registerUserValidationSchema = Joi.object({
  fullname: Joi.string().trim().min(3).max(200).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
  }),

  username: Joi.string().trim().alphanum().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must only contain letters and numbers",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),

  role: Joi.string().valid("admin", "user").default("user"),
});

const loginUserValidationSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
});

module.exports = { registerUserValidationSchema, loginUserValidationSchema };
