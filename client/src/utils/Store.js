import React, { createContext, useReducer, useContext } from "react";

const isEmpty = require("is-empty");

const projectContext = createContext();
const { Provider } = projectContext;

const reducer = (state, action) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                login: {
                    email: "",
                    password: ""
                }
            }
        case "REGISTER_UPDATE":
            return {
                ...state,
                register: {
                    ...state.register,
                    [action.name]: action.value
            }
        }
        case "LOGIN_UPDATE":
            return {
                ...state,
                login: {
                    ...state.login,
                    [action.name]: action.value
            }
        }
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.token
            }
        case "UPDATE_TOP50USA":
            return {
                ...state,
                top50USA: action.top50USA
            }
        default:
            return state;
    }
}

const ProjectProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        user: {},
        register: {
            name: "",
            email:"",
            password1: "",
            password2: ""
        },
        login: {
            email: "",
            password: ""
        },
        token: "",
        top50USA: []
    });

    return <Provider value={[state, dispatch]} {...props} />;
}

const useProjectContext = () => {
    return useContext(projectContext);
}

export { ProjectProvider, useProjectContext };