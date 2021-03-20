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

import auth from "./../../auth/models/Auth";
import Form from "./../../core/utilities/Form";

class CreateForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { name: "", url: "" },
  };

  // configure validation schema
  schema = {
    url: Joi.string()
      .required()
      .regex(/^((ftp|http|https):\/\/)(www\.)?([\w-]+)\.([A-z]{2,})/)
      .label("Service URL"),
    name: Joi.string().min(2).max(50).required().label("Service Name"),
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const service = { ...this.state.data };
      const user = auth.getCurrentUser();
      service.userId = user._id;
      const { history, createService = null } = this.props;

      // create new service
      if (createService) {
        createService(service)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The service created successfully!");
            // redirect to list page
            history.push("/services");
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
    const service = this.state.data;

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
                key: "name",
                value: service.name,
                placeholder: "Example: Google or YouTube..",
                label: "Service Name",
                required: true,
              })}
              {this.getInputElement({
                key: "url",
                value: service.url,
                placeholder: "Example: http://www.google.com",
                label: "Service URL",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Add Service" })}
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
  createService: PropTypes.func.isRequired,
};

export default CreateForm;
