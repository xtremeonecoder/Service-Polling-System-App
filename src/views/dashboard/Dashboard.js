/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { lazy } from "react";
import { CCard, CCardBody, CRow } from "@coreui/react";

const WidgetsDashboard = lazy(() => import("./../widgets/WidgetsDashboard"));

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow className="d-flex justify-content-center">
            <h2>Kry Service Polling System</h2>
          </CRow>
        </CCardBody>
      </CCard>

      <WidgetsDashboard />
    </>
  );
};

export default Dashboard;
