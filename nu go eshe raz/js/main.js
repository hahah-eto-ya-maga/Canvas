window.onload = () => {
    const height = innerHeight;
    const width  = innerWidth;
    const prop   = width / height;

    const WIN = {
        left: -10 * prop,
        bottom: -10,
        width: 20 * prop,
        height: 20,
    };

    let showFunctionsMenu = document.querySelector(".showFunctionsMenu");
    let funcNav           = document.querySelector(".funcNav");
    let innerPreview      = document.querySelector(".inner__preview");
    let preview           = document.querySelector(".preview");
    let leftPreview       = document.querySelector(".left__preview");
    let rightPreview      = document.querySelector(".right__preview");
    let mdi               = document.querySelector(".mdi");
    const zoomStep        = 1;
    let canMove           = false;

    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        if (WIN.width + delta * prop > 0 && WIN.height + delta > 0) {
            WIN.width += prop * delta;
            WIN.height += delta;
            WIN.left -= prop * delta / 2;
            WIN.bottom -= delta / 2;
            graph2d.render();
        }
        graph2d.printRect(event);
    }

    function mouseUp() {
        canMove = false;
    }

    function mouseDown() {
        canMove = true;
    }

    function mouseMove(event) {
        if (canMove) {
            WIN.left -= canvas.sx(event.movementX);
            WIN.bottom -= canvas.sy(event.movementY);
            graph2d.render()
        }
        graph2d.render();
        graph2d.printRect(event);
    }

    function mouseLeave() {
        canMove = false;
        graph2d.render();
    }

    const canvas = new Canvas(
        'graph',
        width,
        height,
        WIN,
        { wheel, mouseUp, mouseDown, mouseMove, mouseLeave, updateSize },
    );

    const graph2d = new Graph2d(canvas, WIN);

    const ui = new UI({
        changeColor,
        changeWidth,
        addFunction,
        delFunction,
        createFuncObject,
    });

    function changeWidth(index, newWidth) {
        graph2d.funcs[index].width = newWidth - 0;
        graph2d.render();
    }

    function addFunction(index, f) {
        graph2d.funcs[index].f = f;
        graph2d.render();
    }

    function changeColor(index, color) {
        graph2d.funcs[index].color = color;
        graph2d.render();
    }

    function createFuncObject (index) {
        graph2d.funcs[index] = {
            f : null,
            color: 'black',
            width: 2,
            showZero: false,
            showDerivative: false,
        }
    }

    function delFunction(index) {
        graph2d.funcs[index] = null;
        graph2d.render();
    }

    function updateSize() {
        graph2d.canvas.height = innerHeight;
        graph2d.canvas.width = innerWidth;
    }

    function debugBase64(base64URL){
        let win = window.open();
        win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>');
        win.document.body.style.margin = 0;
    }

    function show() {
        mdi.classList.remove("mdi-arrow-down-thick")
        mdi.classList.add("mdi-arrow-up-thick")
        funcNav.classList.add("show");
        funcNav.classList.remove("hide");
        funcNav.style.display = "block";
    }

    function hide() {
        mdi.classList.add("mdi-arrow-down-thick")
        mdi.classList.remove("mdi-arrow-up-thick")
        showFunctionsMenu.classList.remove("show");
        funcNav.classList.remove("show");
        funcNav.classList.add("hide");
        setTimeout(() => {
            funcNav.style.display = "none";
        }, 120);
    }

    function start() {
        document.querySelector(".makeScreenshot").addEventListener("click", () => {
            debugBase64(canvas.canvas.toDataURL("image/1.jpg"));
        });

        showFunctionsMenu.addEventListener("click", () => {
            funcNav.classList.contains("show") ? hide() : show();
        });

        innerPreview.addEventListener("click", () => {
            preview.classList.add("hide_preview");
            innerPreview.classList.add("hide_inner_preview");
            rightPreview.classList.add();
        })
    }


    start();
    graph2d.render();
}
