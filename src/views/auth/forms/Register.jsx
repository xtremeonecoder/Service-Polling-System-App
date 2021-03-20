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
import { toast } from "react-toastify";
import Joi from "@hapi/joi";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CRow,
  CCardHeader,
} from "@coreui/react";

import auth from "./../models/Auth";
import { register } from "./../models/User";
import Form from "./../../core/utilities/Form";

class Register extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { name: "", username: "", password: "", confpass: "" },
  };

  schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    confpass: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };

  doSubmit = async () => {
    try {
      // register new user
      const response = await register(this.state.data);

      // check for authentication header
      if (!response || !response.headers["x-auth-token"]) {
        toast.error("Error: Something went wrong while registration!");
        return null;
      }

      // store the jwt into the local-storage
      auth.loginWithJwt(response.headers["x-auth-token"]);

      // redirect user to the homepage
      window.location = "/";
      // this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("response", ex.response);
        console.log("message", ex.message);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // redirect the user to homepage if already loggedin
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <CForm onSubmit={this.handleSubmission}>
        <CCard className="mx-4">
          <CCardHeader className="p-4">
            <CRow>
              <CCol xs="12" sm="12">
                <h3>Register User</h3>
                <p className="text-muted">Create your kry account</p>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody className="p-4">
            {this.getInputElement({
              key: "name",
              type: "text",
              required: true,
              groupIcon: "cil-pencil",
              placeholder: "Full Name",
            })}
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
            {this.getInputElement({
              key: "confpass",
              type: "password",
              required: true,
              groupIcon: "cil-lock-locked",
              placeholder: "Confirm Password",
            })}
          </CCardBody>
          <CCardFooter className="p-4">
            <CRow>
              <CCol xs="12" sm="12">
                {this.renderSubmitButton({
                  block: true,
                  label: "Create Kry Account",
                  iconName: "cilUserFollow",
                })}
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

export default Register;
