import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";
import Favorites from "../../pages/Favorites/Favorites";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useProjectContext();

  return(
    <Route
        {...rest}
        render={() =>
        state.isAuthenticated
        ? 
          <Favorites></Favorites>
        : 
          <Redirect to="/register" />
        }
    />
  );
}

export default PrivateRoute;