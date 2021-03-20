/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import http from "./../../../services/http-service";

// api end point
const apiEndPoint = "/services";

function serviceUrl(serviceId) {
  return `${apiEndPoint}/${serviceId}`;
}

export function getServices() {
  return http.get(apiEndPoint);
}

export function getService(serviceId) {
  return http.get(serviceUrl(serviceId));
}

export function createService(service) {
  const body = { ...service };
  return http.post(apiEndPoint, body);
}

export function updateService(service) {
  const body = { ...service };
  if (body.id) delete body.id;
  return http.put(serviceUrl(service.id), body);
}

export function deleteService(serviceId) {
  return http.delete(serviceUrl(serviceId));
}
