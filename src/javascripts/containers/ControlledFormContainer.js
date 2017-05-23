import React, { Component } from "react";
import ControlledForm from "../components/ControlledForm";
import serialize from "form-serialize";
import { validateForm, validatePassword } from "../helpers";

class ControlledFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      errors: {},
      exampleEmail: "",
      password: "",
      exampleURL: ""
    };
  }

  onChangePassword = e => {
    const passwordValidationResponse = validatePassword({
      password: e.target.value
    });
    if (passwordValidationResponse) {
      //fail failure
      this.setState({
        errors: passwordValidationResponse
      });
    } else {
      this.formSuccess();
    }
  };

  onChangeEmail = e => {
    let obj;
    if (!e.target.value.includes("@")) {
      obj = { exampleEmail: ["needs a @ to be valid"] };
    } else {
      obj = {};
    }
    this.setState({
      //errors: { exampleEmail: !this.validateEmail(e.target.value) },
      errors: obj,
      exampleEmail: e.target.value
    });
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = serialize(e.target, { hash: true });
    const formValidationResponse = validateForm(form);
    console.log(formValidationResponse);
    if (formValidationResponse) {
      //fail failure
      this.setState({
        errors: formValidationResponse
      });
    } else {
      this.formSuccess();
    }
  };

  formSuccess = () => {
    this.setState(
      {
        success: true,
        errors: {},
        exampleEmail: "",
        examplePassword: "",
        exampleURL: ""
      },
      () => console.log("Success!")
    );
  };

  render() {
    return (
      <ControlledForm
        onSubmit={this.onSubmit}
        onChangeInput={this.onChangeInput}
        onChangeEmail={this.onChangeEmail}
        onChangePassword={this.onChangePassword}
        {...this.state}
      />
    );
  }
}

export default ControlledFormContainer;
