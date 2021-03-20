/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { Redirect } from "react-router-dom";
import auth from "./../../auth/models/Auth";

const Redirector = ({ access }) => {
  const isAllowed = auth.isAllowed(access);
  if (!isAllowed) return <Redirect to="/403" />;
  return null;
};

export default Redirector;
