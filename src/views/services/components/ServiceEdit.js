/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { useState, useEffect, lazy } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CRow, CCol } from "@coreui/react";

import { getService, updateService } from "./../models/Services";
import Loader from "./../../core/utilities/Loader";
import Notification from "./../../core/alerts/Notification";

// import widgets
const EditForm = lazy(() => import("./../forms/EditForm.js"));

const ServiceEdit = ({ match, access }) => {
  // get history object
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [service, setServices] = useState({});

  // get service details
  useEffect(() => {
    getService(match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setServices(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare widget headers
  const serviceEditHeader = `Edit Service: ${service.name}`;

  return (
    <CRow>
      <CCol lg={12}>
        {error && !service.name && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during updating service!"
          />
        )}
        {!error && service.name && (
          <EditForm
            updateService={updateService}
            header={serviceEditHeader}
            service={service}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

ServiceEdit.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ServiceEdit;
