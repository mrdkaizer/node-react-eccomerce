const validator = require("validator");

const validation = (user) => {
  try {
    if (user.termsCheck === false) {
      throw new Error("You must accept our terms and conditions.");
    }
    if (!validator.isEmail(user.email)) {
      throw new Error("This is not a valid email!");
    }
    if (!validator.isAlpha(user.name.replace(/\s/g, ""))) {
      throw new Error("This is not a valid full name!");
    }
    if (user.password.length < 7) {
      throw new Error("Password must be atleast 7 characters long");
    }
    if (user.password !== user.confirm) {
      throw new Error("Password and Confirm Password do not match");
    }
    if (user.address <= 5) {
      throw new Error("This is not a valid shipping address");
    }
    if (user.postal <= 2) {
      throw new Error("This is not a valid postal code");
    }
    if (user.city <= 2) {
      throw new Error("This is not a valid city");
    }
    if (user.country <= 2) {
      throw new Error("This is not a valid country");
    }
  } catch (e) {
    throw e;
  }
};

export { validation };
