import React, { useEffect } from "react";
import "./Contact.css";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import ContactInput from "../../components/ContactInput/ContactInput";
import ContactTextarea from "../../components/ContactTextarea/ContactTextarea";
import ContactButton from "../../components/ContactButton/ContactButton";
import Column from "../../components/Column/Column";
import Box from "../../components/Box/Box";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";

const Contact = () => {
    const [state, dispatch] = useProjectContext();

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-success"
        });
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;

        dispatch({
            type: "UPDATE_CONTACT",
            name: name,
            value: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        API.sendMessage(state.contact).then(res => {
            dispatch({
                type: "UPDATE_SUBMITTED",
                name: "",
                email: "",
                message: "",
                submitted: true
            });
        });
    }

    return(
        <Container>
            {console.log(state)}
            <Banner 
                title={"Get in touch!"}
                subtitle={"Thanks for taking the time to browse my project, and I look forward to hearing from you!"}
                subtitle2={
                    <div className="level-left">
                        <div className="">
                            <a className="contact-link" href="https://github.com/b-vu">
                                <i className="fab fa-github"></i>
                                &nbsp;b-vu
                            </a>
                            
                            <br/>
                            <a className="contact-link" href="/">
                                <i className="fab fa-linkedin"></i>
                                &nbsp;LinkedIn
                            </a>
                            
                            <br/>
                            <a className="contact-link" href="mailto:brianvu7@gmail.com">
                                <i className="fas fa-envelope"></i>
                                &nbsp;brianvu7@gmail.com
                            </a>
                        </div>
                    </div>
                }
            />
            <Box>
                <Column>
                    {
                        state.contact.submitted &&
                            <div className="container buttons column is-three-fifths">
                                <p>Thank you for your message! It has been received, and I will respond as soon as possible.</p>
                            </div>
                    }
                </Column>
                <form>
                <Column>
                    <ContactInput
                        name="name"
                        onChange={handleInputChange}
                        value={state.contact.name}
                        label="Name"
                        placeholder="Full Name"
                        fa="has-icons-left"
                        icon="user"
                    />
                </Column>
                <br />
                <Column>
                    <ContactInput
                        name="email"
                        onChange={handleInputChange}
                        value={state.contact.email}
                        label="Email Address"
                        placeholder="Name@Example.com"
                        fa="has-icons-left"
                        icon="envelope"
                    />
                </Column>
                <br />
                <Column>
                    <ContactTextarea
                        name="message"
                        value={state.contact.message}
                        onChange={handleInputChange}
                    />
                </Column>
                <br />
                <Column>
                    <ContactButton
                        onClick={handleSubmit}
                        disabled={(state === undefined || !state.contact.name.length || !state.contact.email.length || !state.contact.message.length)}
                    />
                </Column>
                </form>
                <br/>
            </Box>
        </Container>
    );
}

export default Contact;