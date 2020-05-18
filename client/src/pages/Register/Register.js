import React from "react";
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

        registerUser(newUser, history);
    }

    if(state.isAuthenticated){
        history.push("/");
    }

    return(
        <div>
            {console.log(state)}
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