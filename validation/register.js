const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

// Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password field is required.";
  }
  else if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
      errors.password1 = "Password must be at least 6 characters.";
    }
  if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Please confirm your password.";
    }
  else if (!Validator.equals(data.password1, data.password2)) {
      errors.password2 = "Passwords must match.";
    }
    
  return {
      errors,
      isValid: isEmpty(errors)
    };
};