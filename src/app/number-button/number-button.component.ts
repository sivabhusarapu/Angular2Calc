import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-button',
  templateUrl: './number-button.component.html',
  styleUrls: ['./number-button.component.css']
})
export class NumberButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   @Input() numberData;
   @Output() buttonClickEvent = new EventEmitter();

   //triggering parent component number click function
   onNumberButtonClick(){
      this.buttonClickEvent.emit(this.numberData.value);
   }

}
