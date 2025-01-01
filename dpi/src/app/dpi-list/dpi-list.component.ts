import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {FormsModule} from '@angular/forms'; // Import the new data service
//import { DPI } from './dpi-list.component'; // Define the DPI type

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
  id: string = '1'; // Example DPI id, can be dynamic

  token: string | null = null; // Will store the token after login

  email: string = 'medecin@gmail.com'; // Example email (could be from a form)
  password: string = 'bndbndbnd'; // Example password (could be from a form)

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.loginAndFetchData();
  }

  // Login and fetch DPIs after successful login
  loginAndFetchData(): void {
    this.dataService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Store the token in localStorage for future requests
        this.token = response.token; // Assuming 'response.token' is the token returned
        if (typeof this.token === "string") {
          localStorage.setItem('authToken', this.token);
        } // Store the token in localStorage
        this.fetchDpis(); // Fetch DPIs after login
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  // Toggle search bar visibility
  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
    const inputField = document.querySelector('.search-input') as HTMLElement;
    if (this.searchBarVisible) {
      inputField.classList.add('visible');
    } else {
      inputField.classList.remove('visible');
    }
  }

  // Search by NSS
  searchByNSS(nss: string): void {
    const dpi = this.dpis.find((dpi) => dpi.patient?.NSS === nss);
    if (dpi) {
      this.selectedDpi = dpi;
      this.showModal = true; // Show the modal
    } else {
      alert('No DPI found with this NSS');
    }
  }

  // Fetch all DPIs
  fetchDpis(): void {
    if (this.token) {
      this.dataService.getDpis(this.token).subscribe({
        next: (data) => {
          this.dpis = data;
          console.log('Fetched DPIs:', this.dpis);
        },
        error: (err) => {
          console.error('Error fetching DPIs:', err);
        }
      });
    } else {
      console.error('No authentication token found');
    }
  }

// Fetch a specific DPI by id
  viewDpiDetails(dpiId: string): void {
    if (this.token) {
      this.dataService.getDpiById(dpiId, this.token).subscribe({
        next: (data) => {
          this.selectedDpi = data;
          this.showModal = true; // Show the modal
        },
        error: (err) => {
          alert('Error fetching DPI details');
          console.error('Error:', err);
        }
      });
    } else {
      console.error('No authentication token found');
    }
  }

  // Close modal
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

  // Navigate to create new DPI form
  createNewDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  // Go to dashboard
  GoToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
}
