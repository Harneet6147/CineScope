import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";
import axios from "axios";

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [cookies, _] = useCookies("access_token");

    const userID = useGetUserID();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:3001/movies");
                setMovies(response.data.Movies);
            } catch (err) {
                console.log(err);
            }
        };


        const fetchSavedMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies/savedMovies/ids/${userID}`);
                setSavedMovies(response.data.savedMovies);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchMovies();
        if (cookies.access_token)
            fetchSavedMovies();
    }, []);

    const saveMovie = async (movieID) => {
        try {
            const response = await axios.put("http://localhost:3001/movies", {
                movieID,
                userID,
            }, { headers: { Authorization: cookies.access_token } });
            setSavedMovies(response.data.savedMovies);
        } catch (err) {
            console.log(err);
        }
    };

    const isMovieSaved = (id) => {
        return savedMovies.includes(id);
    }

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        <div>
                            <h2>{movie.name}</h2>
                            <button
                                onClick={() => saveMovie(movie._id)}
                                disabled={isMovieSaved(movie._id)}>
                                {isMovieSaved(movie._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className="instructions">
                            <b>Director: </b> {movie.director}
                        </div>
                        <div className="instructions">
                            <p> <b> Tags: </b> {movie.hashTags.map((tag, idx) => { return (<span> {tag} | </span>) })}</p>
                        </div>
                        <div className="instructions">
                            <p> <b> My Views:</b> {movie.views} </p>
                        </div>
                        <div className="instructions">
                            <p> <b> Story Line: </b>{movie.storyLine}</p>
                        </div>
                        <img src={movie.imageUrl} alt={movie.name} />
                        <p><b>Duration: </b> {movie.duration} minutes</p>

                        <div className="instructions">
                            <span> <b>Created By: </b> {movie.userOwner} </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};