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


  constructor(private router: Router, private dataService : DataService) {}
  onSubmit() {

    if(this.username === 'admin' || this.password === 'admin') {
      this.router.navigate(['dashboard']);
    } else if(this.username === 'patient' || this.password === 'patient') {
      this.router.navigate(['patient']);
    }

  // const payload = { username: this.username, password: this.password };
  //
  // this.dataService.addData('login', payload, '').subscribe({
  //   next: (response: any) => {
  //     const token = response.token;
  //     const userType = response.user.role;
  //     const userId = response.user.id;
  //
  //     // Store token and user ID in localStorage
  //     localStorage.setItem('authToken', token);
  //     localStorage.setItem('id', userId);
  //
  //     // Navigate based on user role
  //     if (userType === 'admin') {
  //       this.router.navigate(['/dashboard', userId]);
  //     } else if (userType === 'patient') {
  //       this.router.navigate(['/patient', userId]);
  //     } else if (userType === 'medecin') {
  //       this.router.navigate(['/medecin', userId]);
  //     } else if (userType === 'infirmier') {
  //       this.router.navigate(['/infirmier', userId]);
  //     } else if (userType === 'radiologue') {
  //       this.router.navigate(['/radiologue', userId]);
  //     } else if (userType === 'laborantin') {
  //       this.router.navigate(['/laborantin', userId]);
  //     } else {
  //       alert('Unknown user type');
  //     }
  //   },
  //   error: (error: any) => {
  //     console.error(error);
  //     alert('Invalid credentials or server error.');
  //   }
  // });
}

  onCancel() {
    this.router.navigate(['/']);
  }
}
