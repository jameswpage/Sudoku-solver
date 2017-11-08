

import React from 'react';
import ReactDOM from 'react-dom';
import SudokuSolver from './solver';


const styles = {
	input: {color: 'black'},
	guess: {color: 'blue'},
	wrong: {color: 'red'}
};

class Square extends React.Component {

  	constructor(props) {
	    super(props);
	    this.state = {value: '', font: styles.input};
	    if(props.value != 0){
	    	this.state = {value: props.value};
	    };
	    this.handleChange = this.handleChange.bind(this);
  	}

  	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value) {
			if(nextProps.value == 0){
				this.setState({value: ''});
			}
	  		else if(typeof nextProps.value == "string"){
	  			this.setState({value: nextProps.value, font: styles.input});
	  		}
	  		else{
	  			this.setState({value: nextProps.value, font: styles.guess});
	  		}
	  	}  
	}
  
  	handleChange(event) {
  		this.setState({value: event.target.value});
  	}

  	render() {
	    return (
	      <input className="square" value = {this.state.value} style = {this.state.font} onChange={this.handleChange}/>
	    );
  	}
}

class Row extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value });
	  	}  
	}

	render() {

		const dim = 9;
	  	var arr = [];
	  	for (var i = 0; i < dim; i++){
	  		arr.push(i);
	  	}

	  	const listItems = arr.map((square, index) =>
	    	<Square key={index}
	              value= {this.state.value[index]} />
	  	);

	  	return (
	  		<div className = "board-row">{listItems}</div>
	  	);
	}
}


class Board extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value });
	  	}  
	}
 
  	render() {
	  	const dim = 9;
	  	var rows = [];
	  	for (var i=0; i < dim; i++) {
	    	rows.push(i);
	  	}

	  	const listItems = rows.map((num) =>
		    // Correct! Key should be specified inside the array.
		    	<Row key={num} value = {this.state.value[num]} />
		);

	  	return (
	  		<div> {listItems} </div>
	  	);
 	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: props.sudokuArray};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.sudokuArray != this.props.arr){
	  		this.setState({arr: nextProps.sudokuArray });
	  	}  
	}

	handleSubmit(event) {
		var puz = [];
		var row = [];
		for(var i = 0; i < event.target.length; i++){
			var val = event.target[i].value;
			if(val == ''){
				val = 0;
			}
			row.push(val);
			if(i%9==8){
				puz.push(row);
				row = [];
			}
		}

		//code for solving the puzzle until completion
		var puz = new SudokuSolver(puz);
		var temp = puz.toArray();
		puz.solve();
		var temp2 = puz.toArray();
		while(temp.toString() != temp2.toString()){
			temp = temp2;
			puz.solve();
			temp2 = puz.toArray();
		}

		//reset puzzle 
		this.setState({arr: puz.toArray()});

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className = "game">
					<div className = "game-board">
						<Board value = {this.state.arr} />
					</div>
					<div className = "game-info">
						<div></div>
					</div>
				</div>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Game; 
