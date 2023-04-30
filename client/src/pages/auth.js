import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
}


const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies("access_token");

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post("http://localhost:3001/users/login", {
                username, password
            });

            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.UserID);
            navigate("/");

        } catch (error) {
            console.log(error);
        }

    }

    return <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
    />
}

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/users/register", {
                username, password
            });
            alert("registration completed");

        } catch (error) {
            console.log(error);
        }
    }

    return <Form
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
    />
}


const Form = ({ username, password, setUsername, setPassword, label, onSubmit }) => {

    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} >
                <h2> {label} </h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>

                <button type="submit"> {label} </button>
            </form>
        </div>
    )

}