async function CheckServer() {
    const response = await fetch("http://localhost:4000/api/health");
    const data = await response.json();
    console.log("Server status:", data.status);
    alert("Check console");
}

export default CheckServer