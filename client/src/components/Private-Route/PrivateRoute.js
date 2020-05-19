import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import Feed from "../../pages/Feed/Feed";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useProjectContext();

  return(
    <Route
        {...rest}
        render={() =>
        state.isAuthenticated
        ? 
          <Feed></Feed>
        : 
          <Redirect to="/register" />
        }
    />
  );
}

export default PrivateRoute;