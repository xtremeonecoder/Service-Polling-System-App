/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { shallow } from "enzyme/build";
import App from "./App";

it("mounts without crashing", () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});
