/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { lazy } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CRow, CCol } from "@coreui/react";

// import custom components
import { createService } from "./../models/Services";
const CreateForm = lazy(() => import("./../forms/CreateForm.js"));

const ServiceCreate = ({ access }) => {
  // prepare widget headers
  const history = useHistory();
  const serviceCreateHeader = "Add New Service";

  return (
    <CRow>
      <CCol lg={12}>
        <CreateForm
          createService={createService}
          header={serviceCreateHeader}
          history={history}
        />
      </CCol>
    </CRow>
  );
};

ServiceCreate.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ServiceCreate;
