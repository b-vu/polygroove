import React, { useEffect } from "react";
import "./Register.css";
import { useProjectContext } from "../../utils/Store";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Box from "../../components/Box/Box";

import { useHistory } from 'react-router-dom';
import { registerUser } from "../../utils/authActions";

const Register = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-success"
        });

        dispatch({
            type: "REGISTER_SUCCESS"
        });
    }, []);

    let history = useHistory();

    const handleInputChange = event => {
        const { name, value } = event.target;

        dispatch({
            type: "REGISTER_UPDATE",
            name: name,
            value: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        const newUser = state.register;

        registerUser(newUser)
        .then(res => {
            dispatch({
                type: "REGISTER_SUCCESS"
            });
            history.push("/login");
        })
        .catch(err => {
            dispatch({
                type: "UPDATE_ERROR",
                error: err.response.data
            });
        });
    }

    if(state.isAuthenticated){
        history.push("/");
    }

    return(
        <div>
            <Container>
                <Box>
                    <h1 className="title has-text-centered">Register</h1>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="name"
                            value={state.register.name}
                            label="Name"
                            placeholder="Name"
                            type="text"
                            fa="has-icons-left"
                            icon="user"
                        />

                        {
                            state.error.name.length !== 0 &&
                            <p className="has-text-centered error-text">{state.error.name}</p>
                        }

                        <Input
                            onChange={handleInputChange}
                            name="email"
                            value={state.register.email}
                            label="Email"
                            placeholder="Email"
                            type="text"
                            fa="has-icons-left"
                            icon="envelope"
                        />

                        {
                            state.error.email.length !== 0 &&
                            <p className="has-text-centered error-text">{state.error.email}</p>
                        }

                        <Input
                            onChange={handleInputChange}
                            name="password1"
                            value={state.register.password1}
                            label="Password"
                            placeholder="Password"
                            type="password"
                            fa="has-icons-left"
                            icon="lock"
                        />

                        {
                            state.error.password1.length !== 0 &&
                            <p className="has-text-centered error-text">{state.error.password1}</p>
                        }

                        <Input
                            onChange={handleInputChange}
                            name="password2"
                            value={state.register.password2}
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            fa="has-icons-left"
                            icon="lock"
                        />

                        {
                            state.error.password2.length !== 0 &&
                            <p className="has-text-centered error-text">{state.error.password2}</p>
                        }

                        <Button
                            onClick={handleSubmit}
                        />
                    </form>
                    <br/>
                    <p className="has-text-centered">Have an account already? Log in <Link to={"/login"}>here!</Link></p>
                </Box>
            </Container>
        </div>
    );
}

export default Register;