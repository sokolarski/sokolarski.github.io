var elem = document.getElementById("game");
var matrixDimension = 18;
var gameMatrix = [];
var scoreSum = 0;
var lives = 5;
var currentLevel = 1;
var countOfColor = 3;
var newGame = true;
var newBricks = 100;

startLevel();

function startLevel() {
    for (let i = 0; i < matrixDimension; i++) {
        var rowMatrix = [];
        gameMatrix.push(rowMatrix);
        var row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < matrixDimension; j++) {

            var node = document.createElement("div");
            var numColor = Math.floor(Math.random() * countOfColor) + 1;
            rowMatrix.push(numColor);
            var textnode = document.createTextNode(numColor);
            var idStr = idToString(i, j);
            node.id = idStr;
            node.onclick = function() {
                action(this.id);
            };
            switch (numColor) {
                case 1:
                    node.classList.add("red");
                    break;
                case 2:
                    node.classList.add("blue");
                    break;
                case 3:
                    node.classList.add("yellow");
                    break;
                case 4:
                    node.classList.add("green");
                    break;
            }
            node.appendChild(textnode);
            node.classList.add("elem");
            row.appendChild(node);
        }
        elem.appendChild(row);

    }


}

function action(elemId) {
    var token = elemId.split("-");
    var numRow = parseInt(token[0]);
    var numCol = parseInt(token[1]);
    let num = findAdjElem(numRow, numCol, gameMatrix);
    reArange(gameMatrix);
    nextLevel(gameMatrix);
    if (newGame) {
        infiniteBricks(gameMatrix);
    }
    score(num);
    changeView(gameMatrix);
}

function infiniteBricks(matrix) {
    for (let i = 0; i < matrixDimension; i++) {
        for (let j = 0; j < matrixDimension; j++) {
            if (matrix[i][j] == 0) {
                var numColor = Math.floor(Math.random() * countOfColor) + 1;
                matrix[i][j] = numColor;
                newBricks--;
                if (newBricks == 0) {
                    newGame = false;
                    reArange(gameMatrix);
                    return;
                }
            }
        }
    }
}

function nextLevel(matrix) {

    if (gameMatrix[matrixDimension - 1][matrixDimension - 1] == 0) {
        currentLevel++;
        var levelElem = document.getElementById("levelElem");
        levelElem.innerHTML = String(currentLevel);
        newBricks = currentLevel * 100;
        newGame = true;

        //var countOfColor = 3;
        if (currentLevel >= 5) {
            countOfColor = 4;
        }
        for (let i = 0; i < matrixDimension; i++) {
            for (let j = 0; j < matrixDimension; j++) {
                var numColor = Math.floor(Math.random() * countOfColor) + 1;
                matrix[i][j] = numColor;
            }
        }
    }
}

function score(score) {

    if (score.v == 1) {
        lives -= 1;
    }
    scoreSum += score.v;
    var scoreElem = document.getElementById("scoreElem");
    scoreElem.innerHTML = String(scoreSum);

    var scoreElem = document.getElementById("livesElem");
    scoreElem.innerHTML = String(lives);

    var scoreBlocks = document.getElementById("blocksElem");
    scoreBlocks.innerHTML = String(newBricks);
    if (lives == 0) {
        alert("GAMEOVER");
        location.reload();
    }

}


function reArange(matrix) {
    reArangeColumn(matrix);
    reArangeRow(matrix);

}

function reArangeRow(matrix) {
    for (let i = matrixDimension - 1; i >= 0; i--) {
        if (matrix[matrixDimension - 1][i] == 0) {
            var count = 0;
            for (let j = i; j >= 0; j--) {
                if (matrix[matrixDimension - 1][j] == 0) {
                    count++;
                } else {
                    for (let x = matrixDimension - 1; x >= 0; x--) {
                        var temp = matrix[x][j];
                        matrix[x][j + count] = temp;
                        matrix[x][j] = 0;
                    }
                }
            }
        }
    }
}


function reArangeColumn(matrix) {
    for (let i = matrixDimension - 1; i >= 0; i--) {
        for (let j = matrixDimension - 1; j >= 0; j--) {
            if (matrix[i][j] == 0) {
                var count = 0;
                for (let x = i; x >= 0; x--) {
                    if (matrix[x][j] == 0) {
                        count++;
                    } else {
                        var temp = matrix[x][j];
                        matrix[x + count][j] = temp;
                        matrix[x][j] = 0;
                    }
                }
            }
        }
    }
}

function changeColor(x, y, matrix) {
    var elem = getElementIdByCordinate(x, y)
    var color = matrix[x][y];
    switch (color) {
        case 0:
            elem.className = "white elem";
            elem.innerHTML = 0;
            break;
        case 1:
            elem.className = "red elem";
            elem.innerHTML = 1;
            break;
        case 2:
            elem.className = "blue elem";
            elem.innerHTML = 2;
            break;
        case 3:
            elem.className = "yellow elem";
            elem.innerHTML = 3;
            break;
        case 4:
            elem.className = "green elem";
            elem.innerHTML = 4;
            break;
        default:
            alert("ne smenen cwqt");
    }
}

function getElementIdByStr(str) {
    var boardElement = document.getElementById(str);
    return boardElement;
}

function getElementIdByCordinate(x, y) {
    var boardElement = document.getElementById(idToString(x, y));
    return boardElement;
}

function idToString(x, y) {
    return String(x) + "-" + String(y);
}

function changeView(matrix) {

    for (let i = 0; i < matrixDimension; i++) {
        for (let j = 0; j < matrixDimension; j++) {
            changeColor(i, j, matrix);
        }
    }
}

function findAdjElem(x, y, matrix) {


    var corX = x;
    var corY = y;
    if (matrix[x][y] == 0) {
        return {
            v: 0
        };
    }
    var stack = new Stack();
    var cord = {
        key: x,
        value: y
    };
    stack.push(cord);
    var countOfBlocks = {
        v: 0
    };
    Search(corX, corY, matrix, stack, countOfBlocks);
    return countOfBlocks;
}

function Search(corX, corY, matrix, stack, countOfBlocks) {


    if (stack.size() > 0) {

        var isVisited = stack.pop();

    }

    var value = matrix[corX][corY];
    matrix[corX][corY] = 0;

    countOfBlocks.v++;
    if (corY < matrixDimension - 1) {
        if (matrix[corX][corY + 1] === value) {

            var current = {
                key: corX,
                value: corY + 1
            };
            if (!(current.key === isVisited.key && current.value === isVisited.value)) {
                var cord = {
                    key: corX,
                    value: corY
                };
                stack.push(cord);
                Search(corX, corY + 1, matrix, stack, countOfBlocks);

            }
        }

    }
    if (corX - 1 >= 0) {
        if (matrix[corX - 1][corY] === value) {
            var current1 = {
                key: corX - 1,
                value: corY
            };
            if (!(current1.key === isVisited.key && current1.value === isVisited.value)) {

                var cord1 = {
                    key: corX,
                    value: corY
                };
                stack.push(cord1);
                Search(corX - 1, corY, matrix, stack, countOfBlocks);

            }
        }
    }
    if (corY - 1 >= 0) {
        if (matrix[corX][corY - 1] === value) {
            var current2 = {
                key: corX,
                value: corY - 1
            };
            if (!(current2.key === isVisited.key && current2.value === isVisited.value)) {

                var cord2 = {
                    key: corX,
                    value: corY
                };
                stack.push(cord2);
                Search(corX, corY - 1, matrix, stack, countOfBlocks);

            }
        }

    }
    if (corX < matrixDimension - 1) {
        if (matrix[corX + 1][corY] === value) {
            var current3 = {
                key: corX + 1,
                value: corY
            };
            if (!(current3.key === isVisited.key && current3.value === isVisited.value)) {

                var cord3 = {
                    key: corX,
                    value: corY
                };
                stack.push(cord3);
                Search(corX + 1, corY, matrix, stack, countOfBlocks);

            }
        }
    }


}
class Stack {
    constructor(...items) {
        this._items = []

        if (items.length > 0)
            items.forEach(item => this._items.push(item))

    }

    push(...items) {
        //push item to the stack
        items.forEach(item => this._items.push(item))
        return this._items;

    }

    pop(count = 0) {
        //pull out the topmost item (last item) from stack
        if (count === 0)
            return this._items.pop()
        else
            return this._items.splice(-count, count)
    }

    peek() {
        // see what's the last item in stack
        return this._items[this._items.length - 1]
    }

    size() {
        //no. of items in stack
        return this._items.length
    }

    isEmpty() {
        // return whether the stack is empty or not
        return this._items.length == 0
    }

    toArray() {
        return this._items;
    }
}