import { Component , OnInit, ViewChild} from '@angular/core';
import { InputComponent } from '../input/input.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit { 

	elementsDisplayArray: any=[];
	calc: any;

	@ViewChild(InputComponent) inputCmp:InputComponent;
	constructor(private http: HttpClient){}
	
	ngOnInit(){
		this.getElementsData();
		this.calc = new Calculator({ inputElement : this.inputCmp.input.nativeElement});
	}

	/*
	    * method to get calculator elements data
	*/
	getElementsData(){
		this.http.get('../assets/elementsData.json').subscribe(data => {
			this.elementsDisplayArray = data;
		}, err => {
			console.log('error occured');
		})
	}

	/*
	    * method to set input value when user clicks number button
	    @text: clicked number button value
	*/ 
	onNumberClick(text){
		this.calc.numberClickEvent(text);
	}

	/*
	    * method to set operator value when user clicks operator button
	    @text: clicked operator button value
	*/ 
	onOperatorClick(text){
		if(text === 'AC'){
			this.calc.allClearClickEvent();
		}else if(text === 'C'){
			this.calc.clearClickEvent();
		}else if(text === '+-'){
			this.calc.negationClickEvent();
		}else{
			this.calc.operatorClickEvent(text);
		}
	}

}
