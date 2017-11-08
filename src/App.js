


import React from 'react';
import Game from './Sudoku';
import ImageUpload from './image_input';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			sudokuArray : [[5,0,4,9,0,0,0,0,2],
			              [9,0,0,0,0,2,8,0,0],
			              [0,0,6,7,0,0,0,0,9],
			              [0,0,5,0,0,6,0,0,3],
			              [3,0,0,0,7,0,0,0,1],
			              [4,0,0,1,0,0,9,0,0],
			              [2,0,0,0,0,9,7,0,0],
			              [0,0,8,4,0,0,0,0,6],
			              [6,0,0,0,0,3,4,0,8]]
		};
	}

	updateArray(newArray) {
		this.setState({sudokuArray: newArray})
	}

	render() {
		return (
			<div>
				<div id = "first">
					<ImageUpload updateArray = {this.updateArray.bind(this)} />
				</div>
				<div id = "second">
					<Game sudokuArray = {this.state.sudokuArray} />
				</div>
			</div>
		);
	}
}

export default App;