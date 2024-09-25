// un used algortithm for art generative 

function generateArt() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');

    // Set a dark gradient background
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, canvas.width);
    gradient.addColorStop(0, '#1b2735');
    gradient.addColorStop(1, '#0c0c34');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random nebula-like circles with transparency
    const circleCount = Math.floor(Math.random() * 10) + 10; // Random number of circles
    for (let i = 0; i < circleCount; i++) {
        drawRandomCircle(ctx);
    }

    // Draw random thin lines to add the sharp contrast
    const lineCount = Math.floor(Math.random() * 8) + 5;
    for (let i = 0; i < lineCount; i++) {
        drawRandomLine(ctx);
    }

    // Add stars or particles
    const starCount = Math.floor(Math.random() * 100) + 100;
    for (let i = 0; i < starCount; i++) {
        drawStar(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, '#ffffff');
    }
}

// Function to draw random circles with transparent gradients
function drawRandomCircle(ctx) {
    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    const radius = Math.random() * 100 + 50;
    const color = randomColor();
    const opacity = Math.random() * 0.5 + 0.2; // Random opacity between 0.2 and 0.7

    ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Function to draw random lines
function drawRandomLine(ctx) {
    const x1 = Math.random() * ctx.canvas.width;
    const y1 = Math.random() * ctx.canvas.height;
    const x2 = Math.random() * ctx.canvas.width;
    const y2 = Math.random() * ctx.canvas.height;
    const lineWidth = Math.random() * 2 + 0.5; // Thin lines

    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`; // Random transparency for lines
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Function to draw stars
function drawStar(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Utility function to convert hex colors to rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

// Function to return random colors from a palette
function randomColor() {
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#034F84', '#DD4124', '#D65076'];
    return colors[Math.floor(Math.random() * colors.length)];
}
