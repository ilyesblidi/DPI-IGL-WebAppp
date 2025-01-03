import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DpiService } from '../dpi.service';
import {FormsModule} from '@angular/forms'; // Import the DPI service
//import { DPI, Patient } from '../dpi.models'; // Import DPI and Patient models

interface Patient {
  NSS: string;
  nom: string;
  prenom: string;
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
    //email: '',
    //mot_de_passe: '',
    //date_creation: new Date().toISOString(),
    //derniere_connexion: new Date().toISOString(),
    //telephone: '',
    //date_naissance: '',
    //adresse: '',
    //mutuelle: '',
    //personne_contact_nom: '',
    //personne_contact_telephone: ''
  };

  commentaire_administratif: string = '';
  chemin_QR_code: string = '/assets/qrcodes/default.png';
  dpis: DPI[] = [];

  constructor(private router: Router, private dpiService: DpiService) {}

  onSubmit(): void {
    const newDpi: DPI = {
      id_dpi: '0', // API will handle the ID
      date_creation: new Date().toISOString(),
      commentaire_administratif: this.commentaire_administratif,
      chemin_QR_code: this.chemin_QR_code,
      patient: this.patient
    };

    // Call service to save DPI
    this.dpiService.addDpi(newDpi).subscribe((dpi) => {
      // After saving, navigate to the DPI list page
      this.router.navigate(['/dpi-list']);
    });
  }
}
