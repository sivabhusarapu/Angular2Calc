(function() {
// Define option defaults 
    this.Calculator = function (){
        var defaults = {
            firstNumber :"",
            secondNumber : "",
            operator : "",
            valueChanged : false,
            errorText : "Invalid Operation"
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
          this.options = extendDefaults(defaults, arguments[0]);
        }
    }

    /*
        * Utility method to extend defaults with user option
        @source: default options object
        @properties: user options object
        * returns single object
    */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
          if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
          }
        }
        return source;
    }

    /*
        * method to get input element value
        * returns input element value
    */    
    Calculator.prototype.getValue = function(){
        if(this.options.inputElement.length > 0)
            return this.options.inputElement.get(0).value;
        else
        return this.options.inputElement.value;
    }

     /*
        * method to set input element value
        @newValue: user input value
    */ 
    Calculator.prototype.setValue = function(newValue){
        this.options.inputElement.length > 0 ? this.options.inputElement.get(0).value = newValue : this.options.inputElement.value = newValue;
    }

    /*
        * method to set first number, second number and operator
        @newOperator: clicked operator value
    */ 
    Calculator.prototype.splitOperatorAndNumbers = function(newOperator){
            if (this.options.valueChanged){
                if (this.options.firstNumber == "" || this.options.firstNumber == "-"){
                    this.options.firstNumber = this.getValue();
                }
                else {
                    this.options.secondNumber = this.options.secondNumber + this.getValue();
                    this.options.firstNumber = this.fnCalculate(newOperator);
                    this.setValue(this.options.firstNumber);
                    this.options.secondNumber = "";
                }
            }
            if (!this.options.operator){
                this.options.operator = newOperator;
            }else {
                this.options.operator = this.pickIdentifier(newOperator);
            }
        }

     /*
        * method to reset first number, second number and operator
    */ 
    Calculator.prototype.resetCalculator = function(){
        this.options.operator = "";
        this.options.firstNumber = "";
        this.options.secondNumber = "";
        this.options.valueChanged = false;
    }

     /*
        * method to set operator value if user clicks multiple operators continously
        @newOperator: clicked operator value
    */ 
    Calculator.prototype.pickIdentifier = function(newOperator){
        switch (this.options.operator){
            case "+":
                    this.options.operator = newOperator;
                    break;
            case "-":
                    if (newOperator === "+"){
                        this.options.operator = "-";
                    }
                    else if (newOperator === "-"){
                        this.options.operator = "+";
                    }
                    else {
                        //ERROR
                        this.setValue(this.options.errorText);
                        this.resetCalculator();
                    }
                    break;
            case "*":
            case 'power':
                    if (newOperator === "+"){
                        this.options.operator = this.options.operator;
                    }
                    else if (newOperator === "-"){
                        this.options.operator = this.options.operator;
                        this.options.secondNumber = "-";
                        this.setValue("-");
                    }   else if (newOperator === "*"){
                        this.options.operator = 'power';
                    }
                    else {
                        //ERROR
                        this.setValue(this.options.errorText);
                        this.resetCalculator();
                    }
                    break;
            case "/":
            case "%":
                    if (newOperator === "+"){
                        this.options.operator = this.options.operator;
                    }
                    else if (newOperator === "-"){
                        this.options.operator = this.options.operator;
                        this.options.secondNumber = "-";
                        this.setValue("-");
                    }
                    else {
                        //ERROR
                        this.setValue(this.options.errorText);
                        this.resetCalculator();
                    }
                    break;
              
            default:
                    this.options.operator = this.options.operator;
                    break;
        }
        return this.options.operator;
    }

     /*
        * method to calculate the entered operation value
        @calledBy: clicked operator value
        * returns result of operation
    */ 
    Calculator.prototype.fnCalculate = function(calledBy){
        var result = "";
        this.options.firstNumber = parseFloat(this.options.firstNumber);
        this.options.secondNumber = parseFloat(this.options.secondNumber);
        if(!this.options.firstNumber || !this.options.secondNumber || !this.options.operator){
            //ERROR
            this.resetCalculator();
            this.setValue(this.options.errorText);
            return this.options.errorText;
        }
        switch(this.options.operator){
            case '+': 
                result = this.options.firstNumber + this.options.secondNumber;
                break;
            case '-': 
                result = this.options.firstNumber - this.options.secondNumber;
                break;
            case '*':
                result = this.options.firstNumber * this.options.secondNumber;
                break;
            case '/':
                result = this.options.firstNumber / this.options.secondNumber;
                break;
            case 'power':
                result = Math.pow(this.options.firstNumber, this.options.secondNumber);
                break;
            case '%':
                result = this.options.firstNumber % this.options.secondNumber;
                break;
            default:
                result = "";
                break;
        }
        this.options.firstNumber = result;
        this.options.secondNumber = "";
        this.options.operator = "";
        return result;
    }

     /*
        * method to set input value when user clicks number button
        @text: clicked number value
    */ 
    Calculator.prototype.numberClickEvent = function (text){
        if (this.options.firstNumber === "-"){
            this.setValue(this.options.firstNumber+ text);
        }
        else if (this.getValue() === "0" || this.options.valueChanged === false){
            this.setValue(text);
        }else{
            this.setValue(this.getValue()+ text);
        }
        this.options.valueChanged = true;
    }

    /*
        * method to set operator value when user clicks operator button
        @text: clicked operator value
    */ 
    Calculator.prototype.operatorClickEvent = function (text){
        if (text === "="){
            if(this.options.valueChanged)
                this.options.secondNumber = this.options.secondNumber + this.getValue();
            this.setValue(this.fnCalculate('='));
        } else {
            if (this.options.valueChanged === false && !this.options.firstNumber && text === "-"){
                this.options.firstNumber = "-";
                this.setValue("-");
                return false;
            }
            this.splitOperatorAndNumbers(text);
        }
        this.options.valueChanged = false;
    }

    /*
        * method to reset calci
    */ 
    Calculator.prototype.allClearClickEvent = function(){
        this.setValue("");
        this.resetCalculator();
    }

    /*
        * method to perform negation operation
    */ 
    Calculator.prototype.negationClickEvent = function(){
        var number = parseFloat(this.getValue());
        if (number == this.options.firstNumber){
            this.options.firstNumber = parseFloat(this.options.firstNumber) * -1;
        }
        return this.setValue(number * -1);
    }

    /*
        * method to remove last enatered input value
    */
    Calculator.prototype.clearClickEvent = function(){
        var number = this.getValue();
        if (number == this.options.firstNumber){
            this.options.firstNumber = this.options.firstNumber.toString().slice(0, -1);
        }
        return this.setValue(this.getValue().slice(0, -1));
    }

}());