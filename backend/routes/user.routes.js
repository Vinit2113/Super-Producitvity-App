const express = require("express");
const register = require("../controller/users/createUser.controller");
const login = require("../controller/users/loginUser.controller");
const validate = require("../middleware/validate.middleware");
const { registerUserValidationSchema, loginUserValidationSchema } = require("../validation/userValidation");

const router = express.Router();

router.post("/create", validate(registerUserValidationSchema), register);
router.post("/login", validate(loginUserValidationSchema), login);

module.exports = router;
