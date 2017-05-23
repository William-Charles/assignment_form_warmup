import React, { Component } from "react";
import ControlledForm from "../components/ControlledForm";

class ControlledFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      errors: {},
      exampleEmail: "",
      examplePassword: "",
      exampleURL: ""
    };
  }

  validateEmail = value => {
    if (!value.contains("@")) {
      return true;
    }
    return false;
  };

  onChangeEmail = e => {
    this.setState({
      errors: { exampleEmail: this.validateEmail(e.target.value) }
    });
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("This is the form response", e);
    console.log(this.state);

    this.formSuccess();
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
        {...this.state}
      />
    );
  }
}

export default ControlledFormContainer;
