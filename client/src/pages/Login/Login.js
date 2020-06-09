import React, { useEffect } from "react";
import { useProjectContext } from "../../utils/Store";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Box from "../../components/Box/Box";

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-success"
        });
    }, []);

    let history = useHistory();

    const handleInputChange = event => {
        const { name, value } = event.target;

        dispatch({
            type: "LOGIN_UPDATE",
            name: name,
            value: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        const userData = state.login;

        loginUser(userData);
    }

    const loginUser = userData => {
        console.log(userData)
        axios
          .post("/api/users/login", userData)
          .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            console.log(token)
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            console.log(decoded);
            dispatch(setCurrentUser(decoded));
          })
          .catch(err =>
            console.log(err.response.data)
          );
      };
      
      // Set logged in user
      const setCurrentUser = decoded => {
        return {
          type: "SET_CURRENT_USER",
          payload: decoded
        };
      };

      if(state.isAuthenticated){
          history.push("/");
      }

    return(
        <div>
            {console.log(state)}
            <Container>
                <Box>
                    <h1 className="title has-text-centered">Login</h1>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="email"
                            value={state.login.email}
                            label="Email"
                            placeholder="Email"
                            type="text"
                            fa="has-icons-left"
                            icon="envelope"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="password"
                            value={state.login.password}
                            label="Password"
                            placeholder="Password"
                            type="password"
                            fa="has-icons-left"
                            icon="lock"
                        />
                        <Button
                            onClick={handleSubmit}
                        />
                    </form>
                    <br/>
                    <p className="has-text-centered">Don't have an account yet? Register <Link to={"/register"}>here!</Link></p>
                </Box>
            </Container>
        </div>
    );
}

export default Login;