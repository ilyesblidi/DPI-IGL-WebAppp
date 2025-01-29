import { Component  , Input, OnInit} from '@angular/core';
import { ConsulationBoxComponent } from '../consulation-box/consulation-box.component';
import { Data, Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnostic-view',
  imports: [ConsulationBoxComponent  ],
  templateUrl: './diagnostic-view.component.html',
  styleUrl: './diagnostic-view.component.css'
})
export class DiagnosticViewComponent implements OnInit {
  @Input() diagnosticID!: string;

  diagId!: string;
  dpiId!: string;
  //consultations : { date: string, link: string , id : number }[] = [];
  consultations: Array<{
    id_consultation: number;
    resume: string | null;
    examens_consultations: any[]; // Replace `any` with a specific type if needed
    date_consultation: string;
    diagnostic: number;
    medecin: number;
  }> = [];

  user = {
    name: '',
    surname: '',
    email: '',
    nss: '',
    creationDate: '',
    
    

 
  };
  
  constructor(private dataservice : DataService , private route: ActivatedRoute , private router: Router) { 
    



  }

  payload = { "diagnostic": "init" , dpi: 0 , id_dpi : 0};
  payload2 = { diagnostic : 0};

  // set up the on init to retrieve the needed data 

  ngOnInit() {

    this.dpiId = this.route.snapshot.paramMap.get('id')!;
    this.diagId = this.route.snapshot.paramMap.get('idDiag')!;
    this.fetchDpiDetails();
    this.fetchconsultationList();
  }

  nouvelleConsultation() {
    //this.router.navigate([`dpi-detail/${this.dpiId}/diagnostic-list/${this.diagId}/nouvelleconsultation`]);
    this.payload2.diagnostic = Number(this.diagId);
    this.dataservice.addData(`create_consultation/` , this.payload2).subscribe({
      next: (consultList) => {
        //this.list = consultList;
        
      },
      error: (err) => {
        alert("No consultations found") ;
        console.error('Error fetching data:', err);
      }
    });
  }


  // getting the consultations list 
  fetchconsultationList(): void {
    this.payload2.diagnostic = Number(this.diagId);
    this.dataservice.addData(`consultations/` , this.payload2).subscribe({
      next: (consultList) => {
        console.log(consultList); // Handle the response
        this.consultations = consultList;
        
        //this.list = consultList;
      },
      error: (err) => {
        alert("No consultations found") ;
        console.error('Error fetching data:', err);
      }
    });
    
    // get the data form the server with ID by that i mean the dates and id's fo the consultation

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


  
  

   
}
