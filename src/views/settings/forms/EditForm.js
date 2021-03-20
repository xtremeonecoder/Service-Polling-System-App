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

class EditForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { id: "", key: "", value: "" },
  };

  // configure validation schema
  schema = {
    key: Joi.string()
      .required()
      .regex(/^[A-Za-z]+[A-Za-z0-9]+$/)
      .label("Setting Key"),
    value: Joi.string().min(1).max(50).required().label("Setting Value"),
  };

  // initiate state value
  componentDidMount = () => {
    // set state from props value
    const setting = { ...this.props.setting };

    this.setState({
      data: {
        id: setting._id,
        key: setting.key,
        value: setting.value,
      },
    });
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const setting = { ...this.state.data };
      const { history, updateSetting = null } = this.props;

      // update setting
      if (updateSetting) {
        updateSetting(setting)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The setting updated successfully!");
            //redirect to list
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
            <strong>
              {header}
              <div style={{ color: "red" }}>
                Important: After changing scheduler settings, you need to
                restart the backend server to take the changes effect!
              </div>
            </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {this.getInputElement({
                key: "key",
                value: setting.key,
                label: "Settings Key",
                disabled: true,
                required: true,
              })}
              {this.getInputElement({
                key: "value",
                value: setting.value,
                label: "Settings Value",
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
  setting: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default EditForm;
