import { Link, useNavigate } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import Logout from "../auth/logout";
import CheckServer from "../database/checkServer";
import TestAuth from "../database/testAuth";
import TestCreateGame from "../database/testCreateGame";

function NavBar() {
    const session = useContext(AuthContext);
    const navigate = useNavigate();

    async function HandleLogout() {
        const result = await Logout();
        console.log("Logout: ", result);
        navigate("/Login");
    }

    return (
        <div className="navbar">
            <button className="block" onClick={TestCreateGame}>Test New Game</button>
            <button className="block" onClick={CheckServer}>Check Server</button>
            <button className="block" onClick={TestAuth}>Test Auth</button>
            <Link to="/" className="block">Home</Link>

            {session ?
                <><button className="block" onClick={HandleLogout}>Logout</button></> :
                <>
                    <Link to="/Login" className="block">Login</Link>
                    <Link to="/Register" className="block">Register</Link>
                </>
            }
        </div>
    )
}

export default NavBar;