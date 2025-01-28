import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DpiService } from '../dpi.service';
import {DataService} from '../data.service'; // Import DPI service

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
  dpis: any = [];
  selectedDpi: any = null;
  showModal: boolean = false;
  nssInput: string = ''; // Bind to the input field for NSS

  id: string = '1';

  constructor(private router: Router, private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getData('dpi/').subscribe({
      next: (data) => {
        this.dpis = data; // Store the user's profile data
        console.log(this.dpis);
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        // Handle error (e.g., show an error message)
      }
    });
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
    this.dataService.searchByNSS(this.nssInput).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.selectedDpi = data[0];
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

  GoToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
}
