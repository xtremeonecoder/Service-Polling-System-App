/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { CImg } from "@coreui/react";

const LogoHeader = ({ logoClass }) => {
  return (
    <div className={logoClass}>
      <CImg
        src={"images/admin/logo-header.png"}
        className="c-avatar-img"
        alt="admin@kry.se"
      />
    </div>
  );
};

export default LogoHeader;
