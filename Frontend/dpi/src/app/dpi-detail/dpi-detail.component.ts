import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DpiService } from '../dpi.service';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dpi-detail',
  templateUrl: './dpi-detail.component.html',
  styleUrls: ['./dpi-detail.component.css'],
  imports: [CommonModule]
  
})
export class DpiDetailComponent implements OnInit {
  dpiId!: string;
  dpiData: any;
  //  
  user = {
    name: '',
    surname: '',
    email: '',
    nss: '',
    creationDate: ''
  };
  
  
  
  constructor(private router: Router, private route:ActivatedRoute, private dpiService: DpiService , private dataservice : DataService , private cdr : ChangeDetectorRef) {
    
  }

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

  

  GoToDiagnostics() {
    this.router.navigate([`/dpi-detail/${this.dpiId}/diagnostic-list`]);
  }

  GoToSoins() {
    alert('Go to Soins');
  }

  GoToHospitalisations() {
    alert('Go to Hospitalisations');
  }

  GoToCertificats() {
    alert('Go to Certificats');
  }
}
