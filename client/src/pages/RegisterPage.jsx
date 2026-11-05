import { useState } from "react";
import Register from "../auth/register";

function RegisterNewUser() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

    async function HandleRegister() {
    const result = await Register(email, password);

    console.log(result);
  }
    return (
        <div>
            <li>
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

            <button onClick={HandleRegister}>
                Register
            </button>
        </div>
    )
}

export default RegisterNewUser;