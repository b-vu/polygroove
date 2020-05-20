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
}