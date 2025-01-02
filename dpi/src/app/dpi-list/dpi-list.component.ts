import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

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
  dpis: DPI[] = [];
  selectedDpi: DPI | null = null;
  showModal: boolean = false;
  searchBarVisible: boolean = false;
  nssInput: string = ''; // For searching by NSS
  token: string | null = localStorage.getItem('authToken');

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchDpis();
  }

  toggleSearchBar(): void {
    this.searchBarVisible = !this.searchBarVisible;
  }

  SearchByQRCode(): void {
    alert('Search by QR Code triggered.');
    this.searchBarVisible = false;
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
      console.error('No authentication token found.');
    }
  }

  // Search by NSS
  searchByNSS(): void {
    const dpi = this.dpis.find((dpi) => dpi.patient?.NSS === this.nssInput);
    if (dpi) {
      this.selectedDpi = dpi;
      this.showModal = true;
    } else {
      alert('No DPI found with this NSS.');
    }
  }

  // View specific DPI details
  viewDpiDetails(dpiId: string): void {
    if (this.token) {
      this.dataService.getDpiById(dpiId, this.token).subscribe({
        next: (data) => {
          this.selectedDpi = data;
          this.showModal = true;
        },
        error: (err) => {
          alert('Error fetching DPI details.');
          console.error(err);
        }
      });
    } else {
      console.error('No authentication token found.');
    }
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
    this.selectedDpi = null;
  }

  validateNSS(event: any): void {
    // Ensure the input contains only digits and is limited to 9 characters
    const regex = /^[0-9]{0,9}$/; // Only allows numbers up to 9 digits
    if (!regex.test(event.target.value)) {
      event.target.value = event.target.value.slice(0, -1); // Remove invalid character
    }
  }

  createNewDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  // Navigate back to dashboard
  GoToDashBoard(): void {
    this.router.navigate(['/dashboard']);
  }
}
