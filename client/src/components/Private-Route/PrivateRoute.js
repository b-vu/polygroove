import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useProjectContext } from "../../utils/Store";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const [state, dispatch] = useProjectContext();

  return(
    <Route
        {...rest}
        render={props =>
        state.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/register" />
        )
        }
    />
  );
}

export default PrivateRoute;