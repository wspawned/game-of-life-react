import { useState } from "react";

const squareDim = 10;
const LIFE_SEED = 0.2;
const ROW = 50;
const COLUMN = 50;
const App = () => {
    const [renderMatrix, setRenderMatrix] = useState([]);
    const onClick = () => {
        const EMPTY_CELL = 0;
        const matrix = [...Array(ROW)].map((e) => Array(COLUMN).fill(EMPTY_CELL));
        randomPopulateMatrix(matrix);
        //printMatrix(matrix);
        lifeCycle(matrix, setRenderMatrix);
    };
    return (
        <>
            <button onClick={onClick}>Take the Shot!</button>
            <svg width={COLUMN * squareDim} height={ROW * squareDim}>
                {renderMatrix.map(cell => {
                    return <rect x={cell.rowNumber * squareDim} y={cell.columnNumber * squareDim} width={squareDim} height={squareDim} style={{ fill: cell.isAlive ? "blue" : "white" }} />;
                })}
            </svg>
        </>
    );
};

const printMatrix = (matrix) => {
    let result = "";
    matrix.forEach((row) => {
        let printedRow = "";
        row.forEach((element) => {
            printedRow += element;
        });
        result += "\n" + printedRow;
    });
    console.log(result);
};

const getRenderMatrix = (matrix) => {
    let renderMatrix = [];
    let rowNumber = 0;
    let columnNumber = 0;
    matrix.forEach((row) => {
        columnNumber = 0;
        let renderRow = [];
        row.forEach((element) => {
            let newRenderCell = { rowNumber: rowNumber, columnNumber: columnNumber, isAlive: element };
            renderRow.push(newRenderCell);
            columnNumber++;
            //console.log("row:" + rowNumber + " col:" + columnNumber);
        });
        renderMatrix = [...renderMatrix, ...renderRow];
        rowNumber++;
    });
    return renderMatrix;
};


const randomPopulateMatrix = (matrix) => {
    matrix.forEach((row, rowNum) => {
        row.forEach((element, columnNum) => {
            matrix[rowNum][columnNum] = Math.random() <= LIFE_SEED ? 1 : 0;
        });
    });
};

const lifeCycle = (matrix, setRenderMatrix) => {
    /**
       *  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          Any live cell with two or three live neighbours lives on to the next generation.
          Any live cell with more than three live neighbours dies, as if by overpopulation.
          Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      */

    let newMatrix = getCopyOfMatrix(matrix);
    let periodicFunction = () => {
        printMatrix(matrix);
        matrix.forEach((row, rowNum) => {
            row.forEach((element, columnNum) => {
                let coreCell = matrix[rowNum][columnNum];
                let perimeter = getCloseCellSum(matrix, rowNum, columnNum);
                if (coreCell === 1) {
                    if (perimeter < 2) {
                        newMatrix[rowNum][columnNum] = 0;
                    } else if (perimeter >= 2 && perimeter <= 3) {
                        newMatrix[rowNum][columnNum] = 1;
                    } else if (perimeter > 3) {
                        newMatrix[rowNum][columnNum] = 0;
                    }
                } else if (coreCell === 0) {
                    if (perimeter === 3) {
                        newMatrix[rowNum][columnNum] = 1;
                    }
                }
            });
        });
        matrix = newMatrix;
        setRenderMatrix(getRenderMatrix(matrix));
    };
    const intervalID = setInterval(periodicFunction, 100);
};

function getCopyOfMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix));
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
    perimeter += isAlive(matrix, rowNum - 1, columnNum - 1);
    perimeter += isAlive(matrix, rowNum - 1, columnNum);
    perimeter += isAlive(matrix, rowNum - 1, columnNum + 1);

    perimeter += isAlive(matrix, rowNum, columnNum - 1);
    perimeter += isAlive(matrix, rowNum, columnNum + 1);

    perimeter += isAlive(matrix, rowNum + 1, columnNum - 1);
    perimeter += isAlive(matrix, rowNum + 1, columnNum);
    perimeter += isAlive(matrix, rowNum + 1, columnNum + 1);

    return perimeter;
};

const isAlive = (matrix, x, y) => {
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[x].length) {
        return 0;
    }

    return matrix[x][y];
};
export default App;
