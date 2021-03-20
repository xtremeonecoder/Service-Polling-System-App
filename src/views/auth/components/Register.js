/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { CCol, CContainer, CRow } from "@coreui/react";

import RegisterForm from "./../forms/Register";
import LogoHeader from "./../../core/logo/logo-header";

const Register = (props) => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8 justify-content-center row mb-1">
            <LogoHeader logoClass="core-logo-header" />
          </CCol>
          <CCol md="9" lg="7" xl="6">
            <RegisterForm {...props} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
