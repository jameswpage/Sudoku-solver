

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
	    this.state = {value: '', font: styles.input, show: props.show};
	    if(props.value != 0){
	    	this.state = {value: props.value, show: props.show};
	    };
	    this.handleChange = this.handleChange.bind(this);
  	}

  	componentWillReceiveProps(nextProps) {
  		if(nextProps.initial == true){
  			this.setState({value: nextProps.value, font: styles.input, show: true});
  		}
		else{ 
			if(parseInt(nextProps.value) != parseInt(this.state.value)) {
				this.setState({value: nextProps.value, font: styles.guess, show: nextProps.show});
			}
			else if(nextProps.show == true && this.state.show == false){
				this.setState({show: nextProps.show});
			}
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

  		if(this.state.show == true){
		    return (
		    	<input className={className} id = {id} value = {this.state.value} style = {this.state.font} onChange={this.handleChange}/> 	
			);
		}
		else{
			return (
		    	<input className={className} id = {id} value = '' style = {this.state.font} onChange={this.handleChange}/> 	
			);
		}
		
  	}
}

class Row extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value, init: this.props.initial, show: this.props.show};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial, show: nextProps.show});
	  	}
	  	else if(nextProps.show == true && this.state.show == false){
	  		this.setState({show: true});
	  	}
	}

	render() {

		const dim = 9;
	  	var arr = [];
	  	for (var i = 0; i < dim; i++){
	  		arr.push(i);
	  	}

	  	const listItems = arr.map((square, index) =>
	    	<Square key={index} show = {this.state.show}
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

		this.state = {value: this.props.value, init: this.props.initial, show: this.props.show};
	}

	componentWillReceiveProps(nextProps) {
		console.log('board', nextProps.show);
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial, show: nextProps.show});
	  	}  
	  	if(nextProps.show == true && this.state.show == false){
	  		this.setState({show: true});
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
		    	<Row key={num} index = {num} value = {this.state.value[num]} show = {this.state.show} initial = {this.state.init}/>
		);

	  	return (
	  		<div> {listItems} </div>
	  	);
 	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: props.sudokuArray, init: true, show: true};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showValues = this.showValues.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.sudokuArray != this.props.arr){
	  		this.setState({arr: nextProps.sudokuArray, init: true, show: true });
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
		this.setState({arr: final, init: false, show: false});

		event.preventDefault();

		console.log(this)
	}

	showValues() {
		console.log('called')
		this.setState({show: true})
	}

	render() {
		return (
			<form if = "form1" onSubmit = {this.handleSubmit} >
				<div className = "game">
					<div className = "game-board">
						<Board value = {this.state.arr} initial = {this.state.init} show = {this.state.show} />
					</div>
					<div className = "game-info">
						<div></div>
					</div>
				</div>
				<input type="submit" value="Submit" />
				<button type="button" form="form1" value="Show" onClick= {this.showValues}>Show </button>
			</form>
		);
	}
}

export default Game; 
