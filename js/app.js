//justin's calcuator

//calculator interface
var view = {
	display: document.getElementById('display'),

	init: function(){
		//init buttons
		this.initNumBtns();
		this.initOperationBtns();
		this.initOtherBtns();
		this.update();
	},

	//setup the number buttons
	initNumBtns: function(){
		var buttons = document.getElementsByClassName('number-button');
		for(var i = 0; i < buttons.length; i++){
			(function(btnIndex){
				var button = buttons[btnIndex];
				button.addEventListener('click', function(){
					calculator.handleNumber(button.getAttribute('number-value'));
				});
			})(i);
		}
	},

	//setup the operations buttons
	initOperationBtns: function(){
		var opButtons = document.getElementsByClassName('operation');
		for(var i = 0; i < opButtons.length; i++){
			(function(opIndex){
				var opButton = opButtons[opIndex];
				opButton.addEventListener('click', function(){
					calculator.handleOperation(opButton.getAttribute('operation-value'));
				});
			})(i);
		}
	},

	initOtherBtns: function(){
		//equals, decimal, clear
		document.getElementById('equals').addEventListener('click', function(){
			calculator.handleCalculate();
		});

		document.getElementById('decimal').addEventListener('click', function(){
			calculator.handleDecimal();
		});

		document.getElementById('clear').addEventListener('click', function(){
			calculator.handleClear();
		});

		document.getElementById('plusminus').addEventListener('click', function(){
			calculator.handlePlusMinus();
		});
	},

	update: function(){
		if(calculator.displayValue === ""){
			this.display.innerHTML = "0";
		}else{
			this.display.innerHTML = calculator.displayValue;
		}
	},

	//for showing the computed value, so 
	showStoredValue: function(){
		this.display.innerHTML = calculator.storedValue;
	},

	showError: function(){
		this.display.innderHTML = "ERROR";
	}
};

var calculator = {
	//constants
	operations: {
		ADD: "add",
		SUBTRACT: "subtract",
		MULTIPLY: "multiply",
		DIVIDE: "divide"
	},

	storedValue: "",
	displayValue: "",
	currentOperation: null,

	handleNumber: function(num){
		//can't have zero at beginning of number
		if(this.displayValue === "0"){
			this.displayValue = num;
			view.update();
			return;
		}

		//stored value, but no operation
		if(this.storedValue && !this.op) this.op = null;

		//will have to controll for length
		this.displayValue += num;
		view.update();
	},

	handleDecimal: function(){
		if(this.displayValue.indexOf(".") < 0 && this.displayValue){
			this.displayValue += ".";
			view.update();
		}
	},

	handlePlusMinus: function(){
		if(!this.displayValue || parseFloat(this.displayValue) == 0) return;
		if(this.displayValue.indexOf('-') < 0){
			//is positive
			this.displayValue = "-" + this.displayValue;
		}else{
			this.displayValue = this.displayValue.slice(1);
		}
		view.update();
	},

	handleOperation: function(op){
		//no stored value
		if(!this.storedValue){
			if(!this.displayValue){
				this.currentOperation = op;
				this.storedValue = "0";
				this.displayValue = "";
				view.showStoredValue();
				return;
			}else{
				this.currentOperation = op;
				this.storedValue = this.displayValue;
				this.displayValue = "";
				view.showStoredValue();
				return;
			}
		}else{
			//stored value exists
			if(!this.displayValue){
				//no new display value
				this.currentOperation = op;
				view.showStoredValue();
				return;
			}else{
				//stored and display values are entered
				this.currentOperation = op;
				this.handleCalculate();

				//restore op
				this.currentOperation = op;
				view.showStoredValue();
				return;
			}
		}
	},

	handleCalculate: function(){
		if(!this.currentOperation) return;
		var currentNum, displayNum;
		
		if(this.storedValue === ""){
			currentNum = 0;
		}else{
			currentNum = parseFloat(this.storedValue);
		}

		if(this.displayValue === ""){
			displayNum = 0;
		}else{
			displayNum = parseFloat(this.displayValue);
		}
		
		switch(this.currentOperation){
			case this.operations.ADD :
			this.storedValue = (currentNum + displayNum).toString();
			break;
			case this.operations.SUBTRACT :
			this.storedValue = (currentNum - displayNum).toString();
			break;
			case this.operations.MULTIPLY :
			this.storedValue = (currentNum * displayNum).toString();
			break;
			case this.operations.DIVIDE :
			this.storedValue = (currentNum / displayNum).toString();
			break;
			default :
			//do nothing
			break;
		}
		this.displayValue = "";
		this.currentOperation = null;
		view.showStoredValue();
	},

	handleClear: function(){
		this.storedValue = "";
		this.displayValue = "";
		view.update();
	},

	init: function(){
		view.init();
	}
};

calculator.init();