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
const apiEndPoint = "/settings";

function settingUrl(settingId) {
  return `${apiEndPoint}/${settingId}`;
}

export function getSettings() {
  return http.get(apiEndPoint);
}

export function getSetting(settingId) {
  return http.get(settingUrl(settingId));
}

export function createSetting(setting) {
  const body = { ...setting };
  return http.post(apiEndPoint, body);
}

export function updateSetting(setting) {
  const body = { ...setting };
  if (body.id) delete body.id;
  return http.put(settingUrl(setting.id), body);
}

export function deleteSetting(settingId) {
  return http.delete(settingUrl(settingId));
}
