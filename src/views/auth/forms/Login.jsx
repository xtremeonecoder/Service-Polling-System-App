/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "@hapi/joi";
import { CCol, CForm, CRow } from "@coreui/react";

import auth from "./../models/Auth";
import Form from "./../../core/utilities/Form";

class Login extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { username: "", password: "" },
  };

  // Validation schema
  schema = {
    username: Joi.string().email().min(5).max(50).required().label("Username"),
    password: Joi.string().min(4).max(10).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      // login the user
      const { username, password } = this.state.data;
      await auth.login(username, password);

      // redirect user to the homepage or where they intended to
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // const redirectPath = state ? state.from.pathname : "/";
      // this.props.history.push(redirectPath);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // redirect the user to homepage if already loggedin
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    // render login form
    return (
      <CForm onSubmit={this.handleSubmission}>
        <h1>Kry Login</h1>
        <p className="text-muted">Signin to your Kry account</p>
        <CRow>
          <CCol xs="12">
            {this.getInputElement({
              key: "username",
              type: "email",
              required: true,
              groupIcon: "cil-user",
              placeholder: "Email Address",
            })}
            {this.getInputElement({
              key: "password",
              type: "password",
              required: true,
              groupIcon: "cil-lock-locked",
              placeholder: "Password",
            })}
            {this.renderSubmitButton({
              block: true,
              label: "Account Login",
              iconName: "cilLockLocked",
            })}
          </CCol>
        </CRow>
      </CForm>
    );
  }
}

export default Login;
