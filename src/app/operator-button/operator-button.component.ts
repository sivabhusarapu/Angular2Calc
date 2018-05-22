import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-operator-button',
  templateUrl: './operator-button.component.html',
  styleUrls: ['./operator-button.component.css']
})
export class OperatorButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   @Input() numberData;
   @Output() buttonClickEvent = new EventEmitter();

   //triggering parent component opeartor click function
   onOperatorClick(){
      this.buttonClickEvent.emit(this.numberData.value);
   }
}