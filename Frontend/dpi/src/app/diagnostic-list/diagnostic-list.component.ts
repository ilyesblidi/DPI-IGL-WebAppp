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
     diagnostics: Array<{
      id_diagnostic: number;
      diagnostic: string;
      date_creation: string;
      dpi: number;
    }> = [];
    dpiId!: string;
    dpiData: any;

    user = {
      name: '',
      surname: '',
      email: '',
      nss: '',
      creationDate: ''
      

   
    };

    payload = { "diagnostic": "init",dpi: 0 , id_dpi : 0};
    payload2 = { id_dpi : 0};


   


    

    ngOnInit(): void {
      this.dpiId = this.route.snapshot.paramMap.get('id')!;
      this.fetchDpiDetails();
      this.fetchDiagList();
      
    }

    newDiag() : void {
      this.payload.dpi = Number(this.dpiId);
      this.payload.id_dpi = Number(this.dpiId);

      this.dataservice.addData('create_diagnostic/', this.payload).subscribe({

        next: (response: any) => {
          alert('diag created successfully');
          this.fetchDpiDetails();
        },
        error: (error: any) => {
          console.error(error);
          alert('Failed to create diagnostic');
        }
      });
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

    fetchDiagList(): void {
      this.payload2.id_dpi = Number(this.dpiId);
      this.dataservice.addData(`diagnostics/` , this.payload2).subscribe({
        next: (diagList) => {
          console.log(diagList); // Handle the response
          this.diagnostics = diagList;
        },
        error: (err) => {
          alert("user does not exist ")
          console.error('Error fetching data:', err);
        }
      });
      
    }

    constructor(private route: ActivatedRoute , private dataservice : DataService) { 

      
      this.diagnostics = [
        
      ];
      }

    
  

  }
