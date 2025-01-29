import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {
  admin: any = null;
  userId: any = null;
  //   name: 'John Doe',
  //   email: 'admin@example.com',
  //   phone: '+1 234 567 890',
  //   role: 'Administrator',
  //   joinedDate: 'January 15, 2022',
  //   avatar: 'https://via.placeholder.com/150'
  // };

  constructor(private router: Router, private http: HttpClient, private route : ActivatedRoute, private dataService : DataService) {}

  ngOnInit(): void {
    // Capture the userId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');

      if (this.userId) {
        // Fetch the user's profile data using the userId
        this.dataService.getData(`users/${this.userId}/`).subscribe({
          next: (data) => {
            this.admin = data; // Store the user's profile data
          },
          error: (error) => {
            console.error('Error fetching profile:', error);
            // Handle error (e.g., show an error message)
          }
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // this.admin.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  editProfile(): void {
    alert('Edit profile functionality coming soon!');
  }
  createDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  // fetchPatientById(id: string) {
  //   this.dataService.getData(`users/${id}/`).subscribe({
  //     next: (response: any) => {
  //       this.admin = response;
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //       alert('Error fetching patient data');
  //     }
  //   });
  // }
  addUser() {
    this.router.navigate(['/add-user']);
  }
}
