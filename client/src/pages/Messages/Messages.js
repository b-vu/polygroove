import React, { useEffect } from "react";
import "./Messages.css";
import { useProjectContext } from "../../utils/Store";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import Box from "../../components/Box/Box";
import Column from "../../components/Column/Column";

const Messages = () => {
    const [state, dispatch] = useProjectContext();

    const { id } = useParams();

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-primary"
        });
    }, []);

    return(
        <Box>
            <Column>
                <div className="column is-2">
                    <Box>
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                Contacts
                            </p>
                        </aside>
                    </Box>
                </div>
                <div className="column is-8">
                    <Box>
                        <aside className="menu has-text-centered">
                            <p className="menu-label">
                                Messages
                            </p>
                        </aside>
                    </Box>
                </div>
            </Column>
        </Box>
    );
}

export default Messages;