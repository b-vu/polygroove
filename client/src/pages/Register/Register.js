import React from "react";
import { useProjectContext } from "../../utils/Store";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { useHistory } from 'react-router-dom';

const Register = () => {
    const [state, dispatch] = useProjectContext();

    let history = useHistory();
    console.log(history);

    const handleInputChange = event => {
        const { name, value } = event.target;

        dispatch({
            type: "register update",
            name: name,
            value: value
        });
    }

    return(
        <div>
            {console.log(state)}
            <h1 className="title has-text-centered">Register</h1>
            <Input
                onChange={handleInputChange}
                name="name"
                value={state.register.name}
                label="Name"
                placeholder="Name"
                fa="has-icons-left"
                icon="user"
            />
            <Input
                onChange={handleInputChange}
                name="email"
                value={state.register.email}
                label="Email"
                placeholder="Email"
                fa="has-icons-left"
                icon="envelope"
            />
            <Input
                onChange={handleInputChange}
                name="password1"
                value={state.register.password1}
                label="Password"
                placeholder="Password"
                fa="has-icons-left"
                icon="lock"
            />
            <Input
                onChange={handleInputChange}
                name="password2"
                value={state.register.password2}
                label="Confirm Password"
                placeholder="Password"
                fa="has-icons-left"
                icon="lock"
            />
            <Button/>
        </div>
    );
}

export default Register;