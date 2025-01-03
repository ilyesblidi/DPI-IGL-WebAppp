import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consulation-box',
  imports: [],
  templateUrl: './consulation-box.component.html',
  styleUrl: './consulation-box.component.css'
})
export class ConsulationBoxComponent {
@Input() date!: string; // the date to display 
@Input() ID!: string; // id de la consultation 


  constructor() { 
     // default date
  }


  openConsulation() { // route to the consultation page 
    alert("Consultation ouverte");
  }

}
