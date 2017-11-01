 
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Game from './Sudoku';
import Solver from './solver';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Game),
    document.getElementById('sudoku_game'),
  );
});

/*

var easy = [[2,0,0,8,0,4,0,0,6],
           [0,0,6,0,0,0,5,0,0],
           [0,7,4,0,0,0,9,2,0],
           [3,0,0,0,4,0,0,0,7],
           [0,0,0,3,0,5,0,0,0],
           [4,0,0,0,6,0,0,0,9],
           [0,1,9,0,0,0,7,4,0],
           [0,0,8,0,0,0,2,0,0],
           [5,0,0,6,0,8,0,0,1]];

var medium = [[5,0,4,9,0,0,0,0,2],
              [9,0,0,0,0,2,8,0,0],
              [0,0,6,7,0,0,0,0,9],
              [0,0,5,0,0,6,0,0,3],
              [3,0,0,0,7,0,0,0,1],
              [4,0,0,1,0,0,9,0,0],
              [2,0,0,0,0,9,7,0,0],
              [0,0,8,4,0,0,0,0,6],
              [6,0,0,0,0,3,4,0,8]];


var hard = [[0,0,0,0,1,4,0,7,0],
            [0,0,7,9,0,8,1,0,0],
            [0,8,0,0,0,0,3,0,0],
            [0,0,0,8,0,0,7,5,0],
            [3,0,0,4,0,7,0,0,2],
            [0,7,6,0,0,3,0,0,0],
            [0,0,4,0,0,0,0,6,0],
            [0,0,9,6,0,2,8,0,0],
            [0,2,0,1,4,0,0,0,0]]
    
var evil1 = [[6,2,0,7,0,1,0,0,0],
            [0,0,0,3,0,0,0,2,0],
            [0,0,0,5,0,0,3,6,0],
            [1,0,0,0,0,0,4,0,0],
            [0,7,0,0,9,0,0,5,0],
            [0,0,8,0,0,0,0,0,2],
            [0,4,1,0,0,2,0,0,0],
            [0,5,0,0,0,8,0,0,0],
            [0,0,0,4,0,3,0,9,7]]
    
var evil2 = [[0,7,0,0,0,5,0,4,0],
             [0,0,0,3,0,0,0,2,0],
             [8,0,4,0,1,0,0,0,0],
             [0,0,5,0,2,0,1,0,8],
             [0,0,0,1,0,6,0,0,0],
             [2,0,6,0,3,0,5,0,0],
             [0,0,0,0,7,0,3,0,9],
             [0,8,0,0,0,3,0,0,0],
             [0,3,0,6,0,0,0,8,0]]

var puz = new Solver(hard);

puz.solve();
puz.solve();
puz.solve();
puz.solve();
puz.solve();
puz.solve();
puz.solve();

for(var i = 0; i < 9; i++){
	console.log(puz.puzzle[i][0].answer,puz.puzzle[i][1].answer,puz.puzzle[i][2].answer,puz.puzzle[i][3].answer,
		puz.puzzle[i][4].answer,puz.puzzle[i][5].answer,puz.puzzle[i][6].answer,puz.puzzle[i][7].answer,
		puz.puzzle[i][8].answer);
}


*/