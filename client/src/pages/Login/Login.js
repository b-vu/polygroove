import React from "react";
import { useProjectContext } from "../../utils/Store";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
    const [state, dispatch] = useProjectContext();

    const handleInputChange = event => {
        const { name, value } = event.target;

        dispatch({
            type: "login update",
            name: name,
            value: value
        });
    }

    return(
        <div>
            <h1 className="title has-text-centered">Login</h1>
            <Input
                onChange={handleInputChange}
                name="email"
                value={state.login.email}
                label="Email"
                placeholder="Email"
                fa="has-icons-left"
                icon="envelope"
            />
            <Input
                onChange={handleInputChange}
                name="password"
                value={state.login.password}
                label="Password"
                placeholder="Password"
                fa="has-icons-left"
                icon="lock"
            />
            <Button/>
        </div>
    );
}

export default Login;