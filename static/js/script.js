const tempEl = document.getElementById("room-temp");
const peakEl = document.getElementById("peak-temp");
const locEl = document.getElementById("location");
const fireEl = document.getElementById("fire-status");

const ctx = document.getElementById("tempChart").getContext("2d");
const labels = [];
const dataPoints = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature (°C)',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            data: dataPoints,
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100
            }
        }
    }
});

// Button handling
const initializeBtn = document.querySelector('.btn.grey');
const startBtn = document.querySelector('.btn.green');
const stopBtn = document.querySelector('.btn.red');

let isInitialized = false;
let isMonitoring = false;
let distance = 0;  // Initial distance (in meters)
let temp = 25;     // Initial temperature (in °C)

// Initialize Button
initializeBtn.addEventListener('click', () => {
    isInitialized = true;
    isMonitoring = false;
    alert("System Initialized");
    console.log("System Initialized");
});

// Start Button
startBtn.addEventListener('click', () => {
    if (!isInitialized) {
        alert("Please initialize the system first.");
        return;
    }
    if (isMonitoring) {
        alert("Monitoring is already running.");
        return;
    }
    isMonitoring = true;
    alert("Monitoring Started");
    console.log("Monitoring Started");
});

// Stop Button
stopBtn.addEventListener('click', () => {
    if (!isMonitoring) {
        alert("Monitoring is not running.");
        return;
    }
    isMonitoring = false;
    alert("Monitoring Stopped");
    console.log("Monitoring Stopped");
});

// Function to simulate the temperature spike and regular temp
function simulateTemperature() {
    // If the distance reaches multiples of 150 meters, raise the temperature above 60°C
    if (distance % 150 === 0) {
        temp = 65;  // Raise temperature above 60°C for the spike
    } else {
        temp = 25 + Math.random() * 10;  // Keep the temperature in a normal range (25 to 35°C)
    }
}

// Data polling logic
setInterval(() => {
    if (!isMonitoring) return;

    // Increase distance by 10 meters each interval
    distance += 10;

    // Simulate the temperature spike or normal temperature
    simulateTemperature();

    // Update the DOM with the new temperature and distance
    tempEl.innerText = `${temp.toFixed(1)} °C`;
    peakEl.innerText = `${temp.toFixed(1)} °C`;
    locEl.innerText = `${distance} m`;

    // Fire detection logic
    if (temp > 60) {
        fireEl.innerText = "FIRE!";
        fireEl.style.backgroundColor = "red";
    } else {
        fireEl.innerText = "SAFE";
        fireEl.style.backgroundColor = "green";
    }

    // 🔥 Highlight zones based on temperature and distance
    const zoneIndex = Math.min(10, Math.ceil(distance / 100));
    for (let i = 1; i <= 10; i++) {
        const led = document.getElementById(`led${i}`);
        if (i === zoneIndex && temp > 60) {
            led.classList.remove('green');
            led.classList.add('red');
        } else {
            led.classList.remove('red');
            led.classList.add('green');
        }
    }

    // Update chart data
    labels.push(distance);
    dataPoints.push(temp);

    // Keep chart data under control (only show the last 50 data points)
    if (labels.length > 50) {
        labels.shift();
        dataPoints.shift();
    }

    chart.update();
}, 2000);
