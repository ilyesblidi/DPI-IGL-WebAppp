import { Component } from '@angular/core';
import { DiagnosticBoxComponent } from '../diagnostic-box/diagnostic-box.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnostic-list',
  imports: [DiagnosticBoxComponent],
  templateUrl: './diagnostic-list.component.html',
  styleUrl: './diagnostic-list.component.css'
})
export class DiagnosticListComponent {


    diagnostics : { date: string, link: string , id : number }[] = [];
    user : { nom: string , prenom: string , datedenaissance : string , age : string } ; 

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        console.log(id); // Use the id as needed
      });
    }

    constructor(private route: ActivatedRoute) { 
      this.diagnostics = [
        { date: '2025-01-01', link: '/document/1' , id : 1 },
        { date: '2025-01-02', link: '/document/2' , id : 2 },
        { date: '2025-01-03', link: '/document/3' , id : 3 },
      ];
      this.user = { nom: "chakib", prenom: "chakib", datedenaissance: "2000-01-01", age: "21" };
    }

    
  

}
