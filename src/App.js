const App = () => {
    const row = 5;
    const column = 5;
    const EMPTY_CELL = 0;
    const matrix = [...Array(6)].map(e => Array(6).fill(EMPTY_CELL));
    printMatrix(matrix);
}

const printMatrix = (matrix) => {
    let result = "";
    matrix.forEach(row => {
        let printedRow = "";
        row.forEach(element => {
            printedRow += element;
        });
        result += '\n' + printedRow;
    });
    console.log(result);
};

const randomPopulateMatrix = (matrix) => {
    matrix.forEach((row, rowNum) => {
        row.forEach((element, columnNum) => {
            matrix[rowNum][columnNum] = Math.random() <= 0.5 ? 1 : 0;
        });
    });
}

const lifeCycle = (matrix) => {
    
    /**
     *  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        Any live cell with two or three live neighbours lives on to the next generation.
        Any live cell with more than three live neighbours dies, as if by overpopulation.
        Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    */

    let newMatrix = getCopyOfMatrix(matrix);
    while(1) {
        printMatrix(matrix);
        matrix.forEach((row, rowNum) => {
            row.forEach((element, columnNum) => {
                let coreCell = matrix[rowNum][columnNum];
                let perimeter = getCloseCellSum(matrix, rowNum, columnNum);
                if(coreCell == 1) {
                    if(perimeter<2) {
                        newMatrix[rowNum][columnNum] = 0;
                    } else if(perimeter >= 2 || perimeter <= 3) {
                        newMatrix[rowNum][columnNum] = 1;
                    } else if(perimeter >= 3) {
                        newMatrix[rowNum][columnNum] = 0;
                    }
                }
                if(coreCell == 0) {
                    if(perimeter == 3) {
                        newMatrix[rowNum][columnNum] = 1;
                    }
                }
            });
        });
        matrix = newMatrix;
    }
};

function getCopyOfMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix))
}

const getCloseCellSum = (matrix, rowNum, columnNum) => {
    let perimeter = 0;
    /*
    perimeter += matrix[rowNum - 1][columnNum - 1] !== undefined ? newMatrix[rowNum - 1][columnNum - 1] : 0;
    perimeter += matrix[rowNum - 1][columnNum] !== undefined ? newMatrix[rowNum - 1][columnNum] : 0;
    perimeter += matrix[rowNum - 1][columnNum + 1] !== undefined ? newMatrix[rowNum - 1][columnNum + 1] : 0;

    perimeter += matrix[rowNum][columnNum - 1] !== undefined ? newMatrix[rowNum][columnNum - 1] : 0;
    perimeter += matrix[rowNum][columnNum] !== undefined ? newMatrix[rowNum][columnNum] : 0;
    perimeter += matrix[rowNum][columnNum + 1] !== undefined ? newMatrix[rowNum ][columnNum + 1] : 0;

    perimeter += matrix[rowNum + 1][columnNum - 1] !== undefined ? newMatrix[rowNum + 1][columnNum - 1] : 0;
    perimeter += matrix[rowNum + 1][columnNum] !== undefined ? newMatrix[rowNum + 1][columnNum] : 0;
    perimeter += matrix[rowNum + 1][columnNum + 1] !== undefined ? newMatrix[rowNum + 1][columnNum + 1] : 0;
    */
    perimeter += isAlive(matrix,rowNum - 1,columnNum - 1);
    perimeter += isAlive(matrix,rowNum - 1,columnNum);
    perimeter += isAlive(matrix,rowNum - 1,columnNum + 1);

    perimeter += isAlive(matrix,rowNum,columnNum - 1);
    perimeter += isAlive(matrix,rowNum,columnNum);
    perimeter += isAlive(matrix,rowNum,columnNum + 1);

    perimeter += isAlive(matrix,rowNum + 1,columnNum - 1);
    perimeter += isAlive(matrix,rowNum + 1,columnNum);
    perimeter += isAlive(matrix,rowNum + 1,columnNum + 1);

    return perimeter;
}

const isAlive = (matrix, x, y) =>
{
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length){
        return 0;
    }

    return matrix[x][y];
}