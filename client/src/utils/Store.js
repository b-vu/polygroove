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
                user: action.payload
            }
        case "USER_LOADING":
            return {
                ...state,
                loading: true
            }
        case "GET_ERRORS":
            return action.payload;
        case "register update":
            return {
                ...state,
                register: {
                    ...state.register,
                    [action.name]: action.value
            }
        }
        case "login update":
            return {
                ...state,
                login: {
                    ...state.login,
                    [action.name]: action.value
            }
        }
        default:
            return state;
    }
}

const ProjectProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        user: {},
        loading: false,
        register: {
            name: "",
            email:"",
            password1: "",
            password2: ""
        },
        login: {
            email: "",
            password: ""
        }
    });

    return <Provider value={[state, dispatch]} {...props} />;
}

const useProjectContext = () => {
    return useContext(projectContext);
}

export { ProjectProvider, useProjectContext };