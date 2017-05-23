import React, { Component } from "react";
import ControlledForm from "../components/ControlledForm";
import serialize from "form-serialize";
import { validateForm, validatePassword, validateUrl } from "../helpers";

class ControlledFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      errors: {},
      exampleEmail: "",
      examplePassword: "",
      exampleURL: "",
      realTimeErrors: {}
    };
  }

  onChangePassword = e => {
      let realTimeErrors = this.state.realTimeErrors;
    const passwordValidationResponse = validatePassword({
      password: e.target.value
    });
    if (passwordValidationResponse) {
      //fail failure
      realTimeErrors.examplePassword = passwordValidationResponse.password;
    } else {
        delete realTimeErrors.examplePassword;
    }
    this.setState({
        realTimeErrors,
        examplePassword: e.target.value
    });
  };
  onChangeUrl = e => {
      let realTimeErrors = this.state.realTimeErrors;
    const urlValidationResponse = validateUrl({
      url: e.target.value
    });
    console.log("Url validation response", urlValidationResponse);
    if (urlValidationResponse) {
      //fail failure
      realTimeErrors.exampleUrl = urlValidationResponse.exampleUrl;
    } else {
        delete realTimeErrors.exampleUrl;
    }
    this.setState({
        realTimeErrors,
        exampleURL: e.target.value
    }, () => console.log("current state", this.state));
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
        onChangeUrl={this.onChangeUrl}
        {...this.state}
      />
    );
  }
}

export default ControlledFormContainer;
