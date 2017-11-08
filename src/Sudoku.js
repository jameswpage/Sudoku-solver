

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
  		if(nextProps.initial == true){
  			this.setState({value: nextProps.value, font: styles.input});
  		}
		else if(parseInt(nextProps.value) != parseInt(this.state.value)) {
			this.setState({value: nextProps.value, font: styles.guess});
	  	}  
	  	if(nextProps.value == 0){
			this.setState({value: ''});
		}
	}
  
  	handleChange(event) {
  		this.setState({value: event.target.value});
  	}

  	render() {
  		var className = 'square';
  		if(this.props.index == 2 || this.props.index == 5){
  			className = 'rsquare';
  		}
  		if(this.props.index == 3 || this.props.index == 6){
  			className = 'lsquare';
  		}

  		var id = 'row';
  		if(this.props.row == 2 || this.props.row == 5){
  			id = 'trow';
  		}
  		if(this.props.row == 3 || this.props.row == 6 || this.props.row == 0){
  			id = 'brow';
  		}

	    return (
	      <input className={className} id = {id} value = {this.state.value} style = {this.state.font} onChange={this.handleChange}/>
	    );
  	}
}

class Row extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value, init: this.props.initial};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial});
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
	              value= {this.state.value[index]} initial = {this.state.init} index = {index} row = {this.props.index}/>
	  	);

	  	return (
	  		<div className = "board-row">{listItems}</div>
	  	);
	}
}


class Board extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value, init: this.props.initial};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial });
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
		    	<Row key={num} index = {num} value = {this.state.value[num]} initial = {this.state.init}/>
		);

	  	return (
	  		<div> {listItems} </div>
	  	);
 	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: props.sudokuArray, init: true};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.sudokuArray != this.props.arr){
	  		this.setState({arr: nextProps.sudokuArray, init: true });
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
		
		//tpuz is a reference to the original array that is updated in SudokuSolver
		var tpuz = puz.slice()

		//code for solving the puzzle until completion
		puz = new SudokuSolver(puz.slice(0));
		var temp = puz.toArray();
		puz.solve();
		var temp2 = puz.toArray();
		while(temp.toString() != temp2.toString()){
			temp = temp2;
			puz.solve();
			temp2 = puz.toArray();
		}
		
		var final = puz.toArray()
		//reset puzzle 
		this.setState({arr: final, init: false});

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className = "game">
					<div className = "game-board">
						<Board value = {this.state.arr} initial = {this.state.init} />
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
