import { Component } from '@angular/core';
import { DiagnosticBoxComponent } from '../diagnostic-box/diagnostic-box.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnostic-list',
  imports: [DiagnosticBoxComponent],
  templateUrl: './diagnostic-list.component.html',
  styleUrl: './diagnostic-list.component.css'
})

  
  export class DiagnosticListComponent  {
    diagnostics : { date: string, link: string , id : number }[] = [];

    dpiId!: string;
    dpiData: any;

    user = {
      name: '',
      surname: '',
      email: '',
      nss: '',
      creationDate: ''
      

   
  };

   


    

    ngOnInit(): void {
      this.dpiId = this.route.snapshot.paramMap.get('id')!;
      this.fetchDpiDetails();
      
    }

    fetchDpiDetails(): void {
      this.dataservice.getData(`dpi/${this.dpiId}/`).subscribe({
        next: (dpiData) => {
          console.log(dpiData); // Handle the response
          console.log(dpiData?.user?.first_name);
          this.user.name = dpiData?.user?.first_name;
          this.user.surname = dpiData?.user?.last_name;
          this.user.email = dpiData?.user?.email;
          this.user.nss = dpiData?.nss; 
        },
        error: (err) => {
          alert("user does not exist ")
          console.error('Error fetching data:', err);
        }
      });
      
    }

    constructor(private route: ActivatedRoute , private dataservice : DataService) { 

      
      this.diagnostics = [
        { date: '2025-01-01', link: '/document/1' , id : 1 },
        { date: '2025-01-02', link: '/document/2' , id : 2 },
        { date: '2025-01-03', link: '/document/3' , id : 3 },
      ];
    }

    
  

}
