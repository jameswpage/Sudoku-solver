

Array.prototype.combs = function(num) {

    var str = this,
        length = str.length,
        of = Math.pow(2, length) - 1,
        out, combinations = [];

    while(of) {

        out = [];

        for(var i = 0, y; i < length; i++) {

            y = (1 << i);

            if(y & of && (y !== of))
                out.push(str[i]);

        }

        if (out.length == num) {
           combinations.push(out);
        }

        of--;
    }

    return combinations;
}


class sudokuNode{
    
    constructor(num){
        this.answer = 0
        this.nums = [1,1,1,1,1,1,1,1,1];
        this.num_length = 9
        
        if(num != 0){
            this.answer = num
            this.nums = [0,0,0,0,0,0,0,0,0];
            this.nums[num-1] = 1
            this.num_length = 1
        }
    }

    __eq__(n2){
        if(this.answer != n2.answer){
            return false;
        }
        for(var i = 0; i < 9; i++){
            if( this.nums[i] != n2.nums[i]){
                return false;
            }
        }
        return true;
    }
    
    toString(){
        if(this.answer != 0){
            return String(this.answer);
        }
        return String(this.nums);
    }

    
    vals(){
        if(this.answer != 0){
            return [this.answer];
        }
        var vals = [];
        for(var i = 0; i < 9; i++){
            if(this.nums[i] == 1){
                vals.push(i);
            }
        }
        return vals;
    }
}


class sudokuSolver {
    
    constructor(array) {
        this.arr = array;
        this.solved = 0;
        this.rowPos = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

        this.colPos = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

        this.boxPos = [[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
        				[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
        				[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]];
        this.puzzle = this.createPuzzle();
        this.update();
    }    
    
    createPuzzle() {
        if((this.arr.length) != 9 || (this.arr[0].length) != 9){
            throw new RangeError();
        }
            
        var puzzle = this.arr.slice(0);

        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                puzzle[i][j] = new sudokuNode(this.arr[i][j]);
                if(this.arr[i][j] != 0){
                    this.solved += 1;
                }
            }
        }

        return puzzle;
    }

    update() {
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.puzzle[i][j].answer != 0){
                    this.rcb(i,j);
                }
            }
        }
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.puzzle[i][j].num_length > 1){
                    for(var k = 0; k < 9; k++){
                        if(this.puzzle[i][j].nums[k] == 1){
                            this.rowPos[i][k] += 1;
                            this.colPos[j][k] += 1;
                            this.boxPos[parseInt(i/3)][parseInt(j/3)][k] += 1;
                        }
                    }
                }
            }
        }
    }
           
    rcb(i,j) {
        var val = this.puzzle[i][j].answer;
        for(var k = 0; k < 9; k++){
            for(var l = 0; l < 9; l++){
                if(i == k || l == j || this.isInBox(i,j,k,l)){
                    if(this.puzzle[k][l].answer == 0 && this.puzzle[k][l].nums[val-1] == 1){
                        this.puzzle[k][l].num_length = this.puzzle[k][l].num_length-1;
                        this.puzzle[k][l].nums[val-1] = 0;
                    }
                }
            }
        }
    }

    isInBox(i,j,k,l){
        if((parseInt(i/3) == parseInt(k/3)) && (parseInt(j/3) == parseInt(l/3))){
            return true;
        }
        return false;
    }

  
   
    wholeUpdate(){
        this.rowPos = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

        this.colPos = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
        				[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

        this.boxPos = [[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
        				[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
        				[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]];
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.puzzle[i][j].answer == 0 && this.puzzle[i][j].num_length > 1){
                    for(var k = 0; k < 9; k++){
                        if(this.puzzle[i][j].nums[k] == 1){
                            this.rowPos[i][k] += 1;
                            this.colPos[j][k] += 1;
                            this.boxPos[parseInt(i/3)][parseInt(j/3)][k] += 1;
                        }
                    }
                }
            }
        }
    }
        
    
    solve(){
        //first way to check for( answer is to see if( a box only has one potential
        //solution
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.puzzle[i][j].answer == 0 && this.puzzle[i][j].num_length == 1){
                    for(var k = 0; k < 9; k++){
                        if(this.puzzle[i][j].nums[k] == 1){
                            this.puzzle[i][j].answer = k+1;
                            this.solved += 1;
                            this.rcb(i,j);
                        }
                    }
                }
            }
        }
                                
        //second way to check for( solution is to see if( a row/column/box only has
        //1 potential for( fit for( any given number
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.rowPos[i][j] == 1){
                    for(var k = 0; k < 9; k++){
                        if(this.puzzle[i][k].answer == 0 && this.puzzle[i][k].nums[j] == 1){
                            this.puzzle[i][k].answer = j+1;
                            this.solved += 1;
                            this.rcb(i,k);
                        }
                    }
                }
                if(this.colPos[i][j] == 1){
                    for(var k = 0; k < 9; k++){
                        if(this.puzzle[k][i].answer == 0 && this.puzzle[k][i].nums[j] == 1){
                            this.puzzle[k][i].answer = j+1;
                            this.solved += 1;
                            this.rcb(k, i);
                        }
                    }
                }
            }
        }
                            
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                for(var k = 0; k < 9; k++){
                    if(this.boxPos[i][j][k] == 1){
                        for(var l = parseInt(i*3); l < parseInt(i*3) + 3; l++){
                            for(var m = parseInt(j*3); m < parseInt(j*3) + 3; m++){
                                if(this.puzzle[l][m].answer == 0 && this.puzzle[l][m].nums[k] == 1){
                                    this.puzzle[l][m].answer = k+1;
                                    this.solved += 1;
                                    this.rcb(l, m);
                                }
                            }
                        }
                    }
                }
            }
        }
   
        this.limit_squares_of_pos();
        this.wholeUpdate();       
        this.remove_pos_from_squares();
        this.wholeUpdate();
    }
        

  
//////////////////////////////////////////////////////////////////////////////////////////////////////////                      
    //This function is for( removing potential values from nodes if the value
    //is known to be limited to other nodes. 
    //for instance: if two squares in an rcb have ONLY 2 && 3 as potentials, then
    //2 && 3 MUST be in those squares, && can be removed from all other nodes
    //in the rcb
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    limit_squares_of_pos() {

        var rowDicts = [{},{},{},{},{},{},{},{},{}];
        var colDicts = [{},{},{},{},{},{},{},{},{}];
        var boxDicts = [[{},{},{}],[{},{},{}],[{},{},{}]];
        
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if(this.puzzle[i][j].answer == 0){
                    var key = this.puzzle[i][j].nums.slice(0);
                    if(key in rowDicts[i]){
                        rowDicts[i][key].push(j);
                    }
                    else{
                        rowDicts[i][key] = [j];
                    }
                    if(key in colDicts[j]){
                        colDicts[j][key].push(i);
                    }
                    else{
                        colDicts[j][key] = [i];
                    }
                    if(key in boxDicts[parseInt(i/3)][parseInt(j/3)]){
                        boxDicts[parseInt(i/3)][parseInt(j/3)][key].push((i,j));
                    }
                    else{
                        boxDicts[parseInt(i/3)][parseInt(j/3)][key] = [(i,j)];
                    }
                }
            }
        }
        
        for(var num = 0; num < 9; num++){
            for(var key in rowDicts[num]){
                if((rowDicts[num][key].length) == 1){
                    continue;
                }
                var keyarr = Array.from(key);
                var potnum = keyarr.reduce(function(a,b) {return a+b;});
                if(rowDicts[num][key].length == potnum){
                    for(var j = 0; j < 9; j++){
                        if(!rowDicts[num][key].includes(j)){
                            var n3 = this.puzzle[num][j];
                            for(var val = 0; val < 9; val ++){
                                if(keyarr[val] == 1){
                                    if( n3.nums[val] == 1){
                                        n3.nums[val] = 0;
                                        n3.num_length -= 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        for(var num = 0; num < 9; num++){
            for(var key in colDicts[num]){
                if((colDicts[num][key].length) == 1){
                    continue;
                }
                var keyarr = Array.from(key);
                var potnum = keyarr.reduce((a,b) => a+b, 0);
                if(colDicts[num][key].length == potnum){
                    for(var i = 0; i < 9; i++){
                        if(!rowDicts[num][key].includes(i)){
                            var n3 = this.puzzle[i][num];
                            for(var val = 0; val < 9; val ++){
                                if(keyarr[val] == 1){
                                    if(n3.nums[val] == 1){
                                        n3.nums[val] = 0;
                                        n3.num_length -= 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var box = boxDicts[i][j];
                for(var key in box){
                    if((box[key].length) <= 1){
                        continue;
                    }
                    var keyarr = Array.from(key);
                    var potnum = keyarr.reduce((a,b) => a+b, 0);
                    if((box[key].length) == potnum){
                        for(var m = parseInt(i*3); m < parseInt(i*3) + 3; m++){
                            for(var n = parseInt(j*3); n < parseInt(j*3) + 3; n++){
                                if(!box[key].includes((m,n))){
                                    var n3 = this.puzzle[m][n];
                                    for(var val = 0; val < 9; val++){
                                        if(keyarr[val] == 1){
                                            if(n3.nums[val] == 1){
                                                n3.nums[val] = 0;
                                                n3.num_length -= 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }



        ////////////////////////////END OF REDUCEPOT//////////////////////////////////////////////////////////////
    
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //This function is for( removing potential values from squares where it is 
    //known that the value has to be something else. Similar, but dif(ferent from 
    //limit_squares_of_pos
    //for( Example){ if( only two squares in an rcb have 2, 3 as potential values, 
    //Then those two squares MUST be 2 && 3, && therefor(e we can remove 
    //other potential values they have
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    remove_pos_from_squares(){
        for(var rownum = 0; rownum < this.rowPos.length;  rownum ++){
        	var row  = this.rowPos[rownum];
            var l = [0,0,0,0,0,0,0,0,0];
            for(var val = 0; val < row.length; val++){
                l[row[val]] += 1;
            }
                
            //i is the number of times a potential value is repeated in the row
            //val is the number of values repeated i many times
            for(var i = 0; i < l.length; i++){
            	var val = l[i];
                if(i > 1 && val >= i){
                    var reducedPos = [];
                    for(var j = 0; j < row.length; j++){
                    	var p = row[j];
                        if(p == i){
                            reducedPos.push(j);
                        }
                    } 
                    //reducedPos now has the values that were repeated a number
                    //of times, && if( they are repeated in the same nodes, then 
                    //those nodes can be no other values
                    
                    //checkList contains groups of values that, if in all the 
                    //same nodes, MUST be the values of those node
                    var checkList = reducedPos.combs(i);
                    
                    for(var t = 0; t < checkList.length; t++){
                    	var tup = checkList[t];
                        var valid = true;
                        var indexes = [];
                        for(var j = 0; j < 9; j++){
                            
                            var j_vals = this.puzzle[rownum][j].vals();
                            
                            var num = 0;
                            for(var tupcount = 0; tupcount < tup.length; tupcount++){
                            	pos = tup[tupcount];
                                for(var ind = 0; ind < j_vals.length; ind++){
                                	var p = j_vals[ind];
                                    if(pos == p){
                                        num += 1;
                                    }
                                }
                            }
                            if(num == tup.length){
                                indexes.push(j);
                            }
                            else if(num != 0){
                                valid = false;
                                break;
                            }
                        }
                        if(valid){
                            for(var j = 0; j < indexes.length; j++){
                            	var index = indexes[j];
                                this.puzzle[rownum][index].nums = [0,0,0,0,0,0,0,0,0];
                                for(var tupcount = 0; tupcount < tup.length; tupcount++){
                                	var pos = tup[tupcount];
                                    this.puzzle[rownum][index].nums[pos] = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    

        
        //refresh potential lists
        this.wholeUpdate();
        
        //repeat process but for columns////////////////////////////////////////////////////////////////
        for(var colnum = 0; colnum < this.colPos.length;  colnum ++){
        	var col  = this.colPos[colnum];
            var l = [0,0,0,0,0,0,0,0,0];
            for(var val = 0; val < col.length; val++){
                l[col[val]] += 1;
            }
                
            //i is the number of times a potential value is repeated in the row
            //val is the number of values repeated i many times
			for(var i = 0; i < l.length; i++){
            	var val = l[i];
                if(i > 1 && val >= i){
                    var reducedPos = [];
                    for(var j = 0; j < row.length; j++){
                    	var p = row[j];
                        if(p == i){
                            reducedPos.push(j);
                        }
                    } 
                    //reducedPos now has the values that were repeated a number
                    //of times, && if( they are repeated in the same nodes, then 
                    //those nodes can be no other values
                    
                    //checkList contains groups of values that, if( in all the 
                    //same nodes, MUST be the values of those node
                    var checkList = reducedPos.combs(i);

                    for(var t = 0; t < checkList.length; t++){
                    	var tup = checkList[t];
                        var valid = true;
                        var indexes = [];
                        for(var j = 0; j < 9; j++){

                            var j_vals = this.puzzle[j][colnum].vals();
                            
                            var num = 0;
                            for(var tupcount = 0; tupcount < tup.length; tupcount++){
                            	pos = tup[tupcount];
                                for(var ind = 0; ind < j_vals.length; ind++){
                                	var p = j_vals[ind];
                                    if(pos == p){
                                        num += 1;
                                    }
                                }
                            }
                            if(num == tup.length){
                                indexes.push(j);
                            }
                            else if(num != 0){
                                valid = false;
                                break;
                            }
                        }
                        if(valid){
                            for(var j = 0; j < indexes.length; j++){
                            	var index = indexes[j];
                                this.puzzle[index][colnum].nums = [0,0,0,0,0,0,0,0,0];
                                for(var tupcount = 0; tupcount < tup.length; tupcount++){
                                	var pos = tup[tupcount];
                                    this.puzzle[index][colnum].nums[pos] = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        //Refresh potential lists
        this.wholeUpdate();
        
        //repeat process but for( boxes
        for(var d1 = 0; d1 < 3; d1++){
            for(var d2 = 0; d2 < 3; d2++){
                var box = this.boxPos[d1][d2];
                var l = [0,0,0,0,0,0,0,0,0];
                for(var val = 0; val < box.length; val++){
	                l[box[val]] += 1;
	            }
                    
                //i is the number of times a potential value is repeated in the row
                //val is the number of values repeated i many times
                for(var i = 0; i < l.length; i++){
	            	var val = l[i];
	                if(i > 1 && val >= i){
	                    var reducedPos = [];
	                    for(var j = 0; j < box.length; j++){
	                    	var p = row[j];
	                        if(p == i){
	                            reducedPos.push(j);
	                        }
	                    } 
                        //reducedPos now has the values that were repeated a number
                        //of times, && if( they are repeated in the same nodes, then 
                        //those nodes can be no other values
                        
                        //checkList contains groups of values that, if( in all the 
                        //same nodes, MUST be the values of those node
                        var checkList = reducedPos.combs(i);

                        for(var t = 0; t < checkList.length; t++){
	                    	var tup = checkList[t];
	                        var valid = true;
	                        var indexes = [];
	                        for(var j = parseInt(d1*3); j < parseInt(d1*3)+3; j++){
	                        	for(var k = parseInt(d2*3); k < parseInt(d2*3)+3; k++){
		                            
		                            var j_vals = this.puzzle[j][k].vals();
		                            
		                            var num = 0;
		                            for(var tupcount = 0; tupcount < tup.length; tupcount++){
		                            	pos = tup[tupcount];
		                                for(var ind = 0; ind < j_vals.length; ind++){
		                                	var p = j_vals[ind];
		                                    if(pos == p){
		                                        num += 1;
		                                    }
		                                }
		                            }
		                            if(num == tup.length){
		                                indexes.push(j);
		                            }
		                            else if(num != 0){
		                                valid = false;
		                                break;
		                            }
                                }
                            }
                            if(valid){
	                            for(var j = 0; j < indexes.length; j++){
	                            	var index = indexes[j];
	                                this.puzzle[index[0]][index[1]].nums = [0,0,0,0,0,0,0,0,0];
	                                for(var tupcount = 0; tupcount < tup.length; tupcount++){
	                                	var pos = tup[tupcount];
	                                    this.puzzle[index[0]][index[1]].nums[pos] = 1;
	                                }
	                            }
	                        }
                        }
                    }
                }
            }
        }

        this.wholeUpdate();
    }


    toArray() {
    	var arr = [];
    	for(var i = 0; i < 9; i ++){
    		var row = [];
    		for(var j = 0; j < 9; j++){
    			row.push(this.puzzle[i][j].answer);
    		}
    		arr.push(row);
    	}
    	return arr;
    }
}
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//****************************END OF REMOVE POS FROM SQUARES********************
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

/*

                    
    
    __eq__(this, puz2)){
        same = True
        for( var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                if( this.puzzle[i][j] != puz2.puzzle[i][j]){
                    same = False
        return same
 
	*/

export default sudokuSolver;