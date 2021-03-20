/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import http from "./../../../services/http-service";
import { apiUrl } from "./../../../config.json";

const apiEndPoint = apiUrl + "/users";

export function register(data) {
  return http.post(apiEndPoint, {
    email: data.username,
    password: data.password,
    confpass: data.confpass,
    name: data.name,
  });
}
