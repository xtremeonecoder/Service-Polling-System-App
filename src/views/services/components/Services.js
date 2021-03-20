/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

import {
  CLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Loader from "./../../core/utilities/Loader";
import Modal from "./../../core/utilities/Modal";
import Notification from "./../../core/alerts/Notification";
import { getServices, deleteService } from "./../models/Services";
import { handleDelete } from "./../../core/utilities/CallbackHandlers";

// returns table columns
const getTableColumns = () => {
  return [
    { key: "name", _classes: "font-weight-bold", sorter: true },
    { key: "url", _classes: "font-weight-bold", sorter: true },
    {
      key: "status",
      _classes: "font-weight-bold",
      sorter: true,
      filter: false,
    },
    { key: "createdAt", _classes: "font-weight-bold", sorter: true },
    { key: "updatedAt", _classes: "font-weight-bold", sorter: true },
    {
      key: "action",
      _classes: "font-weight-bold",
      sorter: false,
      filter: false,
    },
  ];
};

// returns table cell contents
const getScopedSlots = (slotParams = {}) => {
  const {
    danger,
    setDanger,
    setModalConfirm,
    setModalHeader,
    setModalBody,
    setServices,
    services,
  } = slotParams;

  return {
    name: ({ _id: id = "", name = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/services/${id}/details`}>{name}</CLink>
        </td>
      );
    },
    url: ({ url = "" }) => {
      return (
        <td className="font-weight-bold">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </td>
      );
    },
    status: ({ status = false }) => {
      const statusText = status ? "OK" : "FAIL";
      const statusColor = status ? "success" : "danger";
      return (
        <td className="font-weight-bold">
          <CBadge color={statusColor}>{statusText}</CBadge>
        </td>
      );
    },
    createdAt: ({ createdAt = "" }) => {
      return <td className="font-weight-bold">{createdAt}</td>;
    },
    updatedAt: ({ updatedAt = "" }) => {
      return <td className="font-weight-bold">{updatedAt}</td>;
    },
    action: (item) => {
      return (
        <td>
          <CLink
            title="View This Service"
            className="text-dark mr-2"
            to={`/services/${item._id}/details`}
          >
            <CIcon size={"lg"} name={"cilNotes"} />
          </CLink>
          <CLink
            title="Edit This Service"
            className="text-dark mr-2"
            to={`/services/${item._id}/edit`}
          >
            <CIcon size={"lg"} name={"cilPencil"} />
          </CLink>
          <CLink
            to="#"
            title="Delete This Service"
            className="text-dark mr-2"
            onClick={() => {
              setDanger(!danger);
              setModalConfirm(() => () =>
                handleDelete({
                  items: services,
                  targetItem: item,
                  stateCallback: setServices,
                  deleteCallback: deleteService,
                })
              );
              setModalHeader("Delete This Service?");
              setModalBody("Are you sure to delete this service?");
            }}
          >
            <CIcon size={"lg"} name={"cilTrash"} />
          </CLink>
        </td>
      );
    },
  };
};

const Services = ({ access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalConfirm, setModalConfirm] = useState(null);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  // get services
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices()
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

  // pagination variables
  const itemsPerPage = 20;

  return (
    <CRow>
      <CCol xl={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during executing the operation!"
          />
        )}
        <CCard>
          <CCardHeader>
            <Modal
              onConfirm={modalConfirm}
              stateSetter={{
                setDanger,
                setModalBody,
                setModalHeader,
                setModalConfirm,
              }}
              params={{
                danger: danger,
                header: modalHeader,
                body: modalBody,
              }}
            />
            <strong>Kry Services</strong>
            <small className="text-muted"> (List of Services)</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={services}
              fields={getTableColumns()}
              hover={true}
              sorter={true}
              header={true}
              loading={loading}
              dark={false}
              striped={true}
              responsive={true}
              itemsPerPage={itemsPerPage}
              activePage={page}
              columnFilter={true}
              tableFilter={true}
              //clickableRows={true}
              itemsPerPageSelect={true}
              pagination={{
                doubleArrows: true,
                align: "center",
              }}
              // onRowClick={(item) => serviceDetailsLink(item)}
              scopedSlots={getScopedSlots({
                danger,
                setDanger,
                setModalConfirm,
                setModalHeader,
                setModalBody,
                setServices,
                services,
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

Services.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Services;
