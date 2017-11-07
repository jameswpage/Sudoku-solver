 
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import Game from './Sudoku';
import Solver from './solver';
import ImageUpload from './image_input';
import App from './App';

 
document.addEventListener('DOMContentLoaded', function() {
	/*ReactDOM.render(
		React.createElement(ImageUpload),
		document.getElementById('image-upload'),
	);*/
	ReactDOM.render(
		React.createElement(App),
		document.getElementById('sudoku_game'),
	);
});
