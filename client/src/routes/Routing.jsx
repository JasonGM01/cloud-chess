import { Routes, Route } from "react-router";
import App from "../App";
import RegisterNewUser from "../pages/RegisterPage";
import LogInExisting from "../pages/LoginPage";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="Register" element={<RegisterNewUser />} />
            <Route path="Login" element={<LogInExisting />} />
        </Routes>
    )
}

export default Routing;