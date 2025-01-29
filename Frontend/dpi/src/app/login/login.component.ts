import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth.service';

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

  constructor(private router: Router, private dataService: DataService,private authService: AuthService) {}

  onSubmit() {
    const payload = { email: this.username, password: this.password };

    this.dataService.addData('login/', payload).subscribe({
      next: (response: any) => {
        const accessToken = response.access;
        const decodedToken: any = jwtDecode(accessToken);

        // Store tokens in localStorage
        this.authService.setToken(accessToken)

        // Navigate based on user role
        const userType = decodedToken.role
        const userId = decodedToken.user_id
        if (userType === 'admin') {
          this.router.navigate(['dashboard', userId]);
        } else if (userType === 'patient') {
          this.router.navigate(['/patient', userId]);
        } else if (userType === 'medecin') {
          this.router.navigate(['/dashboard', userId]);
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
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
