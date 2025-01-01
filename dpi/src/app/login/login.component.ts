import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  imageSrc: string = 'assets/doctor.jpg';

  constructor(private router: Router, private dataService: DataService) {}

  onSubmit() {
    const payload = { username: this.username, password: this.password };

    // Get the token from localStorage after login
    const token = localStorage.getItem('authToken');

    if (token) {
      // Pass token as part of the request
      this.dataService.addData('login', payload, token).subscribe({
        next: (response: any) => {
          // Handle successful login
          const userType = response.user.role;
          const userId = response.user.id;

          // Navigate based on user role
          if (userType === 'admin') {
            this.router.navigate(['/dashboard', userId]);
          } else if (userType === 'patient') {
            this.router.navigate(['/patient', userId]);
          } else if (userType === 'medecin') {
            this.router.navigate(['/medecin', userId]);
          } else if (userType === 'infirmier') {
            this.router.navigate(['/infirmier', userId]);
          } else if (userType === 'radiologue') {
            this.router.navigate(['/radiologue', userId]);
          } else if (userType === 'laborantin') {
            this.router.navigate(['/laborantin', userId]);
          } else {
            alert('Unknown user type');
          }
        },
        error: (error: any) => {
          console.error(error);
          alert('Invalid credentials or server error.');
        }
      });
    } else {
      console.error('No token found');
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
