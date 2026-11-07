import { Link } from "react-router";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import Logout from "../auth/logout";
import CheckServer from "../database/checkServer";

function NavBar() {
    const session = useContext(AuthContext);

    async function HandleLogout() {
        const result = await Logout();
        console.log("Logout: ", result);
    }

    return (
        <div className="navbar">
            <button className="block" onClick={CheckServer}>Check Server</button>
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