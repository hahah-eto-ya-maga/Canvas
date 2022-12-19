class Graph2d {
    constructor(canvas, WIN) {
        this.canvas = canvas;
        this.WIN = WIN;
        this.funcs = [];
    }
    
    printOXY() {
        let {left, width, height, bottom} = this.WIN;
        this.canvas.line(left, 0, width + left, 0, 1);
        this.canvas.line(0, bottom, 0, bottom + height, 1);
    }

    printFunction(f, color = 'black', lineWidth = 2) {
        const {left, width, height} = this.WIN;
        const dx = width / 100;
        let x = left;

        while (x < width + left) {

            const y1 = f(x);
            const y2 = f(x + dx);

            if (Math.abs(y1 - y2) < height) {
                this.canvas.line(x, y1, x + dx, y2, lineWidth, color);
            } else {
                this.canvas.line(x, y1, x + dx, y2, lineWidth, color, true);
            }
            x += dx;

            this.printZeros(f, '#f009', x, dx)
        }
    }

    grid(color = '#ccc') {
        let {left, width, height, bottom} = this.WIN;

        for (let i = 0; i <= left + width; i++) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i >= left; i--) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i <= bottom + height; i++) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
        for (let i = 0; i >= bottom; i--) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
    }

    printNums() {
        let {left, width, height, bottom} = this.WIN;

        const streakLength = height / (width + 30);
        const len = streakLength / 2;
        const shiftY = -height * 0.01 - 0.04;
        const shiftX = width * 0.001 + 0.04;
        for (let i = Math.round(left); i < left + width; i++) {
            this.canvas.line(i, len, i, -len, 2.5);
            this.canvas.printText(i, i + shiftX, shiftY);
        }
        for (let i = Math.round(bottom); i < bottom + height; i++) {
            this.canvas.line(len, i, -len, i, 2.5 );
            this.canvas.printText(i, shiftX, i + shiftY);
        }
    }

    printRect(event) {
        let {width, height} = this.WIN;

        const x = Math.floor(this.canvas.x(event.offsetX));
        const y = Math.ceil(this.canvas.y(event.offsetY));

        this.canvas.drawRect(x, y, 1, 1, 'grey');

        const shiftY = height * 0.01;
        const shiftX = width * 0.01 + 0.02;

        const indexes = [
            { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
            { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
            { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
            { x: 1, y: -1, shiftX: 0, shiftY: -shiftY }
        ];

        indexes.forEach(cord => {
            this.canvas.printText(
                `(${cord.x + x}; ${cord.y + y})`,
                x + cord.x + cord.shiftX,
                y + cord.y + cord.shiftY,
            )
        })
    }

    getIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        let S = 0;
        while(x <= b) {
            S += (f(x) + f(x + dx)) / 2 * dx;
            x += dx;
        }
        return S;
    }

    printIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        const points = [{x, y: 0}];
        while(x <= b) {
            points.push({ x, y: f(x)});
            x += dx;
        }
        points.push({ x, y: f(x)});
        points.push({ x, y: 0});
        this.canvas.polygon(points);
    }

    getDerivative(f, x0, dx = 0.00001) {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    printDerivative(f, x) {
        const k = this.getDerivative(f, x)
        let b = f(x) - k * x;
        let x1 = this.WIN.left;
        let x2 = this.WIN.left + this.WIN.width;
        let y1 = k * x1 + b;
        let y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, '#f006', true);
    }

    printZeros = (f, color = '#f009', x, dx = 0.00001) => {
        if (f(x) * f(x + dx) <= 0) {
            this.canvas.point(x + dx / 2, 0)
        }
    }

    render() {
        this.canvas.clear();
        this.grid();
        this.printNums();
        this.printOXY();
        this.funcs.forEach(func => {
            if (!(func.f instanceof Function)) return;
            this.printFunction(func.f, func.color, func.width);
            this.printIntegral(func.f, 1, 5);
            this.printDerivative(func.f, this.canvas.x(event.offsetX))
        });
    }
}