import { useState } from "react";
import { useNavigate } from "react-router";
import Register from "../auth/register";

function RegisterNewUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    async function HandleRegister() {
        const result = await Register(email, username, password);
        console.log(result);
        alert("Please verify email and login");
        if (result?.user) {
            navigate("/Login");
        }
    }
    
    return (
        <div>
            <li className="input-form">
                <input
                    className="attribute"
                    type="email"
                    value={email}
                    placeholder="johndoe@example.com"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

                <input 
                    className="attribute"
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />

                <input
                    className="attribute"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </li>

            <button onClick={HandleRegister}>
                Register
            </button>
        </div>
    )
}

export default RegisterNewUser;