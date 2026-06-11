// API URL
const API_URL = "http://localhost:5000/api";

// Register Function
async function handleRegister() {

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful ✅");

            localStorage.setItem("token", data.token);

        } else {

    // Temporary functions

function showDashboard() {
    alert("Login Successful ✅");
}

function renderTasks() {
    console.log("Tasks Rendered");
}

function updateStats() {
    console.log("Stats Updated");
}

// Tasks array
let tasks = [];       