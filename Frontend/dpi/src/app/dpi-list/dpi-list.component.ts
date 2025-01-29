import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DpiService } from '../dpi.service'; // Import DPI service
import { DataService } from '../data.service';

interface Patient {
  NSS: string;
  nom: string;
  prenom: string;
}

interface user {
first_name : string;
last_name : string;
email : string;
nss : string; 
creationDate : string;

}

interface DPI {
  id_dpi: string;
  nss : string;
  date_creation: string;
  commentaire_administratif: string;
  chemin_QR_code: string;
  user?: user;
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


  user = {
    name: '',
    surname: '',
    email: '',
    nss: '',
    creationDate: '',
  };

  showSearchOptions: boolean = false;
  dpis: any = [];
  selectedDpi: any = null;
  showModal: boolean = false;
  nssInput: string = ''; // Bind to the input field for NSS

  id: string = '1';

  constructor(private router: Router, private http: HttpClient, private dpiService: DpiService , private dataservice : DataService) { }

  ngOnInit(): void {
    this.fetchDpis();
    

  }


  toggleSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  searchByNSS(nss: string): void {
    const dpi = this.dpis.find((dpi) => dpi.user?.nss === nss);
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


      
      this.dataservice.getData(`dpi/`).subscribe({
        next: (data) => {
          this.dpis = data;
          console.log(data);
        },
        error: (err) => {
          alert("user does not exist ")
          console.error('Error fetching data:', err);
        }
      });
      
    


  }

  


  GoToDashBoard() {
    this.router.navigate(['/']);
  }
}
