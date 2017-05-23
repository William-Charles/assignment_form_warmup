import validate from "validate.js";

export function getColorFromError(error) {
  return !!error ? "danger" : "default";
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}

const passwordConstraints = {
  password: {
    presence: true,
    length: { minimum: 12 }
  }
};

const formConstraints = {
  exampleEmail: {
    presence: true,
    email: true
  },
  examplePassword: {
    presence: true,
    length: { minimum: 12 }
  },
  exampleURL: {
    url: true
  }
};

export function validatePassword(password) {
  return validate(password, passwordConstraints);
}

export function validateForm(formData) {
  return validate(formData, formConstraints);
}
