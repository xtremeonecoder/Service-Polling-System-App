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

const LogoSidebar = ({ logoClass }) => {
  return (
    <div className={logoClass}>
      <CImg
        src={"images/admin/logo-sidebar.png"}
        className="c-avatar-img"
        alt="admin@kry.se"
      />
    </div>
  );
};

export default LogoSidebar;
