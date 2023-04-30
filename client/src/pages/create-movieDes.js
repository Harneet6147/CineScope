import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const CreateMovie = () => {

    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies("access_token");

    const [movie, setMovie] = useState({
        name: "",
        director: "",
        hashTags: [],
        storyLine: "",
        views: "",
        duration: 0,
        imageUrl: "",
        userOwner: userID
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    }

    const addTags = () => {
        setMovie({ ...movie, hashTags: [...movie.hashTags, ""] })
    }

    const handleTagChange = (event, idx) => {

        const { value } = event.target;

        const tag = movie.hashTags;
        tag[idx] = value;
        setMovie({ ...movie, hashTags: tag });

    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/movies", movie, { headers: { Authorization: cookies.access_token } });
            alert("Moive Created");
            navigate("/");

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="create-recipe">
            <h2> Create Movie </h2>

            <form onSubmit={onSubmit}>
                <label htmlFor="name" > Name </label>
                <input type="text"
                    id="name"
                    name="name"
                    onChange={handleChange} />

                <label htmlFor="description" > Director </label>
                <textarea
                    name="director"
                    id="description"
                    onChange={handleChange} />

                <label htmlFor="tags"> Tags </label>
                {movie.hashTags.map((tag, idx) => (
                    <input
                        key={idx}
                        type="text"
                        name="hashTags"
                        value={tag}
                        onChange={(event) => handleTagChange(event, idx)} />
                ))}
                <button onClick={addTags} type="button" > Add HashTag </button>

                <label htmlFor="storyline"> StoryLine </label>
                <textarea
                    id="instructons"
                    name="storyLine"
                    onChange={handleChange} >  </textarea>

                <label htmlFor="views"> Views </label>
                <textarea id="instructions"
                    name="views"
                    onChange={handleChange} >  </textarea>

                <label htmlFor="imageUrl" name="imageUrl"  > Image URL </label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleChange} />

                <label htmlFor="duration" > Duration (minutes) </label>
                <input type="number"
                    id="cookingTime"
                    name="duration"
                    onChange={handleChange} />

                <button type="submit" > Create Movie </button>

            </form>


        </div>
    )
}