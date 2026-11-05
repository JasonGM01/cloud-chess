import Logout from "../auth/logout";

function LogoutUser() {
    async function HandleLogout() {
        const result = await Logout();
        console.log("Logout: ", result);
    }
    return (
        <div>
            <button onClick={HandleLogout}>
                Logout
            </button>
        </div>
    )
}

export default LogoutUser;