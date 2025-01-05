import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-diagnostic-box',
  imports: [],
  templateUrl: './diagnostic-box.component.html',
  styleUrl: './diagnostic-box.component.css'
})
export class DiagnosticBoxComponent {


  // we are going to diplay them using their ID or maybe their creation date i still am not sure but for now let's just use the id 
  @Input() ID!: string;

  constructor(){
    // retreve the list of the existing diagnostic files 
    

  }

  openDiagnostic(){

    alert("routing to the chosen disgnostic file ")

    //app route and feed the data basically 

  }

}
