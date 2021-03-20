/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";

const Signout = React.lazy(() => import("./views/auth/components/Signout"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// settings
const Settings = React.lazy(() =>
  import("./views/settings/components/Settings")
);
const Setting = React.lazy(() => import("./views/settings/components/Setting"));
const SettingEdit = React.lazy(() =>
  import("./views/settings/components/SettingEdit")
);

// services
const Services = React.lazy(() =>
  import("./views/services/components/Services")
);
const Service = React.lazy(() => import("./views/services/components/Service"));
const ServiceCreate = React.lazy(() =>
  import("./views/services/components/ServiceCreate")
);
const ServiceEdit = React.lazy(() =>
  import("./views/services/components/ServiceEdit")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/logout",
    exact: true,
    name: "Logout",
    access: ["admin", "hr"],
    component: Signout,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    access: ["admin", "hr"],
    component: Dashboard,
  },
  {
    path: "/settings",
    exact: true,
    name: "Settings",
    access: ["admin", "hr"],
    component: Settings,
  },
  {
    path: "/settings/:id/details",
    exact: true,
    name: "Settings Details",
    access: ["admin", "hr"],
    component: Setting,
  },
  {
    path: "/settings/:id/edit",
    exact: true,
    name: "Edit Settings",
    access: ["admin", "hr"],
    component: SettingEdit,
  },
  {
    path: "/services",
    exact: true,
    name: "Services",
    access: ["admin", "hr"],
    component: Services,
  },
  {
    path: "/services/:id/details",
    exact: true,
    name: "Service Details",
    access: ["admin", "hr"],
    component: Service,
  },
  {
    path: "/services/create",
    exact: true,
    name: "Add New Service",
    access: ["admin", "hr"],
    component: ServiceCreate,
  },
  {
    path: "/services/:id/edit",
    exact: true,
    name: "Edit Service",
    access: ["admin", "hr"],
    component: ServiceEdit,
  },
];

export default routes;
