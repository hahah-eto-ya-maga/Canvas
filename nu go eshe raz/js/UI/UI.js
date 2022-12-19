class UI {
    constructor({ changeColor,
                 changeWidth,
                 addFunction,
                 delFunction,
                 createFuncObject }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.changeWidth = changeWidth;
        this.changeColor = changeColor;
        this.createFuncObject = createFuncObject;

        this.index = 0;
        document.querySelector('.addFunction').addEventListener('click', () => this.addFunctionHandler());
    }


    addFunctionHandler() {

        this.createFuncObject(this.index);

        const inputFunc = document.createElement('input');
        inputFunc.dataset.index = this.index;
        inputFunc.addEventListener('keyup', (event) => this.keyUpFunctionHandler(event));
        inputFunc.placeholder = 'f(x)';

        const inputWidth = document.createElement('input');
        inputWidth.dataset.index = this.index;
        inputWidth.addEventListener('keyup', (event) => this.keyUpWidthHandler(event));
        inputWidth.type = 'number';
        inputWidth.placeholder = 'Ширина';

        const inputColor = document.createElement('input');
        inputColor.dataset.index = this.index;
        inputColor.type = "color";
        inputColor.addEventListener('change', (event) => this.onChangeColorHandler(event));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Удалить';
        deleteButton.addEventListener('click', () => {
            div.removeChild(funcBlock);
            this.delFunction(inputFunc.dataset.index);
        })
        deleteButton.className = 'deleteFunc';

        const funcMainInfo = document.createElement('div');
        funcMainInfo.className = 'funcMainInfo';
        funcMainInfo.appendChild(inputFunc);
        funcMainInfo.appendChild(inputWidth);
        funcMainInfo.appendChild(inputColor);
        funcMainInfo.appendChild(deleteButton);

        const funcBlock = document.createElement('div');
        funcBlock.className = 'funcBlock';
        funcBlock.appendChild(funcMainInfo);

        const div = document.querySelector('.funcInputs');
        div.appendChild(funcBlock);

        this.index++;
    }

    keyUpFunctionHandler(event) {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value}}`);
            this.addFunction(event.target.dataset.index, f);
        } catch (e) {
        }
    }

    keyUpWidthHandler(event) {
        this.changeWidth(event.target.dataset.index, event.target.value);
    }

    onChangeColorHandler(event) {
        this.changeColor(event.target.dataset.index, event.target.value);
    }
}