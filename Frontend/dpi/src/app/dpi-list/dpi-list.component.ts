import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DpiService } from '../dpi.service';
import {DataService} from '../data.service'; // Import DPI service

// interface Patient {
//   NSS: string;
//   nom: string;
//   prenom: string;
// }
//
// interface DPI {
//   id_dpi: string;
//   date_creation: string;
//   commentaire_administratif: string;
//   chemin_QR_code: string;
//   patient?: Patient;
// }

@Component({
  selector: 'app-dpi-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dpi-list.component.html',
  styleUrls: ['./dpi-list.component.css']
})

export class DpiListComponent implements OnInit {

  searchBarVisible = false;

  showSearchOptions: boolean = false;
  dpis: any = [];
  selectedDpi: any = null;
  showModal: boolean = false;
  nssInput: string = ''; // Bind to the input field for NSS

  id: string = '1';

  constructor(private router: Router, private dataService : DataService) { }

  ngOnInit(): void {
    this.fetchDpis();
    this.addExampleDpi();
  }

  fetchDpis(): void {
    this.dataService.getData('dpi/').subscribe({
      next: (data) => {
        this.dpis = data; // Store the DPI data
        console.log(this.dpis);
        alert('FETCHED SUCCESSFULLY');
      },
      error: (error) => {
        console.error('Error fetching DPIs:', error);
        // Handle error (e.g., show an error message)
      }
    });
  }

  addExampleDpi(): void {
    const exampleDpi = {
      first_name: 'patient',
      last_name: 'patient',
      email: 'ilyes@gmail.com',
      password: 'bndbndbnd',
      password2: 'bndbndbnd',
      phone: 'bnd',
      adresse: 'bnd',
      role: 'patient',
      dpi_input: {
        nss: '123456789',
        mutuelle: 'HealthCare',
        contact_info: 'contact@example.com',
        medecin_traitant_email: 'medecin@gmail.com'
      }
    };
    this.dpis.push(exampleDpi);
    this.dataService.addData('dpi/add/', exampleDpi);
    // this.dataService.addData('dpi/add/', exampleDpi).subscribe({
    //
    //   next: (response: any) => {
    //     alert('DPI created successfully');
    //     this.router.navigate(['/']);
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //     alert('Failed to create DPI');
    //   }
    // });
  }


  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
    const inputField = document.querySelector('.search-input') as HTMLElement;
    if (this.searchBarVisible) {
      inputField.classList.add('visible');
    } else {
      inputField.classList.remove('visible');
    }
  }

  // searchByNSS(nss: string): void {
  //   const dpi = this.dpis.find((dpi) => dpi.patient?.NSS === nss);
  //   if (dpi) {
  //     this.selectedDpi = dpi;
  //     this.showModal = true; // Show the modal
  //   } else {
  //     alert('No DPI found with this NSS');
  //   }
  // }
  searchByNSS(): void {
    this.dataService.getData(`dpi/search/?ns=${this.nssInput}`).subscribe({
      next: (data) => {
        if (data) {
          this.selectedDpi = data;
          this.showModal = true; // Show the modal
        } else {
          alert('No DPI found with this NSS');
        }
      },
      error: (error) => {
        console.error('Error searching DPI by NSS:', error);
        // Handle error (e.g., show an error message)
      }
    });
  }

  validateNSS(event: any): void {
    // Ensure the input contains only digits and is limited to 9 characters
    const regex = /^[0-9]{0,9}$/; // Only allows numbers up to 9 digits
    if (!regex.test(event.target.value)) {
      event.target.value = event.target.value.slice(0, -1); // Remove invalid character
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDpi = null;
  }

  searchByQRCode(): void {
    alert('Search by QR Code triggered.');
    this.showSearchOptions = false;
  }

  viewDpiDetails(dpiId: string): void {
    // const dpi = this.dpis.find((dpi) => dpi.id_dpi === dpiId);
    // if (dpi) {
    //   this.selectedDpi = dpi;
    //   this.showModal = true; // Show the modal
    // } else {
    //   alert('No DPI found with this NSS');
    // }

      this.router.navigate(['/dpi-detail', dpiId]);
  }

  createNewDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  // Fetch DPIs from MockAPI
  // fetchDpis(): void {
  //   const apiUrl = 'https://676bfd0dbc36a202bb865e74.mockapi.io/api/dpi-list/DPI'; // Replace with your API URL
  //   this.http.get<DPI[]>(apiUrl).subscribe({
  //     next: (data) => {
  //       this.dpis = data;
  //       //console.log('Fetched DPIs:', this.dpis);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching DPIs:', err);
  //     }
  //   });
  // }

  GoToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
}
