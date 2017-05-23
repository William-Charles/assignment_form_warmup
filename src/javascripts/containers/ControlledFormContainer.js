import React, { Component } from "react";
import ControlledForm from "../components/ControlledForm";
import serialize from 'form-serialize';
import {validateForm} from '../helpers';

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
    return true;
  };

  onChangeEmail = e => {
    this.setState({
      //errors: { exampleEmail: !this.validateEmail(e.target.value) },
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
    const form = serialize(e.target, {hash:true});
    console.log(this.state);
    const formValidationResponse = validateForm(form);
    if (formValidationResponse) {
        //fail failure
        this.setState({
            errors: formValidationResponse
        });
    }

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
