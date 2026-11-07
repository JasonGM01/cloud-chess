async function CheckServer() {
    const response = await fetch("http://localhost:4000/api/health");
    const data = await response.json();
    console.log(data);
    alert(`status: ${data.status}`);
}

export default CheckServer