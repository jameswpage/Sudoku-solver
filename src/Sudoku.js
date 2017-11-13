

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
	    this.state = {value: '', font: styles.input, show: props.show, trueValue: ''};
	    if(props.value != 0){
	    	this.state = {value: props.value, show: props.show, trueValue: props.value};
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.showValue = this.showValue.bind(this);
	    this.display = 0
  	}

  	componentWillReceiveProps(nextProps) {
  		console.log(nextProps)
  		if(nextProps.initial == true){
  			this.setState({value: nextProps.value, font: styles.input, show: true, trueValue: nextProps.value});
  		}
		else{ 
			if(parseInt(nextProps.value) != parseInt(this.state.value)) {
				if(nextProps.check == true){/*} && parseInt(this.state.value) != parseInt(this.state.trueValue)){*/
	  				this.setState({font: styles.wrong});
	  			}
				else{
					this.setState({value: nextProps.value, font: styles.guess, show: nextProps.show, trueValue: nextProps.value});
				}
			}
			else if(nextProps.show == true && this.state.show == false){
				this.setState({show: nextProps.show});
			}
			/*else if(nextProps.check == true){

				console.log(nextProps, this.state.value, this.state.trueValue, this.display);
	  			if(parseInt(this.state.value) != parseInt(this.state.trueValue)){
	  				console.log(this.state.value);
	  				this.setState({font: styles.wrong});
	  			}
	  		}*/
	  	}

	  	if(nextProps.value == 0){
			this.setState({value: '', trueValue: ''});
		}
	}
  
  	handleChange(event) {
  		this.display = event.target.value.toString();
  		this.setState({value: event.target.value, show: true});
  		if(this.state.font == styles.wrong){
  			this.setState({font: styles.guess});
  		}
  	}

  	showValue() {
  		if(this.state.show == false){
  			this.setState({show: true});
  		}
  	}

  	render() {
  		console.log(this.state);
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
  		if(this.props.row == 3 || this.props.row == 6){
  			id = 'brow';
  		}

  		if(this.state.show == true){
		    return (
		    	<input className={className} id = {id} value = {this.state.value} style = {this.state.font} 
		    	onChange={this.handleChange}/> 	
			);
		}
		else{
			return (
		    	<input className={className} id = {id} value = '' style = {this.state.font} 
		    	onDoubleClick = {this.showValue} onChange={this.handleChange}/> 	
			);
		}
		
  	}
}

class Row extends React.Component {

	constructor(props) {
		super(props);

		this.state = {value: this.props.value, init: this.props.initial, show: this.props.show, check: this.props.check};
	}

	componentWillReceiveProps(nextProps) {
		//This does not capture any cases that are NOT caught in the Game component, so it may be better to just iterate
		//through nextProps and set them all
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial, show: nextProps.show, check: nextProps.check});
	  	}
	  	else if(nextProps.show == true && this.state.show == false){
	  		this.setState({show: true});
	  	}
	  	else if(nextProps.check == true && this.state.check == false){
	  		this.setState({check: true});
	  	}
	}

	render() {

		const dim = 9;
	  	var arr = [];
	  	for (var i = 0; i < dim; i++){
	  		arr.push(i);
	  	}

	  	const listItems = arr.map((square, index) =>
	    	<Square key={index} show = {this.state.show} check = {this.state.check}
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

		this.state = {value: this.props.value, init: this.props.initial, show: this.props.show, check: this.props.check};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value){
	  		this.setState({value: nextProps.value, init: nextProps.initial, show: nextProps.show, check: nextProps.check});
	  	}  
	  	if(nextProps.show == true && this.state.show == false){
	  		this.setState({show: true});
	  	}
	  	if(nextProps.check == true && this.state.show == false){
	  		this.setState({check: true})
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
		    	<Row key={num} index = {num} value = {this.state.value[num]} show = {this.state.show} 
		    	initial = {this.state.init} check = {this.state.check} />
		);

	  	return (
	  		<div> {listItems} </div>
	  	);
 	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: props.sudokuArray, init: true, show: true, saved: props.sudokuArray, check: false};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showValues = this.showValues.bind(this);
		this.clearValues = this.clearValues.bind(this);
		this.resetPuzzle = this.resetPuzzle.bind(this);
		this.checkValues = this.checkValues.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.sudokuArray != this.props.arr){
	  		this.setState({arr: nextProps.sudokuArray, init: true, show: true, saved: nextProps.sudokuArray, check: false });
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
		console.log(final);
		//reset puzzle 
		this.setState({arr: final, init: false, check: false, show: false});

		event.preventDefault();

	}

	showValues() {
		this.setState({show: true});
	}

	resetPuzzle() {
		this.setState({arr: this.state.saved, show: false});
	}

	checkValues() {
		this.setState({check: true});
	}


	clearValues(){
		var blank =  [[0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0],
			          [0,0,0,0,0,0,0,0,0]];

		this.setState({arr: blank, init: true})
	}

	render() {
		return (
			<form if = "form1" onSubmit = {this.handleSubmit} >
				<div className = "game">
					<div className = "game-board">
						<Board value = {this.state.arr} initial = {this.state.init} show = {this.state.show} 
						check = {this.state.check}/>
					</div>
					<div className = "game-info">
						<div></div>
					</div>
				</div>
				<input type="submit" value="Solve" />
				<button type="button" form="form1" value="Show" onClick= {this.showValues}>Show</button>
				<button type="button" form="form1" value="Clear" onClick= {this.clearValues}>Clear</button>
				<button type="button" form="form1" value="Reset" onClick= {this.resetPuzzle}>Reset</button>
				<button type = "button" form = "form1" value = "Check" onClick = {this.checkValues}>Check</button>
			</form>
		);
	}
}

export default Game; 
