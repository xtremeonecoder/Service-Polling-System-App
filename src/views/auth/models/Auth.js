/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import jwtDecode from "jwt-decode";
import http from "./../../../services/http-service";
import { apiUrl } from "./../../../config.json";

const tokenKey = "token";
const apiEndPoint = apiUrl + "/auth";

// set json web token
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });

  // store the json web token to local-storage of browser
  // and redirect the user to the home page
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  // store the jwt into the local-storage
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function isSelf(userID) {
  const user = getCurrentUser();
  if (userID && user && user.employeeID === userID) return true;
  return false;
}

export function isAdmin() {
  const user = getCurrentUser();
  if (user && user.isAdmin) return true;
  return false;
}

export function isHumanResource() {
  const user = getCurrentUser();
  if (user && user.isHR) return true;
  return false;
}

export function isEmployee() {
  const user = getCurrentUser();
  if (user && user.isEmployee) return true;
  return false;
}

export function getIdentity() {
  const user = getCurrentUser();
  if (user && user.employeeID) return user.employeeID;
  return null;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAllowed(access = []) {
  const user = getCurrentUser();

  if (user && access && access.length) {
    if (user.isAdmin && access.includes("admin")) return true;
    if (user.isHR && access.includes("hr")) return true;
    if (user.isEmployee && access.includes("employee")) return true;
  }

  return false;
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  isSelf,
  isAdmin,
  isHumanResource,
  isEmployee,
  getIdentity,
  getJwt,
  isAllowed,
};
