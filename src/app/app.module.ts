import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { InputComponent } from './input/input.component';
import { NumberButtonComponent } from './number-button/number-button.component';
import { OperatorButtonComponent } from './operator-button/operator-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    InputComponent,
    NumberButtonComponent,
    OperatorButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
