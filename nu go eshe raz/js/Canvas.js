class Canvas {
    constructor(id, width = 500, height = 500, WIN, callbacks) {

        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave, updateSize } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mouseDown);
        this.canvas.addEventListener('mouseup', mouseUp);
        this.canvas.addEventListener('mousemove', mouseMove);
        this.canvas.addEventListener('mouseleave', mouseLeave);
        this.canvas.addEventListener("resize", updateSize);

        this.WIN = WIN;
    }

    xs(x) {
        let {left, width} = this.WIN;
        return (x - left) / width * this.canvas.width;
    }

    ys(y) {
        let {height, bottom} = this.WIN;
        return this.canvas.height - (y - bottom) / height * this.canvas.height;
    }

    sx(x) {
        let {width} = this.WIN;
        return x * width / this.canvas.width;
    }

    sy(y) {
        let {height} = this.WIN;
        return -y * height / this.canvas.height;
    }

    x(xs) {
        let {left, width} = this.WIN;
        return xs * width / this.canvas.width + left;
    }

    y(ys) {
        let {height, bottom} = this.WIN;
        return -ys * height / this.canvas.height + bottom + height;
    }

    drawRect(x, y, width, height, color) {
        const heightRect = height * this.canvas.height / this.WIN.height;
        const widthRect = width * this.canvas.width / this.WIN.width;

        this.context.fillStyle = color;
        this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);

    }

    clear() {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, innerWidth, innerHeight);
    }

    line(x1, y1, x2, y2, lineWidth = 1, color = 'black', isDash = false) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.context.lineWidth = 1;
            this.context.setLineDash([10, 10]);
        } else {
            this.context.lineWidth = lineWidth;
            this.context.setLineDash([]);
        }
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    printText(text, x, y) {
        this.context.fontsize = 4;
        this.context.fillStyle = 'black';
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    point(x, y, color = 'red', size = 4) {
        this.context.beginPath();
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    polygon(points = [], color = '#f003') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.stroke();
        this.context.closePath();
        this.context.fill();
    }
}

