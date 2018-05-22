import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
 @ViewChild('input') input;

  constructor() { }

  ngOnInit() {
  }
  
}
