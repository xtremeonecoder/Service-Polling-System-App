import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";
import auth from "./../views/auth/models/Auth";
import LogoSidebar from "./../views/core/logo/logo-sidebar";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  // customize navigation as per user access
  const customNavigation = navigation.filter((item) => {
    if (item && item.access && auth.isAllowed(item.access)) {
      delete item.access;
      return item;
    }

    return false;
  });

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <LogoSidebar logoClass="core-logo-sidebar" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={customNavigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
