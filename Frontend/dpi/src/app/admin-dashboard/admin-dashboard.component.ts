import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    NgForOf
  ],
  encapsulation: ViewEncapsulation.None // Ensures styles apply globally
})

export class AdminDashboardComponent implements OnInit {

  doctorName = 'John Doe';
  doctorSpecialty = 'Cardiologist';
  doctorEmail = 'john.doe@example.com';

  appointments = [
    { patientName: 'John Smith', time: '10:00 AM', dpiId: 1 },
    { patientName: 'Alice Johnson', time: '11:30 AM', dpiId: 2 }
  ];

  recentConsultations = [
    { patientName: 'Emily Brown', date: '2024-12-25', dpiId: 3 },
    { patientName: 'Michael White', date: '2024-12-24', dpiId: 4 }
  ];

  resources = [
    { name: 'Clinical Guidelines', link: 'https://example.com/guidelines' },
    { name: 'Hospital Policies', link: 'https://example.com/policies' }
  ];

  constructor( private router : Router) {}

  ngOnInit(): void {}

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
