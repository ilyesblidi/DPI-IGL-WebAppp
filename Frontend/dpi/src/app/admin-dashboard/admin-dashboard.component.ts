import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None, // Ensures styles apply globally
})
export class AdminDashboardComponent implements OnInit {
  // Variable to hold logged-in user's data (medecin)
  medecin: any = null; // Initialize as empty object
  userId: any = null;

  constructor(private router: Router, private route : ActivatedRoute, private dataService : DataService)
  {}// Inject DataService for API calls

  ngOnInit(): void {
    // Capture the userId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log(params.get('id'));

      if (this.userId) {
        // Fetch the user's profile data using the userId
        this.dataService.getData(`users/${this.userId}/`).subscribe({
          next: (data) => {

            this.medecin = data; // Store the user's profile data
            console.log('Fetched medecin data:', this.medecin);
            alert('Logged in successfely');
          },
          error: (error) => {
            console.error('Error fetching profile:', error);
            alert('Failed');
            // Handle error (e.g., show an error message)
          }
        });
      }
    });
  }

  // Navbar click methods
  showNotifications() {
    alert('Notifications clicked!');
  }

  viewNews() {
    alert('Opening news section...');
  }

  openSettings() {
    alert('Opening settings...');
  }

  // Card click methods
  openConsultation(consultationId: number) {
    alert(`Opening consultation with ID: ${consultationId}`);
  }

  openResource(resourceId: number) {
    alert(`Opening resource with ID: ${resourceId}`);
  }

  GoToListDPI() {
    this.router.navigate(['/dpi-list']);
  }

  GoToAdminProfil() {
    this.router.navigate(['/profil']);
  }

  // Action methods
  viewDpi(dpiId: number): void {
    console.log(`Viewing DPI with ID: ${dpiId}`);
  }

  createDpi(): void {
    console.log('Creating a new DPI');
  }

  searchPatient(): void {
    console.log('Searching for a patient');
  }

  writePrescription(): void {
    console.log('Writing a prescription');
  }

  requestLabTest(): void {
    console.log('Requesting a lab test');
  }

  markAsRead(notificationId: number): void {
    console.log(`Marking notification ${notificationId} as read`);
  }
}
