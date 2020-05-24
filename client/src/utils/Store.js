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
        case "UPDATE_CHARTS":
            return {
                ...state,
                chartSongs: action.chartSongs,
                currentChart: action.currentChart
            }
        case "UPDATE_CURRENT_ARTIST":
            return{
                ...state,
                currentArtist: action.currentArtist
            }
        case "UPDATE_CURRENT_ARTIST_INFO":
            return {
                ...state,
                currentArtistInfo: action.currentArtistInfo
            }
        case "UPDATE_CURRENT_ALBUM":
            return {
                ...state,
                currentAlbum: action.currentAlbum
            }
        case "UPDATE_CURRENT_OTHER_ALBUMS":
            return {
                ...state,
                otherAlbums: action.otherAlbums
            }
        case "UPDATE_CURRENT_TRACK":
            return {
                ...state,
                currentTrack: action.currentTrack
            }
        case "UPDATE_FAVORITE_ARTISTS":
            return {
                ...state,
                favoriteArtists: action.favoriteArtists
            }
        case "UPDATE_ISFAVORITEARTIST":
            return{
                ...state,
                isFavoriteArtist: action.isFavoriteArtist
            }
        case "UPDATE_FAVORITE_ALBUMS":
            return {
                ...state,
                favoriteAlbums: action.favoriteAlbums
            }
        case "UPDATE_ISFAVORITEALBUM":
            return{
                ...state,
                isFavoriteAlbum: action.isFavoriteAlbum
            }
        case "UPDATE_FAVORITE_TRACKS":
            return {
                ...state,
                favoriteTracks: action.favoriteTracks
            }
        case "UPDATE_ISFAVORITETRACK":
            return{
                ...state,
                isFavoriteTrack: action.isFavoriteTrack
            }
        case "UPDATE_RATED_ALBUMS":
            return {
                ...state,
                ratedAlbums: action.ratedAlbums
            }
        case "UPDATE_ISALBUMRATED":
            return{
                ...state,
                isAlbumRated: action.isAlbumRated
            }
        case "UPDATE_RATED_TRACKS":
            return {
                ...state,
                ratedTracks: action.ratedTracks
            }
        case "UPDATE_ISTRACKRATED":
            return {
                ...state,
                isTrackRated: action.isTrackRated
            }
        case "UPDATE_FEED":
            return {
                ...state,
                favoriteArtists: action.favoriteArtists,
                favoriteAlbums: action.favoriteAlbums,
                favoriteTracks: action.favoriteTracks,
                ratedAlbums: action.ratedAlbums,
                ratedTracks: action.ratedTracks
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
        currentChart: "",
        chartSongs: [],
        currentArtist:{},
        currentArtistInfo: {},
        currentAlbum: {},
        otherAlbums: {},
        currentTrack: [],
        favoriteArtists: [],
        isFavoriteArtist: false,
        favoriteAlbums: [],
        isFavoriteAlbum: false,
        favoriteTracks: [],
        isFavoriteTrack: false,
        ratedAlbums: [],
        isAlbumRated: false,
        ratedTracks: [],
        isTrackRated: false,
        feed: ""
    });

    return <Provider value={[state, dispatch]} {...props} />;
}

const useProjectContext = () => {
    return useContext(projectContext);
}

export { ProjectProvider, useProjectContext };