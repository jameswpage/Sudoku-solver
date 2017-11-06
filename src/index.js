 
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Game from './Sudoku';
import Solver from './solver';
import ImageUpload from './image_input';

 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		React.createElement(ImageUpload),
		document.getElementById('image-upload'),
	);
	ReactDOM.render(
		React.createElement(Game),
		document.getElementById('sudoku_game'),
	);
});
