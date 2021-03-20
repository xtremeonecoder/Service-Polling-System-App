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
import { createSetting } from "./../models/Settings";
const CreateForm = lazy(() => import("./../forms/CreateForm.js"));

const SettingCreate = ({ access }) => {
  // prepare widget headers
  const history = useHistory();
  const settingCreateHeader = "Add New Setting";

  return (
    <CRow>
      <CCol lg={12}>
        <CreateForm
          createSetting={createSetting}
          header={settingCreateHeader}
          history={history}
        />
      </CCol>
    </CRow>
  );
};

SettingCreate.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default SettingCreate;
