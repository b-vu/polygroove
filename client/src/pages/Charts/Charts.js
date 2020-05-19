import React, { useEffect } from "react";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";
import Container from "../../components/Container/Container";
import Box from "../../components/Box/Box";

const Charts = () => {
    const [state, dispatch] = useProjectContext();

    const displayTop50 = songs => {
        const top50USA = [];

        for(const song of songs){
            let songObj = {
                artist: song.track.artists[0].name,
                song: song.track.name,
                image: song.track.album.images[1].url
            }
            top50USA.push(songObj);
        }

        dispatch({
            type: "UPDATE_TOP50USA",
            top50USA: top50USA
        });
    }

    useEffect(() => {
        API.getToken().then(res => {
            API.getUSATop50(res.data.access_token).then(res => {
                console.log(res.data);
                displayTop50(res.data.items);
            })
            dispatch({
                type: "UPDATE_TOKEN",
                token: res.data.access_token
            });
        })
    }, []);

    return(
        <div>
            <Container>
                <Box>
                    {state.top50USA.length
                    ?
                    (state.top50USA.map((song, index) => 
                        <Box key={index}>
                            <img className="image" src={song.image}></img>
                            <p>{song.song} by {song.artist}</p>
                        </Box>
                        )
                    )
                    :
                    null
                    }
                </Box>
            </Container>
        </div>
    );
}

export default Charts;