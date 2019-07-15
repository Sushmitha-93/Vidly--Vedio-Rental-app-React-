import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      //path={path}  //Since rest will take care of this assignment from prop
      {...rest} //Creates similar variables as props passes to this component
      render={props => {
        if (!user) return <Redirect to="/loginForm" />;
        return Component ? <Component {...props} /> : render(props);
      }} //PROTECTING ROUTE movies/new if user is not logged in and tries to go to new form by editing the link (because "New" button will be disabled)
    />
  );
};

export default ProtectedRoute;
