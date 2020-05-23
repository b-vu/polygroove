import axios from "axios";
const querystring = require("query-string");

export default {
    getToken: function(){
        return axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({grant_type: 'client_credentials'}),
            {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                  username: process.env.REACT_APP_CLIENT_ID,
                  password: process.env.REACT_APP_CLIENT_SECRET,
                }
            }
        );
    },
    getUSATop50: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getGlobalTop50: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getHipHop: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getPop: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DWUa8ZRTfalHk/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getIndie: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX2Nc3B70tvx0/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getCountry: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX1lVhptIYRda/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getRock: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DXcF6B6QPhFDv/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getKpop: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX9tPFwDMOaN1/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getEDM: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX4dyzvuaRJ0n/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getJazz: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX7YCknf2jT6s/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getLatin: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getMetal: function(token) {
        return axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DWTcqUzwhNmKv/tracks",
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getArtistInfo: async function(id, token, name){
        return Promise.all([
            axios.get(
                `https://api.spotify.com/v1/artists/${id}`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            ),
            axios.get(
                `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            ),
            axios.get(
                `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            ),
            axios.get(
                `https://api.spotify.com/v1/artists/${id}/related-artists`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            )
        ]);
    },
    getAlbumInfo: function(id, token){
        return axios.get(
            `https://api.spotify.com/v1/albums/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getAlbums: function(id, token){
        return axios.get(
            `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }
        );
    },
    getGeniusArtistInfo: function(name){
        return axios.get(
            `https://serene-atoll-63730.herokuapp.com/https://api.genius.com/search?q=${name}`,
            {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
                }
            }
        ).then(res => {
            return axios.get(
                `https://serene-atoll-63730.herokuapp.com/https://api.genius.com/artists/${res.data.response.hits[0].result.primary_artist.id}?text_format=html`,
            {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
                }
            }
            )
        });
    },
    getTrackInfo: function(name, id, token){
        return Promise.all([
            axios.get(
                `https://serene-atoll-63730.herokuapp.com/https://api.genius.com/search?q=${name}`,
                {
                    headers: {
                      Authorization: `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
                    }
                }
            ),
            axios.get(
                `https://api.spotify.com/v1/tracks/${id}`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }
            )
        ])
    },
    checkFavorites: function(userID){
        return axios.get(`/api/favorites/artist/${userID}`);
    },
    addFavoriteArtist: function(userID, artistData){
        return axios.post(`/api/favorites/artist/${userID}`, artistData);
    },
    removeFavoriteArtist: function(userID, artistData){
        return axios.put(`/api/favorites/artist/${userID}`, artistData);
    },
    addFavoriteAlbum: function(userID, albumData){
        return axios.post(`/api/favorites/album/${userID}`, albumData);
    },
    removeFavoriteAlbum: function(userID, albumData){
        return axios.put(`/api/favorites/album/${userID}`, albumData);
    },
    addFavoriteTrack: function(userID, trackData){
        return axios.post(`/api/favorites/track/${userID}`, trackData);
    },
    removeFavoriteTrack: function(userID, trackData){
        return axios.put(`/api/favorites/track/${userID}`, trackData);
    },
    getRatings: function(userID){
        return axios.get(`/api/ratings/album/${userID}`);
    },
    addAlbumRating: function(userID, albumRating){
        return axios.post(`/api/ratings/album/${userID}`, albumRating);
    },
    editAlbumRating: function(userID, albumRating){
        return axios.put(`/api/ratings/album/${userID}`, albumRating);
    },
    addTrackRating: function(userID, trackRating){
        return axios.post(`/api/ratings/track/${userID}`, trackRating);
    },
    editTrackRating: function(userID, trackRating){
        return axios.put(`/api/ratings/track/${userID}`, trackRating);
    }
}