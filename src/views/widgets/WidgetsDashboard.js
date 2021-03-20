/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { CWidgetBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const WidgetsBrand = () => {
  const history = useHistory();

  // render
  return (
    <CRow>
      <CCol sm="6" lg="6">
        <CWidgetBrand
          color="flickr"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/services")}
          bodySlot={<h3 className="text-center py-4">Kry Services</h3>}
        >
          <CIcon name="cilApplicationsSettings" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetBrand
          color="gradient-warning"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/settings")}
          bodySlot={<h3 className="text-center py-4">Kry Settings</h3>}
        >
          <CIcon name="cil-settings" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
