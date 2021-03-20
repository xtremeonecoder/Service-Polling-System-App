/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import auth from "./../models/Auth";

const Signout = () => {
  // remove token
  auth.logout();
  window.location = "/login";

  // return null
  return null;
};

export default Signout;
