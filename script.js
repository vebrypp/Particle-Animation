window.addEventListener('load', function() {
    let v, h, particleX, particleY, particles = [];
    let mouseX = null;
    let mouseY = null;

    const myCanvas = document.getElementById('myCanvas');
    const ctx = myCanvas.getContext('2d');

    resizeCanvas();
    init();
    animationLoop();

    function init() {
        const range = 30;
        const mouseRange = 150;
        particleX = Math.round(v / range) + 1;
        particleY = Math.round(h / range) + 1;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.initX = this.x;
                this.initY = this.y;
                this.r = 3;
                this.color = 'white';
            };
            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            };
            update() {
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceX = dx / distance;
                let forceY = dy / distance;
                let force = (mouseRange - distance) / mouseRange;
                let dirX = forceX * force * this.r;
                let dirY = forceY * force * this.r;

                if(distance < mouseRange) {
                    this.x -= dirX;
                    this.y -= dirY;
                } else {
                    if(this.x !== this.initX) {
                        this.dx = this.x - this.initX
                        this.x -= this.dx/10;
                    };
                    if(this.y !== this.initY) {
                        this.dy = this.y - this.initY
                        this.y -= this.dy/10
                    }
                };
            };
        };

        for(let y = 0; y < particleY; y++) {
            for(let x = 0; x < particleX; x++) {
                particles.push(new Particle(range * x, range * y))
            };
        };
    };

    function resizeCanvas() {
        v = myCanvas.width = window.innerWidth;
        h = myCanvas.height = window.innerHeight;
    };

    function mouseMove(e) {
        mouseX = e.x;
        mouseY = e.y;
    }

    function mouseOut() {
        mouseX = null;
        mouseY = null;
    };

    function animationLoop() {
        ctx.clearRect(0, 0, v, h)
        particles.forEach((e) => {
            e.draw();
            e.update();
        });
        requestAnimationFrame(animationLoop);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseout', mouseOut);
});