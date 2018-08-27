Just an engine to build random Sudoku game

Write :

```javascript
var cells = Sudoku.buildCells();
Sudoku.render(cells);
console.log('\n');
Sudoku.render(Sudoku.showRandomCells(cells, 30));
```

and you will get something like this :

```
3 6 5 9 1 7 4 8 2 
4 2 8 6 3 5 1 7 9 
7 1 9 4 2 8 3 6 5 
9 7 3 8 5 1 6 2 4 
5 4 2 3 9 6 7 1 8 
6 8 1 2 7 4 5 9 3 
8 3 4 1 6 2 9 5 7 
1 9 7 5 8 3 2 4 6 
2 5 6 7 4 9 8 3 1

* 6 5 * 1 7 * 8 * 
* 2 8 6 * * 1 * 9 
7 * * 4 * 8 * * 5 
* * * * * * * * * 
* 4 * * 9 * 7 * * 
* 8 * 2 * * * * 3 
* * 4 1 6 * 9 5 * 
* * * * * * * 4 6 
2 * * * * * * 3 1 
```

The number 30 means the engine shows only 30 cells randomly.