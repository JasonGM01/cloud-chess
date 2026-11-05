function RegisterNewUser() {
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