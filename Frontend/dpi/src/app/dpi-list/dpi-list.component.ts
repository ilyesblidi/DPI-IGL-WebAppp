import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DpiService } from '../dpi.service'; // Import DPI service

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
  selector: 'app-dpi-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dpi-list.component.html',
  styleUrls: ['./dpi-list.component.css']
})

export class DpiListComponent implements OnInit {

  searchBarVisible = false;

  showSearchOptions: boolean = false;
  dpis: DPI[] = [];
  selectedDpi: DPI | null = null;
  showModal: boolean = false;
  nssInput: string = ''; // Bind to the input field for NSS

  id: string = '1';

  constructor(private router: Router, private http: HttpClient, private dpiService: DpiService) { }

  ngOnInit(): void {
    this.fetchDpis();
    this.dpiService.getDpis().subscribe((data) => {
      this.dpis = data;
    });
    //this.fetchPatientById(this.id);
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

  searchByNSS(nss: string): void {
    const dpi = this.dpis.find((dpi) => dpi.patient?.NSS === nss);
    if (dpi) {
      this.selectedDpi = dpi;
      this.showModal = true; // Show the modal
    } else {
      alert('No DPI found with this NSS');
    }
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
  fetchDpis(): void {
    const apiUrl = 'https://676bfd0dbc36a202bb865e74.mockapi.io/api/dpi-list/DPI'; // Replace with your API URL
    this.http.get<DPI[]>(apiUrl).subscribe({
      next: (data) => {
        this.dpis = data;
        //console.log('Fetched DPIs:', this.dpis);
      },
      error: (err) => {
        console.error('Error fetching DPIs:', err);
      }
    });
  }

  GoToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
}
