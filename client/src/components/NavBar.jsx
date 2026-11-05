import { Link } from "react-router";
import { AuthProvider } from "../context/AuthContext"
import { useContext } from "react"

function NavBar(){
    const session = useContext(AuthProvider);
    
    return (
    <div className="navbar">
        {session ? (
            <Link to="/Logout">Logout</Link>) : <div>(
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>)</div>}
    
    </div>    
    )
}

export default NavBar;