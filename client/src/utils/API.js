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
    }
}