import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DpiService } from '../dpi.service';
import {FormsModule} from '@angular/forms'; // Import the DPI service
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';

//import { DPI, Patient } from '../dpi.models'; // Import DPI and Patient models

interface Patient {
  NSS: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  password2: string;
  date_creation: string;
  derniere_connexion: string;
  telephone: string;
  date_naissance: string;
  adresse: string;
  mutuelle: string;
  personne_contact_nom: string;
  personne_contact_telephone: string;
  medecin_traitant_email: string;

}

interface DPI {
  id_dpi: string;
  date_creation: string;
  commentaire_administratif: string;
  chemin_QR_code: string;
  patient?: Patient;
}

@Component({
  selector: 'app-create-dpi',
  templateUrl: './create-dpi.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-dpi.component.css']
})
export class CreateDpiComponent {
  patient: Patient = {
    NSS: '',
    nom: '',
    prenom: '',
    email: '', 
    password:'',
    password2: '',
    date_creation: new Date().toISOString(),
    derniere_connexion: new Date().toISOString(),
    telephone: '',
    date_naissance: '',
    adresse: '',
    mutuelle: '',
    personne_contact_nom: '',
    personne_contact_telephone: '',
    medecin_traitant_email: '',
  };

  

  commentaire_administratif: string = '';
  chemin_QR_code: string = '/assets/qrcodes/default.png';
  dpis: DPI[] = [];

  constructor(private router: Router, private dpiService: DpiService, private dataService: DataService) {
  }

  onSubmit(): void {
    alert('Submitted');
    this.patient.password2 = this.patient.password;
    const newDpi: any = {
      first_name: this.patient.nom,
      last_name: this.patient.prenom,
      email: this.patient.email,
      password: this.patient.password,
      password2: this.patient.password,
      phone: this.patient.telephone,
      adresse: this.patient.adresse,
      role: 'patient',
      dpi_input: {
        nss: this.patient.NSS,
        mutuelle: this.patient.mutuelle,
        contact_info: this.patient.personne_contact_telephone, // Or another field for `contact_info`
        medecin_traitant_email: this.patient.medecin_traitant_email,
      }
    };

    const dpitest  = {
      first_name: "patient",
      last_name: "patient",
      email: "patient@gmail.com",
      password: "bndbndbnd",
      password2: "bndbndbnd",
      phone: "bnd",
      adresse: "bnd",
      role: "patient",
      dpi_input: {
        nss: "patient_nss",
        mutuelle: "HealthCare",
        contact_info: "contact@example.com",
        medecin_traitant_email: "admin2@gmail.com"
      }
    };

    const medecin = {
      first_name: "Mohamed",
      last_name: "Khalil",
      email: "admin2@gmail.com",
      password: "bndbndbnd",
      password2: "bndbndbnd",
      phone: "0779759059",
      adresse: "Ain Trig",
      role: "medecin",
    };

    console.log('Request payload:', JSON.stringify(newDpi));


    // Call service to save DPI
    this.dataService.addData('dpi/add/', newDpi).subscribe({

      next: (response: any) => {
        alert('DPI created successfully');
        this.router.navigate(['/profile']);
      },
      error: (error: any) => {
        console.error(error);
        alert('Failed to create DPI');
      }
    });

   
  
    
  }


}
