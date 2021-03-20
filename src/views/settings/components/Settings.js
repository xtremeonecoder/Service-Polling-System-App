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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Loader from "./../../core/utilities/Loader";
import Modal from "./../../core/utilities/Modal";
import Notification from "./../../core/alerts/Notification";
import { getSettings, deleteSetting } from "./../models/Settings";
import { handleDelete } from "./../../core/utilities/CallbackHandlers";

// returns table columns
const getTableColumns = () => {
  return [
    { key: "key", _classes: "font-weight-bold", sorter: true },
    { key: "value", _classes: "font-weight-bold", sorter: true },
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
    setSettings,
    settings,
  } = slotParams;

  return {
    key: ({ _id: id = "", key = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/settings/${id}/details`}>{key}</CLink>
        </td>
      );
    },
    value: ({ _id: id, value = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/settings/${id}/details`}>{value}</CLink>
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
            title="View This Setting"
            className="text-dark mr-2"
            to={`/settings/${item._id}/details`}
          >
            <CIcon size={"lg"} name={"cilNotes"} />
          </CLink>
          <CLink
            title="Edit This Setting"
            className="text-dark mr-2"
            to={`/settings/${item._id}/edit`}
          >
            <CIcon size={"lg"} name={"cilPencil"} />
          </CLink>
          {/** Delete operation disabled forcefully */}
          {false && (
            <CLink
              to="#"
              title="Delete This Setting"
              className="text-dark mr-2"
              onClick={() => {
                setDanger(!danger);
                setModalConfirm(() => () =>
                  handleDelete({
                    items: settings,
                    targetItem: item,
                    stateCallback: setSettings,
                    deleteCallback: deleteSetting,
                  })
                );
                setModalHeader("Delete This Setting?");
                setModalBody("Are you sure to delete this setting?");
              }}
            >
              <CIcon size={"lg"} name={"cilTrash"} />
            </CLink>
          )}
        </td>
      );
    },
  };
};

const Settings = ({ access }) => {
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

  // get settings
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    getSettings()
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
            <strong>Kry Settings</strong>
            <small className="text-muted"> (List of Settings)</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={settings}
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
              itemsPerPageSelect={true}
              pagination={{
                doubleArrows: true,
                align: "center",
              }}
              scopedSlots={getScopedSlots({
                danger,
                setDanger,
                setModalConfirm,
                setModalHeader,
                setModalBody,
                setSettings,
                settings,
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

Settings.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Settings;
