import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();

    const [cookies, setCookies] = useCookies(["access_token"]);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("UserID");
        navigate("/auth");
    }

    return (
        <div className="navbar">
            <Link to="/" > Home </Link>
            <Link to="/create-movie" > Create-movie-card </Link>

            {!cookies.access_token ?
                (<Link to="/auth" > Register/Login </Link>)
                :
                <>
                    <Link to="/saved-movies" > Saved-Movies </Link>
                    <button onClick={logout}> Logout </button>
                </>
            }
        </div>
    )
}