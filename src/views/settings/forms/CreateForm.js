/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import Joi from "@hapi/joi";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CForm,
} from "@coreui/react";

import Form from "./../../core/utilities/Form";

class CreateForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { key: "", value: "" },
  };

  // configure validation schema
  schema = {
    key: Joi.string()
      .required()
      .regex(/^[A-Za-z]+[A-Za-z0-9]+$/)
      .label("Setting Key"),
    value: Joi.string().min(1).max(50).required().label("Setting Value"),
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const setting = { ...this.state.data };
      const { history, createSetting = null } = this.props;

      // create new setting
      if (createSetting) {
        createSetting(setting)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The setting created successfully!");
            // redirect to list page
            history.push("/settings");
          })
          .catch((error) => {
            // handle error
            // set loader to false
            this.setState({ loading: false });
          });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // error
      }
    }
  };

  render() {
    // destructuring props
    const { header = "" } = this.props;
    const setting = this.state.data;

    // render
    return (
      <CForm
        wasValidated={false}
        onSubmit={this.handleSubmission}
        method="post"
        className="form-horizontal"
      >
        <CCard>
          <CCardHeader>
            <strong>{header}</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {this.getInputElement({
                key: "key",
                value: setting.key,
                placeholder: "Example: appSettingsOne",
                label: "Settings Key",
                required: true,
              })}
              {this.getInputElement({
                key: "value",
                value: setting.value,
                placeholder: "Example: anything..",
                label: "Settings Value",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Add Settings" })}
            {this.renderResetButton({ label: "Reset Values" })}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

CreateForm.propTypes = {
  header: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  createSetting: PropTypes.func.isRequired,
};

export default CreateForm;
