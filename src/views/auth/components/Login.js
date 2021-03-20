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
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CLink,
} from "@coreui/react";

import LoginForm from "./../forms/Login";
import LogoHeader from "./../../core/logo/logo-header";

const Login = (props) => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8 justify-content-center row mb-1">
            <LogoHeader logoClass="core-logo-header" />
          </CCol>
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <LoginForm {...props} />
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-dark py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Register with Kry</h2>
                    <p>This application is used for polling web services.</p>
                    <CLink to="register" style={{ color: "darkorange" }}>
                      <h3>Register</h3>
                    </CLink>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
