import { Component  , Input, OnInit} from '@angular/core';
import { ConsulationBoxComponent } from '../consulation-box/consulation-box.component';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-diagnostic-view',
  imports: [ConsulationBoxComponent , RouterLink , RouterOutlet],
  templateUrl: './diagnostic-view.component.html',
  styleUrl: './diagnostic-view.component.css'
})
export class DiagnosticViewComponent implements OnInit {
  @Input() diagnosticID!: string;
  consultations : { date: string, link: string , id : number }[] = [];
  user : { nom: string , prenom: string , datedenaissance : string , age : string } ; 
  
  constructor() { 
    this.diagnosticID = '213'; // just so taht the Id is not empty
    this.consultations = [
      { date: '2025-01-01', link: '/document/1' , id : 1 },
      { date: '2025-01-02', link: '/document/2' , id : 2 },
      { date: '2025-01-03', link: '/document/3' , id : 3 },
    ];
    this.user = { nom: "chakib", prenom: "chakib", datedenaissance: "2000-01-01", age: "21" };


  }

  ngOnInit() {
    // get the data form the server with ID by that i mean the dates and id's fo the consultation 
  }

    nouvelleConsultation() {
      // Logic to navigate to another component
      // Assuming you are using Angular Router
      // Inject Router in the constructor
    }

}
