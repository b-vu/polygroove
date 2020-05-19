import React, { useEffect } from "react";
import "./Home.css";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import Column from "../../components/Column/Column";
import Box from "../../components/Box/Box";

const Home = () => {
    const [state, dispatch] = useProjectContext();

    // useEffect(() => {
    //     API.getToken().then(res => {
    //         dispatch({
    //             type: "UPDATE_TOKEN",
    //             token: res.data.access_token
    //         });
    //     })
    // }, []);

    return(
        <Container>
            {console.log(state)}
            <Banner
                title={"Welcome!"}
                subtitle={"The only website you need for all things Music"}
            />
            
        </Container>
    );
}

export default Home;