/**
 * Service Polling System - React Application
 *
 * @category   Application_Frontend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./../views/auth/models/Auth";

const ProtectedRoute = ({ component: Component, render, access, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = auth.getCurrentUser();
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else if (user && (!user._id || !user.email)) {
          return <Redirect to="/403" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
