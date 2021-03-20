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
import { CLink, CCard, CCardBody, CCardHeader, CBadge } from "@coreui/react";

import { getService, deleteService } from "./../models/Services";
import Modal from "./../../core/utilities/Modals";
import Loader from "./../../core/utilities/Loader";
import Notification from "./../../core/alerts/Notification";
import { handleDelete } from "./../../core/utilities/CallbackHandlers";

const Service = ({ match, access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);

  // get service details from server
  const history = useHistory();

  // get service details
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState({});

  useEffect(() => {
    getService(match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setService(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  const statusText = service && service.status ? "OK" : "FAIL";
  const statusColor = service && service.status ? "success" : "danger";

  // return service details
  return (
    <CRow>
      <CCol lg={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during fetching the service!"
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
                    targetItem: service,
                    deleteCallback: deleteService,
                    history: history,
                  })
                }
                header="Deleting This Service?"
                body="Are you sure to perform this delete operation?"
              />
              <strong>{`Service ID: ${service._id}`}</strong>
              <CLink
                title="Delete This Service"
                className="ml-2 text-dark float-right"
                onClick={() => setDanger(!danger)}
                href=""
              >
                <CIcon size={"lg"} name={"cilTrash"} />
              </CLink>
              <CLink
                title="Edit This Service"
                className="text-dark mr-2 float-right"
                onClick={() => history.push(`/services/${service._id}/edit`)}
                href=""
              >
                <CIcon size={"lg"} name={"cilPencil"} />
              </CLink>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover font-weight-bold">
                <tbody>
                  <tr>
                    <td>Service Name:</td>
                    <td>{service.name}</td>
                  </tr>
                  <tr>
                    <td>Service URL:</td>
                    <td>
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {service.url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Service Status:</td>
                    <td>
                      <CBadge color={statusColor}>{statusText}</CBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Created At:</td>
                    <td>{service.createdAt}</td>
                  </tr>
                  <tr>
                    <td>Updated At:</td>
                    <td>{service.updatedAt}</td>
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

Service.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Service;
