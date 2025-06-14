window.onload = () => {

    const rows = 30;
    const columns = 50;
    let grid = [];
    let running = false;
    let intervalId;

    const gridContainer = document.getElementById('grid');

    // Generate visual grid and initial state
    function createGrid() {
        gridContainer.innerHTML = '';
        grid = [];

        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.column = c;
            cell.addEventListener('click', () => {
                cell.classList.toggle('alive');
            });
            gridContainer.appendChild(cell);
            row.push(cell);
            }
            grid.push(row);
        }
    }

    function getCellState(row, column) {
        if (row < 0 || column < 0 || row >= rows || column >= columns) return 0;
        return grid[row][column].classList.contains('alive') ? 1 : 0;
    }

    function getNextState() {
        const next = [];

        for (let r = 0; r < rows; r++) {
            const newRow = [];
            for (let c = 0; c < columns; c++) {
            const current = getCellState(r, c);
            let neighbors = 0;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) {
                    neighbors += getCellState(r + dr, c + dc);
                }
                }
            }

            const livesNext = (current === 1 && (neighbors === 2 || neighbors === 3)) || (current === 0 && neighbors === 3);
            // While the above looks a bit atrocious, the logic is that if the cell is alive and has two or three neighbors, it remains alive.
            // If it's dead, comes alive if it has exactly three neighbors.
            newRow.push(livesNext);
            }
            next.push(newRow);
    }

    // Apply the new state to the DOM
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
        grid[r][c].classList.toggle('alive', next[r][c]); // If next[r][c] is true (that is, if the cell is alive) then it adds the 'alive' class to that cell's HTML element.
        }
    }
    }

    function startGame() {
        if (!running) {
            running = true;
            intervalId = setInterval(getNextState, 150);
        }
    }

    function stopGame() {
        running = false;
        clearInterval(intervalId);
    }

    function clearGrid() {
        stopGame();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
            grid[r][c].classList.remove('alive');
            }
        }
    }

    function randomizeGrid() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
            const alive = Math.random() < 0.3;
            grid[r][c].classList.toggle('alive', alive);
            }
        }
    }

    // Hook up buttons
    document.getElementById('startButton').addEventListener('click', () => {console.log("Start button clicked"); startGame();});
    document.getElementById('stopButton').addEventListener('click', stopGame);
    document.getElementById('clearButton').addEventListener('click', clearGrid);
    document.getElementById('randomButton').addEventListener('click', randomizeGrid);

    createGrid(); // init grid
}