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

class EditForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { id: "", name: "", url: "" },
  };

  // configure validation schema
  schema = {
    url: Joi.string()
      .required()
      .regex(/^((ftp|http|https):\/\/)(www\.)?([\w-]+)\.([A-z]{2,})/)
      .label("Service URL"),
    name: Joi.string().min(2).max(50).required().label("Service Name"),
  };

  // initiate state value
  componentDidMount = () => {
    // set state from props value
    const service = { ...this.props.service };

    this.setState({
      data: {
        id: service._id,
        name: service.name,
        url: service.url,
      },
    });
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const service = { ...this.state.data };
      const user = auth.getCurrentUser();
      service.userId = user._id;
      const { history, updateService = null } = this.props;

      // update service
      if (updateService) {
        updateService(service)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The service updated successfully!");
            //redirect to list
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
                label: "Service Name",
                required: true,
              })}
              {this.getInputElement({
                key: "url",
                value: service.url,
                label: "Service URL",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Save Changes" })}
            {this.renderResetButton({ label: "Reset Values" })}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

EditForm.propTypes = {
  header: PropTypes.string.isRequired,
  service: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  updateService: PropTypes.func.isRequired,
};

export default EditForm;
