import { useState } from "react";
import { useNavigate } from "react-router";
import Login from "../auth/login";

function LogInExisting() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function HandleLogin() {
        const result = await Login(email, password);
        console.log(result);
        if (result?.session) {
            navigate("/");
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
                    type="password"
                    value={password}
                    placeholder="loremipsum"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </li>

            <button onClick={HandleLogin}>
                Login
            </button>
        </div>
    )
}

export default LogInExisting;