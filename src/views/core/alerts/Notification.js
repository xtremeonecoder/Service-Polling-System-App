/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import {
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CAlert,
} from "@coreui/react";

const Notification = (props) => {
  const {
    show,
    autohide,
    fade,
    position,
    closeButton,
    color,
    header,
    body,
    renderer = null,
  } = props;
  return (
    <CToaster position={position ? position : "static"}>
      <CToast
        show={show != null ? show : true}
        autohide={autohide != null ? autohide : false}
        fade={fade != null ? fade : false}
      >
        <CToastHeader closeButton={closeButton != null ? closeButton : false}>
          <strong className="text-dark">{header}</strong>
        </CToastHeader>
        <CToastBody>
          <CAlert color={color ? color : "danger"}>{body}</CAlert>
        </CToastBody>
        {renderer && <CToastBody>{renderer()}</CToastBody>}
      </CToast>
    </CToaster>
  );
};

export default Notification;
