import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import axios from "axios";

export const SavedMovies = () => {

    const [savedMovies, setSavedMovies] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {

        const fetchSavedMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies/savedMovies/${userID}`);
                setSavedMovies(response.data.savedMovies);
            } catch (err) {
                console.log(err);
            }
        };
        
        fetchSavedMovies();
    }, []);

    return (
        <div>
            <h1>Saved Movies</h1>
            <ul>
                {savedMovies.map((movie) => (
                    <li key={movie._id}>
                        <div>
                            <h2>{movie.name}</h2>
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
                            <p>{movie.storyLine}</p>
                        </div>
                        <img src={movie.imageUrl} alt={movie.name} />
                        <p>Duration: {movie.duration} minutes</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};