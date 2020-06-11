import React, { useEffect } from "react";
import API from "../../utils/API";
import { useProjectContext } from "../../utils/Store";
import Box from "../../components/Box/Box";
import Card from "../../components/Card/Card";
import RatedCards from "../../components/RatedCards/RatedCards";
import Column from "../../components/Column/Column";

const Charts = () => {
    const [state, dispatch] = useProjectContext();

    const displayUSTop50 = token => {
        const top50USA = [];

        API.getUSATop50(token).then(res => {
            for(const song of res.data.items){
                let songObj = {
                    image: song.track.album.images[1].url,
                    artist: song.track.artists[0].name,
                    song: song.track.name,
                    album: song.track.album.name,
                    spotifyArtist: song.track.artists[0].external_urls.spotify,
                    spotifySong: song.track.external_urls.spotify,
                    spotifyAlbum: song.track.album.external_urls.spotify,
                    artistID: song.track.artists[0].id,
                    albumID: song.track.album.id,
                    trackID: song.track.id
                }
                top50USA.push(songObj);
            }
    
            dispatch({
                type: "UPDATE_CHARTS",
                chartSongs: top50USA,
                currentChart: "US Top 50"
            });
        });
    }

    const displayCharts = event => {
        const { name } = event.target;

        switch(name){
            case "Global Top 50":
                const top50Global = [];

                return (
                    API.getGlobalTop50(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            top50Global.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: top50Global,
                            currentChart: name
                        });
                    })
                );

            case "Hottest Hip Hop": 
                const topHipHop = [];

                return (
                    API.getHipHop(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topHipHop.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topHipHop,
                            currentChart: name
                        });
                    })
                );

            case "Top Pop": 
                const topPop = [];

                return (
                    API.getPop(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topPop.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topPop,
                            currentChart: name
                        });
                    })
                );

            case "The Best In Indie":
                const topIndie = [];

                return (
                    API.getIndie(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topIndie.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topIndie,
                            currentChart: name
                        });
                    })
                );

            case "Top Country Songs, y'all":
                const topCountry = [];

                return (
                    API.getCountry(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topCountry.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topCountry,
                            currentChart: name
                        });
                    })
                );

            case "Rockin' and Rollin'":
                const topRock = [];

                return (
                    API.getRock(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topRock.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topRock,
                            currentChart: name
                        });
                    })
                );
                
            case "Top Kpop":
                const topKpop = [];

                return (
                    API.getKpop(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topKpop.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topKpop,
                            currentChart: name
                        });
                    })
                );
                
            case "Top EDM":
                const topEDM = [];

                return (
                    API.getEDM(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topEDM.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topEDM,
                            currentChart: name
                        });
                    })
                );

            case "The Smoothest Jazz":
                const topJazz = [];

                return (
                    API.getJazz(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topJazz.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topJazz,
                            currentChart: name
                        });
                    })
                );
                            
            case "Top Latin":
                const topLatin = [];

                return (
                    API.getLatin(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topLatin.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topLatin,
                            currentChart: name
                        });
                    })
                );

            case "Kickass Metal":
                const topMetal = [];

                return (
                    API.getMetal(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            topMetal.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topMetal,
                            currentChart: name
                        });
                    })
                );

            case "New Releases":
                const newReleases = [];

                return (
                    API.getNewReleases(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            newReleases.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: newReleases,
                            currentChart: name
                        });
                    })
                );

            case "Top Rated Albums":
                const topAlbums = [];

                return (
                    API.getAllAlbumRatings().then(res => {
                        for(const album of res.data){
                            let avgRating = 0;
                            let albumObj = {
                                album: album.name,
                                albumID: album.id,
                                artist: album.artist,
                                artistID: album.artistID,
                                image: album.image
                            }

                            for(const rating of album.ratings){
                                avgRating += rating.rating;
                            }

                            avgRating = parseInt(avgRating.toFixed(2)) / album.ratings.length;

                            albumObj.avgRating = avgRating;
                            albumObj.numRatings = album.ratings.length;

                            topAlbums.push(albumObj);
                        }

                        topAlbums.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : (a.numRatings < b.numRatings ? 1 : (b.numRatings < a.numRatings ? -1 : 0))));

                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topAlbums,
                            currentChart: name
                        });
                    })
                );

            case "Top Rated Tracks":
                const topTracks = [];

                return (
                    API.getAllTrackRatings().then(res => {
                        for(const track of res.data){
                            let avgRating = 0;
                            let trackObj = {
                                track: track.name,
                                trackID: track.id,
                                album: track.album,
                                albumID: track.albumID,
                                artist: track.artist,
                                artistID: track.artistID,
                                image: track.image
                            }

                            for(const rating of track.ratings){
                                avgRating += rating.rating;
                            }

                            avgRating = parseInt(avgRating.toFixed(2)) / track.ratings.length;

                            trackObj.avgRating = avgRating;
                            trackObj.numRatings = track.ratings.length;

                            topTracks.push(trackObj);
                        }
                        topTracks.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : 0));
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: topTracks,
                            currentChart: name
                        });
                    })
                );

            default:
                    const top50USA = []

                    API.getUSATop50(state.token).then(res => {
                        for(const song of res.data.items){
                            if(song.track === null){
                                continue;
                            }
                            let songObj = {
                                image: song.track.album.images[1].url,
                                artist: song.track.artists[0].name,
                                song: song.track.name,
                                album: song.track.album.name,
                                spotifyArtist: song.track.artists[0].external_urls.spotify,
                                spotifySong: song.track.external_urls.spotify,
                                spotifyAlbum: song.track.album.external_urls.spotify,
                                artistID: song.track.artists[0].id,
                                albumID: song.track.album.id,
                                trackID: song.track.id
                            }
                            top50USA.push(songObj);
                        }
                
                        dispatch({
                            type: "UPDATE_CHARTS",
                            chartSongs: top50USA,
                            currentChart: "US Top 50"
                        });
                    });
        }
    }

    useEffect(() => {
        dispatch({
            type: "UPDATE_NAV",
            navState: "is-info"
        });

        API.getToken().then(res => {
            if(state.chartSongs.length){
                return
            }
            else{
                displayUSTop50(res.data.access_token);
                dispatch({
                type: "UPDATE_TOKEN",
                token: res.data.access_token
                })
            }
        })
    }, []);

    return(
            <Box>
                <Column>
                    <div className="column is-2">
                        <Box>
                            <aside className="menu">
                                <p className="menu-label">
                                    Hot & Trending
                                </p>
                                <ul className="menu-list">
                                    <li onClick={displayCharts}><a name="US Top 50" href="#">US Top 50</a></li>
                                    <li onClick={displayCharts}><a name="Global Top 50" href="#">Global Top 50</a></li>
                                    <li onClick={displayCharts}><a name="New Releases" href="#">New Releases</a></li>
                                </ul>
                                <p className="menu-label">
                                    Top Tracks By Genre
                                </p>
                                <ul className="menu-list">
                                    <li onClick={displayCharts}><a name="Hottest Hip Hop" href="#">Hip Hop</a></li>
                                    <li onClick={displayCharts}><a name="Top Pop" href="#">Pop</a></li>
                                    <li onClick={displayCharts}><a name="The Best In Indie" href="#">Indie</a></li>
                                    <li onClick={displayCharts}><a name="Top Country Songs, y'all" href="#">Country</a></li>
                                    <li onClick={displayCharts}><a name="Rockin' and Rollin'" href="#">Rock</a></li>
                                    <li onClick={displayCharts}><a name="Top Kpop" href="#">Kpop</a></li>
                                    <li onClick={displayCharts}><a name="Top EDM" href="#">EDM</a></li>
                                    <li onClick={displayCharts}><a name="The Smoothest Jazz" href="#">Jazz</a></li>
                                    <li onClick={displayCharts}><a name="Top Latin" href="#">Latin</a></li>
                                    <li onClick={displayCharts}><a name="Kickass Metal" href="#">Metal</a></li>
                                </ul>
                                <p className="menu-label">
                                    Top Rated
                                </p>
                                <ul className="menu-list">
                                    <li onClick={displayCharts}><a name="Top Rated Albums" href="#">Top Rated Albums</a></li>
                                    <li onClick={displayCharts}><a name="Top Rated Tracks" href="#">Top Rated Tracks</a></li>
                                </ul>
                            </aside>
                        </Box>
                    </div>
                    <div className="column">
                        <Box>
                            <h1 className="title has-text-centered">{state.currentChart}</h1>
                            {
                                state.chartSongs.length !== 0 && (state.currentChart !== "Top Rated Albums" && state.currentChart !== "Top Rated Tracks") &&
                                (state.chartSongs.map((song, index) => 
                                    <Card
                                        image={song.image}
                                        artist={song.artist}
                                        song={song.song}
                                        album={song.album}
                                        spotifyArtist={song.spotifyArtist}
                                        spotifySong={song.spotifySong}
                                        spotifyAlbum={song.spotifyAlbum}
                                        artistID={song.artistID}
                                        albumID={song.albumID}
                                        trackID={song.trackID}
                                        rank={index+1}
                                        key={index}
                                    />)
                                )
                            }
                            {
                                state.chartSongs.length !== 0 && state.currentChart === "Top Rated Albums" &&
                                (state.chartSongs.map((item, index) => 
                                    <RatedCards
                                        track={item.track && item.track}
                                        trackID={item.trackID && item.trackID}
                                        album={item.album}
                                        albumID={item.albumID}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        avgRating={item.avgRating}
                                        numRatings={item.numRatings}
                                        image={item.image}
                                        rank={index+1}
                                        key={index}
                                    />)
                                )
                            }
                            {
                                state.chartSongs.length !== 0 && state.currentChart === "Top Rated Tracks" &&
                                (state.chartSongs.map((item, index) => 
                                    <RatedCards
                                        track={item.track && item.track}
                                        trackID={item.trackID && item.trackID}
                                        album={item.album}
                                        albumID={item.albumID}
                                        artist={item.artist}
                                        artistID={item.artistID}
                                        avgRating={item.avgRating}
                                        numRatings={item.numRatings}
                                        image={item.image}
                                        rank={index+1}
                                        key={index}
                                    />)
                                )
                            }
                        </Box>
                    </div>
                </Column>
            </Box>
    );
}

export default Charts;