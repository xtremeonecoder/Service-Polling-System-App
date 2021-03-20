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

import { getSetting, updateSetting } from "./../models/Settings";
import Loader from "./../../core/utilities/Loader";
import Notification from "./../../core/alerts/Notification";

// import widgets
const EditForm = lazy(() => import("./../forms/EditForm.js"));

const SettingEdit = ({ match, access }) => {
  // get history object
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [setting, setSettings] = useState({});

  // get setting details
  useEffect(() => {
    getSetting(match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setSettings(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare widget headers
  const settingEditHeader = `Edit Setting: ${setting.key}`;

  return (
    <CRow>
      <CCol lg={12}>
        {error && !setting.key && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during updating setting!"
          />
        )}
        {!error && setting.key && (
          <EditForm
            updateSetting={updateSetting}
            header={settingEditHeader}
            setting={setting}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

SettingEdit.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default SettingEdit;
