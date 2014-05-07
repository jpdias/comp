String.prototype.replaceAt=function(index, character) 
{
	return this.substr(0, index) + character + this.substr(index+character.length);
}

//"Tape class"
function Tape(alphabet, blank, pos, tapeContent)
{
	//data
	this.alphabet= alphabet;
	this.blankSymbol= blank;
	this.pos= pos;
	this.tapeContent= tapeContent;
	
	//methods
	this.moveRight= function (){
		var tapeLength= (this.tapeContent).length;
		if(this.pos == tapeLength - 1)
			this.tapeContent= this.tapeContent.concat(this.blankSymbol);
		this.pos= this.pos + 1;
			
	}
	this.moveLeft= function (){
		if(this.pos == 0)
			this.tapeContent= this.blankSymbol.concat(this.tapeContent);
		else
			this.pos= this.pos - 1;
							
	}
	//Writes symbol on the tape, at the current position
	//TODO: check if "Symbol" exists in "this.alphabet"
	this.write= function(Symbol){
		this.tapeContent= this.tapeContent.replaceAt(this.pos, Symbol);
	}
	//returns current position tape contents
	this.read= function(){
		return this.tapeContent.charAt(this.pos);
	}
	//Show Tape
	this.show= function(){
		document.write("Tape Alphabet: <br>");
		for(var j= 0; j < alphabet.length; j++)
		{
		
			document.write(j + ": " + alphabet[j] + "; " + "<br>");
		}
		document.write("Blank Symbol: " + this.blankSymbol + "<br>" );
		document.write("Current Pos: " + this.pos + "<br>" );
		document.write("Tape Content: ")
		for(var i= 0; i < tapeContent.length; i++)
		{
			document.write(tapeContent[i]);
		}
		document.write("<br>");
	}
	
}

//"TuringMachine class"
function TuringMachine(tape, transitionsTable, initialState, finalStates)
{
	this.tape= tape;
	this.transitionsTable= transitionsTable;
	this.initialState= initialState;
	this.finalStates= finalStates;
	//this.blankSymbol= blank; // Necessary???
	this.currentState= initialState;
	this.stepNumber= 0;
	this.step= function(){
			
		var stepResult = document.getElementById('result');
		
		var stepString= "";
		for(var k= 0; k < (this.tape).tapeContent.length; k++)
		{
			if(k == (this.tape).pos)
				stepString += "<font color=\"red\">" + (this.tape).tapeContent[k] + "</font>";
			else
				stepString += "<font color=\"black\">" + (this.tape).tapeContent[k] + "</font>";
		}
		stepString += "<br>";
				
		stepResult.insertAdjacentHTML('beforeend', stepString);
		
		
		//obtain symbol on the current tape position
		var currentSymbolOnTape= (this.tape).read();
			
		var nextState;
		var nextSymbol;
		var nextDirection;
		
		var transitionFound= false;
		
		for(var i= 0; i < transitionsTable.length; i++)
		{
			if((transitionsTable[i].currentState == this.currentState) &&  (transitionsTable[i].scanSymbol == currentSymbolOnTape))
			{
				nextState= transitionsTable[i].nextState;
				nextSymbol= transitionsTable[i].printSymbol;
				nextDirection= transitionsTable[i].direction;
								
				//write on current tape position "nextSymbol"
				(this.tape).write(nextSymbol);
				
				transitionFound= true;
				
				break;
			}
		}
		
		if(transitionFound)
		{
			//update "currentState" after transition
			this.currentState= nextState;
			
			this.stepNumber += 1;
			
			//check if a final state have been reached.
			for(var j= 0; j < (this.finalStates).length; j++)
			{
				if(finalStates[j] == nextState)
				{
					stepString += "<br><br><font color=\"green\">" + "SUCCESS!!!" + "</font><br>";
					stepResult.insertAdjacentHTML('beforeend', stepString);
					return 1;
				}
			}
			
			//update tape position after transition
			if(nextDirection == 'R')
			{
				(this.tape).moveRight();
			}
			else if(nextDirection == 'L')
			{
				(this.tape).moveLeft();
			}
		}
		else
		{
			stepString += "<br><br><font color=\"red\">" + "FAIL!!!" + "</font><br>";
			stepResult.insertAdjacentHTML('beforeend', stepString);
			return 0;
		}
		
		return 2;
		
		
	}
	this.runNsteps= function(numberOfSteps){
	}
	this.run= function(){
		var returnValue;
		do
		{
			returnValue= this.step();
		}while(returnValue == 2);
	}
	this.show= function(){
		document.write("tape... <br>");
		document.write("Initial State= " + this.initialState + "!<br>");
		document.write("Final States: <br>");
		for(var j= 0; j < finalStates.length; j++)
		{
			document.write(finalStates[j] + "; ");
		}
		
		document.write("<br>");
		document.write("Current State: " + this.currentState + "!<br>");
		
		document.write("<br>Transitions Table: <br>");
		for(var i= 0; i < transitionsTable.length; i++)
		{
			document.write(i + ": " + "currentState= " + transitionsTable[i].currentState +
				"; nextState= " + transitionsTable[i].nextState + 
				"; scanSymbol= " + transitionsTable[i].scanSymbol +
				"; printSymbol= " + transitionsTable[i].printSymbol + 
				"; direction= " + transitionsTable[i].direction + "!<br>");
		}
		document.write("Current Step number= " + this.stepNumber + "! <br> <br>");
		
	}
	
	
}

//"Transition Class"
function Transition(currentState, nextState, scanSymbol, printSymbol, direction)
{
	this.currentState= currentState;
	this.nextState= nextState;
	this.scanSymbol= scanSymbol;
	this.printSymbol= printSymbol;
	this.direction= direction;
}