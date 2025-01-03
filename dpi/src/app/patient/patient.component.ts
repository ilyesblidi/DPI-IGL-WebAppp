import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  view: string = 'actions';

  bilansBiologique = Array<{title: string, details: string}>();
  bilansRadio = Array<{title: string, details: string}>();
  soins = Array<{title: string, details: string}>();
  consultations = Array<{title: string, details: string}>();
  diagnostiques = Array<{title: string, details: string}>();
  patient: any = null;
  id: string = '';

  
  stat = {
    consultations: this.consultations.length,
    diagnostiques: this.diagnostiques.length,
    bilansBiologique: this.bilansBiologique.length,
    bilansRadio: this.bilansRadio.length,
    soins: this.soins.length
  };
  constructor(private router: Router, private http: HttpClient, private route : ActivatedRoute, private dataService : DataService) {}



  ngOnInit(): void {
    // Access the 'id' from the route parameters
    this.route.params.subscribe(params => {
      this.id = params['id'];  // Retrieve the 'id' from the route
      console.log('Patient ID:', this.id);  // You can now use the 'id' in your component
    });

    this.fetchPatientById(this.id);
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
  showDetails(section: string) {
    this.view = section;
  }

  showActions() {
    this.view = 'actions';
  }
  viewDetails(item: any) {
    alert(item.details);
  }

  //Mock API call to fetch a single patient by ID
  fetchPatientById(id: string) {
    this.dataService.getData(`users/${id}`).subscribe({
      next: (response: any) => {
        this.patient = response;
      },
      error: (error: any) => {
        console.error(error);
        alert('Error fetching patient data');
      }
    });
  }
  
}
