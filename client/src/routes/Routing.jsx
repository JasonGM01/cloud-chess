import {Routes, Route} from "react-router";
import App from "../App";
import RegisterNewUser from "../pages/RegisterPage";
import LogInExisting from "../pages/LoginPage";
import LogoutUser from "../pages/LogoutPage";

function Routing(){
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="Register" element={<RegisterNewUser />} />
            <Route path="Login" element={<LogInExisting/>} />
            <Route path="Logout" element={<LogoutUser />} />
        </Routes>
    )
}

export default Routing;