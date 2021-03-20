/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CLink, CCard, CCardBody, CCardHeader } from "@coreui/react";

import { getSetting, deleteSetting } from "./../models/Settings";
import Modal from "./../../core/utilities/Modals";
import Loader from "./../../core/utilities/Loader";
import Notification from "./../../core/alerts/Notification";
import { handleDelete } from "./../../core/utilities/CallbackHandlers";

const Setting = ({ match, access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);

  // get setting details from server
  const history = useHistory();

  // get setting details
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    getSetting(match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setSetting(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // return setting details
  return (
    <CRow>
      <CCol lg={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during fetching the settings!"
          />
        )}
        {!error && (
          <CCard>
            <CCardHeader>
              <Modal
                danger={danger}
                setDanger={setDanger}
                onConfirm={() =>
                  handleDelete({
                    targetItem: setting,
                    deleteCallback: deleteSetting,
                    history: history,
                  })
                }
                header="Deleting This Settings?"
                body="Are you sure to perform this delete operation?"
              />
              <strong>{`Settings ID: ${setting._id}`}</strong>
              {/*Delete operation disabled forecefully*/}
              {false && (
                <CLink
                  title="Delete This Settings"
                  className="ml-2 text-dark float-right"
                  onClick={() => setDanger(!danger)}
                  href=""
                >
                  <CIcon size={"lg"} name={"cilTrash"} />
                </CLink>
              )}
              <CLink
                title="Edit This Setting"
                className="text-dark mr-2 float-right"
                onClick={() => history.push(`/settings/${setting._id}/edit`)}
                href=""
              >
                <CIcon size={"lg"} name={"cilPencil"} />
              </CLink>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover font-weight-bold">
                <tbody>
                  <tr>
                    <td>Settings Name:</td>
                    <td>{setting.key}</td>
                  </tr>
                  <tr>
                    <td>Settings Value:</td>
                    <td>{setting.value}</td>
                  </tr>
                  <tr>
                    <td>Created At:</td>
                    <td>{setting.createdAt}</td>
                  </tr>
                  <tr>
                    <td>Updated At:</td>
                    <td>{setting.updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        )}
      </CCol>
    </CRow>
  );
};

Setting.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Setting;
