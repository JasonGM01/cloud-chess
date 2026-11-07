import { useState } from "react";
import Login from "../auth/login";

function LogInExisting() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function HandleLogin() {
    const result = await Login(email, password);
    console.log(result);
  }
    return (
        <div>
            <li className="input-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

                <input
                    type="password"
                    value={password}
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