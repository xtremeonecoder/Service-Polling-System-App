export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Kry Account Information"],
    access: ["hr", "admin", "employee"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-home",
    access: ["hr", "admin", "employee"],
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Signout Account",
    to: "/logout",
    icon: "cil-ban",
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Kry Web Services"],
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "View All Services",
    to: "/services",
    icon: "cil-lock-locked",
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add New Service",
    to: "/services/create",
    icon: "cil-check-circle",
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Administrative Settings"],
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "General Settings",
    to: "/settings",
    icon: "cil-settings",
    access: ["hr", "admin"],
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
    access: ["hr", "admin", "employee"],
  },
];
