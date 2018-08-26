var Utils = {
    Array: {
        shuffle: function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        createFromTo: function (from, to) {
            var array = [];

            for (var i = from; i <= to; i++)
                array.push(i);

            return array;
        },
        create2DArray: function (width, length, defaultValue) {
            var array = [];

            for (var i = 0; i < length; i++) {
                var subArray = [];

                for (var j = 0; j < width; j++)
                    subArray.push(defaultValue);

                array.push(subArray);
            }

            return array;
        }
    }
}

var Sudoku = {
    buildCells: function () {
        var cells = Utils.Array.create2DArray(9, 9, null);
        var maxRetry = 362880;

        for (var row = 0; row < 9; row++) {
            for (var i = 0; i < maxRetry; i++) {
                if (this.buildRow(cells, row))
                    break;

                if (i == maxRetry - 1)
                    throw new Error('Max retry reached!');
            }
        }

        return cells;
    },
    buildRow: function (cells, row) {
        for (var column = 0; column < 9; column++)
            cells[row][column] = null;

        for (var column = 0; column < 9; column++) {
            var randomValues = this.buildRandomValues();
            var isValid = false;

            for (var i = 0; i < 9; i++) {
                var value = randomValues[i];

                if (this.isAlreadyUsed(cells, value, row, column))
                    continue;

                isValid = true;
                cells[row][column] = value;
                break;
            }

            if (!isValid)
                return false;
        }

        return true;
    },
    buildRandomValues: function () {
        var array = Utils.Array.createFromTo(1, 9);
        return Utils.Array.shuffle(array);
    },
    isAlreadyUsed: function (cases, value, row, column) {
        for (var i = 0; i < 9; i++) {
            if (i != column && cases[row][i] == value)
                return true;

            if (i != row && cases[i][column] == value)
                return true;
        }

        return this.isAlreadyUsedInBlock(cases, value, row, column);
    },
    isAlreadyUsedInBlock: function (cases, value, row, column) {
        var ranges = [];

        for (var i = 0; i < 3; i++) {
            var rangeX = i * 3;

            for (var j = 0; j < 3; j++) {
                var rangeY = j * 3;

                ranges.push({
                    x: rangeX,
                    y: rangeY
                });
            }
        }

        for (var i = 0; i < 9; i++) {
            var range = ranges[i];

            var minX = range.x;
            var maxX = minX + 2;

            var minY = range.y;
            var maxY = minY + 2;

            if (row >= minX && row <= maxX && column >= minY && column <= maxY) {
                for (var x = minX; x <= maxX; x++) {
                    for (var y = minY; y <= maxY; y++) {
                        if (x == row && y == column)
                            continue;

                        if (cases[x][y] == value)
                            return true;
                    }
                }
            }
        }

        return false;
    },
    showRandomCells: function (cells, count) {
        var showCells = Utils.Array.create2DArray(9, 9, null);
        var cases = Utils.Array.createFromTo(0, 80);
        cases = Utils.Array.shuffle(cases);
        cases = cases.splice(0, count);

        var index = 0;
        var found = 0;
        for (var row = 0; row < 9; row++) {
            for (var column = 0; column < 9; column++) {

                if (cases.includes(index)) {
                    found++;

                    showCells[row][column] = cells[row][column];

                    if (found == count)
                        return showCells;
                }

                index++;
            }
        }

        return showCells;
    },
    render: function (cells) {
        var content = '';

        for (var row = 0; row < 9; row++) {
            for (var column = 0; column < 9; column++) {
                var value = cells[row][column];

                if (value == null)
                    value = "*";

                content += value + ' ';
            }
            content += '\n';
        }

        console.log(content);
    }
}

var cells = Sudoku.buildCells();
Sudoku.render(cells);
console.log('\n');
Sudoku.render(Sudoku.showRandomCells(cells, 30));