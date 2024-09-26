function generateArt() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set the galaxy background (dark space with gradients)
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, canvas.width);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#0c0c34');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate galaxy components
    const galaxyCount = Math.floor(Math.random() * 5) + 3; // Random number of galaxies
    for (let i = 0; i < galaxyCount; i++) {
        const type = Math.random() > 0.5 ? 'spiral' : 'elliptical';  // Randomize galaxy type
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 150 + 100;
        if (type === 'spiral') {
            drawSpiralGalaxy(ctx, x, y, size);
        } else {
            drawEllipticalGalaxy(ctx, x, y, size);
        }
    }

    // Generate stars
    const starCount = Math.floor(Math.random() * 400) + 200;
    for (let i = 0; i < starCount; i++) {
        drawStar(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 0.5, randomStarColor());
    }

    // Generate random planets
    const planetCount = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < planetCount; i++) {
        drawPlanet(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50 + 30);
    }

    // Generate random nebula clouds
    const nebulaCount = Math.floor(Math.random() * 6) + 2;
    for (let i = 0; i < nebulaCount; i++) {
        drawNebula(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 300 + 100, randomColor());
    }

    // Generate comets or cosmic streaks
    const cometCount = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < cometCount; i++) {
        drawComet(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 200 + 100);
    }
}

// Function to draw a spiral galaxy with randomized arms and colors
function drawSpiralGalaxy(ctx, x, y, size) {
    const arms = Math.floor(Math.random() * 6) + 3;  // Random number of arms
    ctx.globalAlpha = 0.8;

    // Loop to draw each arm
    for (let i = 0; i < arms; i++) {
        drawSpiralArm(ctx, x, y, size, i * (Math.PI * 2) / arms);
    }

    // Add glowing core
    ctx.beginPath();
    const coreColor = randomStarColor();
    ctx.fillStyle = coreColor;
    ctx.arc(x, y, size / 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Draw elliptical galaxy with random color blobs
function drawEllipticalGalaxy(ctx, x, y, size) {
    const gradient = ctx.createRadialGradient(x, y, size / 4, x, y, size);
    gradient.addColorStop(0, randomStarColor());
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, size, size / 1.5, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
}

// Function to draw planets with random atmospheres
function drawPlanet(ctx, x, y, size) {
    const color = randomColor();
    ctx.fillStyle = color;

    // Draw planet core
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Add atmosphere with a radial gradient
    const atmosphere = ctx.createRadialGradient(x, y, size * 0.7, x, y, size);
    atmosphere.addColorStop(0, 'transparent');
    atmosphere.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
    ctx.fillStyle = atmosphere;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Optionally add rings around the planet
    if (Math.random() > 0.7) {
        drawRings(ctx, x, y, size);
    }
}

// Draw random planetary rings
function drawRings(ctx, x, y, size) {
    const ringCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < ringCount; i++) {
        ctx.strokeStyle = randomStarColor();
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.ellipse(x, y, size + (i * 10), size / 2 + (i * 5), Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Generate random comet-like streaks
function drawComet(ctx, x, y, length) {
    const angle = Math.random() * Math.PI * 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
    ctx.stroke();
}

// Draw a nebula using radial gradients
function drawNebula(ctx, x, y, radius, color) {
    const nebulaGradient = ctx.createRadialGradient(x, y, radius / 10, x, y, radius);
    nebulaGradient.addColorStop(0, color);
    nebulaGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = nebulaGradient;
    ctx.globalAlpha = 0.3 + Math.random() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Draw stars
function drawStar(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Random star color generator
function randomStarColor() {
    const colors = ['#ffffff', '#ffd700', '#87cefa', '#add8e6', '#f39c12', '#ff6347'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate random colors for planets and nebulae
function randomColor() {
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fcb69f', '#ff677d', '#556270', '#4ecdc4', '#2b2d42'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to draw a spiral arm for a spiral galaxy
function drawSpiralArm(ctx, x, y, size, angle) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = Math.random() * 1.5 + 0.5;
    ctx.beginPath();

    // Start from the galaxy's core and draw outward
    let radius = size / 10;
    ctx.moveTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);

    // Create a spiral arm by drawing multiple segments
    for (let i = 0; i < 100; i++) {
        radius += size / 100;  // Increase radius gradually
        angle += Math.PI / 64; // Spiral by changing angle gradually
        const nx = x + Math.cos(angle) * radius;
        const ny = y + Math.sin(angle) * radius;
        ctx.lineTo(nx, ny);
    }

    ctx.stroke();
}
